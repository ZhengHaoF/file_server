// rollup.config.js
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default [
    {
        input: 'index.js', // 你的入口文件
        output: {
            file: 'dist/index.js', // 打包后的文件
            format: 'cjs', // 输出格式为 CommonJS，因为 Node.js 使用 CommonJS
        },
        plugins: [
            resolve(),
            commonjs(),
            json(),
            terser()
        ],
        external: [ // 排除不需要打包的依赖
            'sharp',
            'sqlite3',
            './config.json'
        ],
    },
    {
        input: 'clean.js', // 你的入口文件
        output: {
            file: 'dist/clean.js', // 打包后的文件
            format: 'cjs', // 输出格式为 CommonJS，因为 Node.js 使用 CommonJS
        },
        plugins: [
            resolve(),
            commonjs(),
            json(),
        ],
        external: [ // 排除不需要打包的依赖
            'sharp',
            'sqlite3',
            './config.json'
        ],
    },
    {
        input: 'init.js', // 你的入口文件
        output: {
            file: 'dist/init.js', // 打包后的文件
            format: 'cjs', // 输出格式为 CommonJS，因为 Node.js 使用 CommonJS
        },
        plugins: [
            resolve(),
            commonjs(),
            json(),
        ],
        external: [ // 排除不需要打包的依赖
            'sharp',
            'sqlite3',
            './config.json'
        ],
    },
    {
        input: 'start.js', // 你的入口文件
        output: {
            file: 'dist/start.js', // 打包后的文件
            format: 'cjs', // 输出格式为 CommonJS，因为 Node.js 使用 CommonJS
        },
        plugins: [
            resolve(),
            commonjs(),
            json(),
        ],
        external: [ // 排除不需要打包的依赖
            'sharp',
            'sqlite3',
            './config.json'
        ],
    }
]