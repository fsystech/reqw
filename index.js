// @ts-check
/**
* Copyright (c) 2018, SOW (https://www.safeonline.world). (https://github.com/RKTUXYN) All rights reserved.
* @author {SOW}
* Copyrights licensed under the New BSD License.
* See the accompanying LICENSE file for terms.
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