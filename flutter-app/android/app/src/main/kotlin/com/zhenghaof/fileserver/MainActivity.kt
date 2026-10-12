package com.zhenghaof.fileserver

import android.Manifest
import android.content.ContentValues
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import java.io.File
import java.util.concurrent.Executors

class MainActivity : FlutterActivity() {
    private val CHANNEL = "com.example.flutter_application_1/storage"
    private val PERMISSION_REQUEST_CODE = 1001
    private var permissionResult: MethodChannel.Result? = null
    private val storageExecutor = Executors.newSingleThreadExecutor()

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
            when (call.method) {
                "getSdkVersion" -> result.success(Build.VERSION.SDK_INT)
                "openSavedFile" -> {
                    val args = call.arguments as? Map<*, *>
                    val uri = Uri.parse(args?.get("uri") as? String ?: "")
                    if (uri.scheme != "content") {
                        result.error("INVALID_URI", "Expected a content URI", null)
                    } else {
                        try {
                            startActivity(Intent(Intent.ACTION_VIEW).apply {
                                setDataAndType(uri, args?.get("mimeType") as? String ?: "*/*")
                                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                            })
                            result.success(null)
                        } catch (e: Exception) {
                            result.error("OPEN_FAILED", e.message, null)
                        }
                    }
                }
                "requestStoragePermission" -> handleRequestStoragePermission(result)
                "getExternalDownloads" -> handleGetExternalDownloads(result)
                "insertMediaStore" -> storageExecutor.execute {
                    handleInsertMediaStore(call.arguments as Map<*, *>, result)
                }
                else -> result.notImplemented()
            }
        }
    }

    private fun handleRequestStoragePermission(result: MethodChannel.Result) {
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.P) {
            // Android 10+ 使用 MediaStore，不需要此权限
            result.success(true)
            return
        }

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE)
            == PackageManager.PERMISSION_GRANTED) {
            result.success(true)
            return
        }

        if (permissionResult != null) {
            result.error("BUSY", "Permission request already in progress", null)
            return
        }
        permissionResult = result
        ActivityCompat.requestPermissions(
            this,
            arrayOf(Manifest.permission.WRITE_EXTERNAL_STORAGE),
            PERMISSION_REQUEST_CODE
        )

    }

    private fun handleGetExternalDownloads(result: MethodChannel.Result) {
        val dir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)
        result.success(dir.absolutePath)
    }

    private fun handleInsertMediaStore(args: Map<*, *>, result: MethodChannel.Result) {
        val fileName = args["fileName"] as? String ?: run {
            result.error("INVALID_ARGS", "fileName is required", null)
            return
        }
        val mimeType = args["mimeType"] as? String ?: "application/octet-stream"
        val isMedia = args["isMedia"] as? Boolean ?: false
        val tempFilePath = args["tempFilePath"] as? String ?: run {
            result.error("INVALID_ARGS", "tempFilePath is required", null)
            return
        }

        val tempFile = File(tempFilePath)
        if (!tempFile.exists()) {
            result.error("FILE_NOT_FOUND", "Temp file not found: $tempFilePath", null)
            return
        }

        try {
            val resolver = contentResolver
            val collection: Uri
            val relativePath: String

            if (isMedia) {
                if (mimeType.startsWith("video/")) {
                    collection = MediaStore.Video.Media.getContentUri(MediaStore.VOLUME_EXTERNAL_PRIMARY)
                } else {
                    collection = MediaStore.Images.Media.getContentUri(MediaStore.VOLUME_EXTERNAL_PRIMARY)
                }
                relativePath = (if (mimeType.startsWith("video/"))
                    Environment.DIRECTORY_MOVIES else Environment.DIRECTORY_PICTURES) + "/Z-Files"
            } else {
                collection = MediaStore.Downloads.getContentUri(MediaStore.VOLUME_EXTERNAL_PRIMARY)
                relativePath = Environment.DIRECTORY_DOWNLOADS + "/Z-Files"
            }

            val values = ContentValues().apply {
                put(MediaStore.MediaColumns.DISPLAY_NAME, fileName)
                put(MediaStore.MediaColumns.MIME_TYPE, mimeType)
                put(MediaStore.MediaColumns.RELATIVE_PATH, relativePath)
                put(MediaStore.MediaColumns.IS_PENDING, 1)
            }

            val uri = resolver.insert(collection, values)
            if (uri != null) {
                try {
                    val output = resolver.openOutputStream(uri)
                        ?: throw IllegalStateException("Cannot open output stream")
                    output.use { outputStream ->
                        tempFile.inputStream().use { inputStream ->
                            inputStream.copyTo(outputStream)
                        }
                    }
                    val committed = resolver.update(uri, ContentValues().apply {
                        put(MediaStore.MediaColumns.IS_PENDING, 0)
                    }, null, null)
                    check(committed == 1) { "Cannot commit saved file" }
                    result.success(uri.toString())
                } catch (e: Exception) {
                    resolver.delete(uri, null, null)
                    throw e
                }
            } else {
                result.error("INSERT_FAILED", "Failed to insert into MediaStore", null)
            }
        } catch (e: Exception) {
            result.error("MEDIASTORE_ERROR", e.message, null)
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == PERMISSION_REQUEST_CODE) {
            permissionResult?.success(grantResults.isNotEmpty() &&
                grantResults[0] == PackageManager.PERMISSION_GRANTED)
            permissionResult = null
        }
    }

    override fun onDestroy() {
        permissionResult?.error("CLOSED", "Activity closed", null)
        permissionResult = null
        storageExecutor.shutdown()
        super.onDestroy()
    }
}
