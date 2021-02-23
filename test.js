// @ts-check
console.log(process.pid);
const path = require('path');
const os = require("os");
const platform = os.platform();
const arch = os.arch();
//if (platform !== 'win32' || arch !== 'ia32') throw new Error(`Not supported platform =>${platform} and arch => ${arch}`);
console.log(`platform =>${platform} and arch => ${arch}`);
const { HttpRequest } = require('./index');
var http = new HttpRequest("http://erp.kslbd.net/", { is_verify_ssl: false, is_debug: false, is_verify_ssl_host: false });
http
    .setHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8")
    .setHeader("Accept-Language", "en-US,en;q=0.9,mt;q=0.8")
    .setHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36")
    .setHeader("Content-Type", "application/x-www-form-urlencoded")
    .setHeader("Accept-Encoding", "gzip")
    .setHeader("Upgrade-Insecure-Requests", "1")
http.get(true);
console.log(http.response);