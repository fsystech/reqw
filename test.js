// @ts-check
console.log(process.pid);
const path = require('path');
const os = require("os");
const platform = os.platform();
const arch = os.arch();
//if (platform !== 'win32' || arch !== 'ia32') throw new Error(`Not supported platform =>${platform} and arch => ${arch}`);
console.log(`platform =>${platform} and arch => ${arch}`);
const { HttpRequest, SMTPRequest, MailMessage, mimeEncoder, mimeType } = require('./index');
var http = new HttpRequest("https://www.facebook.com/", { is_verify_ssl: false, is_debug: false, is_verify_ssl_host: false });
http
    .setHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8")
    .setHeader("Accept-Language", "en-US,en;q=0.9,mt;q=0.8")
    .setHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36")
    .setHeader("Content-Type", "application/x-www-form-urlencoded")
    .setHeader("Accept-Encoding", "gzip")
    .setHeader("Upgrade-Insecure-Requests", "1");
var start = new Date();
http.get(true);
var end = new Date();
console.log(http.response.header);
console.log(http.headers);
console.log(http.response.httpStatusCode);
console.log(http.response.cookie);
console.log(`Start: ${start.toString()}`);
console.log(`End: ${end.toString()}`);
console.log(`Take: ${end.getTime() - start.getTime()}ms`);
http.dispose();
var smtp = new SMTPRequest();
smtp.host("mail@safeonline.world");
smtp.credential("rajib@safeonline.world", "123456");
var msg = new MailMessage();
msg.from("rajib@safeonline.world").to("ovi@safeonline.world").subject("Hello world").body("Hello world");
// msg
//     .attachment({ name: "my.pdf", path: "", encoder: mimeEncoder.binary, mim_type: mimeType.application.pdf })
//     .attachment({ name: "my.jpg", path: "", encoder: mimeEncoder.binary, mim_type: mimeType.image.jpeg })
//     .attachment({ name: "my.docx", path: "", encoder: mimeEncoder.binary, mim_type: mimeType.application.octet })
//     .attachment({ name: "my.xlsx", path: "", encoder: mimeEncoder.binary, mim_type: mimeType.application.octet })
//     .attachment({ name: "my.xls", path: "", encoder: mimeEncoder.binary, mim_type: mimeType.application.octet })
//     .attachment({ name: "my.doc", path: "", encoder: mimeEncoder.binary, mim_type: mimeType.application.octet })
//     .attachment({ name: "my.gif", path: "", encoder: mimeEncoder.binary, mim_type: mimeType.image.gif })
//     ;
try {
    // var result = smtp.sendMail(msg);
    // console.log(result);
} catch (e) {
    console.log(e);
}