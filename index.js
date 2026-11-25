// @ts-check
/**
* MIT License
*
* Copyright (c) 2022 FSys Tech Ltd.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
//By Rajib Chy
// On 11:00 AM 12/25/2020
/** 
 * @typedef {import('./index').IHttpConfig} IHttpConfig
 */
const path = require('path');
// const os = require("os");
// const fs = require('fs');
// const { Writable } = require('stream');
// const { ServerResponse } = require('http');

/**
 * Import PDF Native Module
 * @returns {import('./index').reqw_native}
 */
function import_module() {
    let binding_path;
    if (process.env.LUNCH_MODE === "DEBUG") {
        binding_path = "./build/Release/reqw.node";
    } else {
        binding_path = require('node-pre-gyp').find(path.resolve(path.join(__dirname, './package.json')));
    }
    return require(binding_path).reqw;
}
const reqwn = import_module();
const http = require('./http');
http.nativeInit(reqwn.create_http_request);
module.exports.HttpRequest = http.HttpRequest;
const smtp = require('./smtp');
smtp.nativeInit(reqwn.create_smtp_request);
module.exports.SMTPRequest = smtp.SMTPRequest;
module.exports.MailMessage = smtp.MailMessage;
module.exports.TemplateParser = smtp.TemplateParser;
module.exports.mimeType = smtp.mimeType;
module.exports.mimeEncoder = smtp.mimeEncoder;