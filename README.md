# 简易文件服务器后台

### 使用方法
1. `git clone https://github.com/ZhengHaoF/file_server.git`
2. `cd file_server`
3. 修改config.json中需要共享的目录（不能把根目录设置为共享目录）
4. 使用 `node index.js` 运行
5. 启动浏览器，打开`IP:3000`即可访问

### 在线预览
- 支持常见图片预览
- 支持常见视频预览
- 支持调用外部Vlc播放器
- 可以直接预览缩略图

#### 列表模式
![img.png](img%2Fimg.jpg)
#### 图片模式
![img_1.png](img%2Fimg1.jpg)
#### 设置功能
![img_2.png](img%2Fimg2.jpg)
#### 图片查看
![img_3.png](img%2Fimg3.jpg)

### WebDav
支持WebDav，端口为1900

###
因为浏览器对视屏支持有限，目前主流浏览器大多只支持mp4,ogg,webm等基础格式，详细可以看这里：https://developer.mozilla.org/zh-CN/docs/Web/Media/Formats/Containers
而大多数国产手机浏览器都有视屏小窗之类的功能，对视屏的兼容性是网页所不能及的，所以建议使用网页播放器，方便浏览器调用自带的播放器，这样体验最好。


### 前端地址
https://github.com/ZhengHaoF/file_server_web

## 注意：不能把根目录设置为共享目录