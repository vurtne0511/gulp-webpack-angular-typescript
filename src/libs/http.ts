
'use strict';

import * as $ from 'jquery';

import cookies from './cookies';

// HTTP 请求封装
export default {

    /**
     * 发送异步请求。
     * @param {Object} [options] ajax option 配置
     */
    send: function ($method: string, $url: string, $data: object, $callback: Function) {

        // 请求方法
        let method = $method === 'upload' ? 'post' : $method;

        /**
         * 异步回调函数。
         * @param {Object} e 错误信息
         * @param {*} [data] 返回数据
         * @private
         */
        let callback = function (e: any, data?: any) {

            // 回调
            if (typeof $callback === 'function') {
                $callback(e, data);
            } else {
                // 若发生错误则显示错误信息
                alert(e);
            }
        };

        let token = cookies.get('token');

        // 设置异步请求选项
        let options: any = {
            url: $url,
            method: method,
            data: $data,
            dataType: method === "post" ? "json" : "json",
            timeout: 150000,  // 设置超时时间15秒
            success: function (res: any) {
                if (res.success) {
                    callback(null, res.result || res.data);
                } else {
                    callback(res, res.result || res.data);
                }
            },
            error: function (e: any) {
                callback(e);
            }
        };

        if (!!token) {
            options.headers = { 'X-Access-Token': token };
        }

        // console.log(options);

        // 当为上传处理时保持 FormData 格式
        if ($method === 'upload') {
            options.contentType = false;
            options.processData = false;
        }


        // 发送异步请求
        $.ajax(options);
    },

    /**
     * 异步 GET 请求。
     * @param {Object} [options] ajax option 配置
     */
    get: function (url: string, callback: Function) {
        this.send('get', url, null, callback);
    },

    /**
     * 异步 POST 请求。
     * @param {Object} [options] ajax option 配置
     */
    post: function (url: string, data: object, callback: Function) {
        this.send('post', url, data, callback);
    },

    /**
     * 异步上传请求。
     * @param {Object} [options] ajax option 配置
     */
    upload: function (url: string, data: object, callback: Function) {
        this.send('upload', url, data, callback);
    }

};