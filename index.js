'use strict'

var base64 = require('base64-js')
var aesjs = require('aes-js')
var fetch = require('whatwg-fetch')

function encodingPostData(postData, appSecret) {
    var iv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var key = aesjs.utils.utf8.toBytes(appSecret);

    var textBytes = aesjs.utils.utf8.toBytes(postData);
    textBytes = aesjs.padding.pkcs7.pad(textBytes);

    var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);

    var encryptedBytes = aesCbc.encrypt(textBytes);
    // To print or store the binary data, you may convert it to hex
    var encryptedHex = base64.fromByteArray(encryptedBytes);
    return encryptedHex;
};

function querystringify(obj, prefix) {
    prefix = prefix || '';

    var pairs = [];

    if ('string' !== typeof prefix) prefix = '?';

    for (var key in obj) {
        var value = obj[key]
        if (value)
            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }

    return pairs.length ? prefix + pairs.join('&') : '';
}

function ServingClient(serverUrl, appKey, appSecret) {
    this.serverUrl = serverUrl
    this.appKey = appKey
    this.appSecret = appSecret

    /**
     * 开始执行
     *
     * @param {String} method 方法名
     * @param {Object} args 传入的参数
     * @param {Object} sessionId 会话ID
     * @api public
     */
    this.invoke = function (method, args, sessionId) {
        var req = encodingPostData(JSON.stringify(args.data), this.appSecret);

        var query = {
            app_key: this.appKey,
            method: method,
            session_id: sessionId
        };

        var url = this.serverUrl + querystringify(query, '?');
        return new Promise(function(resolve, reject) {
            var postData = {
                method: "POST",
                header: {
                    'Content-Type': 'application/json'
                },
                body: req
            }

            fetch('url', postData).then(function(res){
                if (res.statusCode == 200){
                    resolve(res.data)
                }
                else {
                    reject(res.msg)
                }
            }).catch(function(err){
                reject(err)
            })
        })
    }
}

module.exports = {
    /**
    * 创建 ServingClient 对象
    *
    * @param {String} serverUrl
    * @param {String} appKey
    * @param {String} appSecret
    * @api public
    */
    servingClient: function (serverUrl, appKey, appSecret) {
        return new ServingClient(serverUrl, appKey, appSecret);
    }
}