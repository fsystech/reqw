/**
* Copyright (c) 2018, SOW (https://www.safeonline.world). (https://github.com/RKTUXYN) All rights reserved.
* @author {SOW}
* Copyrights licensed under the New BSD License.
* See the accompanying LICENSE file for terms.
*/
//11:08 PM 11/25/2019
// @ts-check
/**
 * @param {any[]} args
 * @returns {string}
 */
var create_smtp_request = function (...args) { return undefined; };
const mime_type_names = {
    text: {
        plain: "text/plain",
        html: "text/html",
        xml: "text/xml",
        richText: "text/richtext"
    },
    application: {
        soap: "application/soap+xml",
        octet: "application/octet-stream",
        rtf: "application/rtf",
        pdf: "application/pdf",
        zip: "application/zip",
        multi_part: "multipart/mixed"
    },
    image: {
        gif: "image/gif",
        tiff: "image/tiff",
        jpeg: "image/jpeg"
    }
}, mime_encoder = {
    binary: "binary", bit: "8bit",
    base64: "base64",
    quoted_printable: "quoted-printable"
}, mime_support_type = {
    text: ["base64", "quoted-printable"],
    application: ["base64", "binary"],
    image: ["base64", "binary"]
};
const get_mime_type = (name) => {
    if (typeof (name) === 'undefined' || !name)
        throw new Error("Mime type required...");
    for (let group in mime_type_names) {
        for (let type in mime_type_names[group]) {
            if (mime_type_names[group][type] === name) return group;
        }
    }
    throw new Error(`Invalid Mime type ${name}`);
};
const is_valid_email = (value) => {
    if (typeof (value) === 'undefined' || !value) return false;
    return /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,15}$/.test(value) === true;
};
const ensure_value = (value, name) => {
    if (!value || value === null) {
        if (name)
            throw new Error(`Please ensure ${name} value...`);
        throw new Error("Please re-check your arguments...");
    }
};
const get_domain = (str) => {
    var nodes = str.split('.');
    return `${nodes[nodes.length - 2]}.${nodes[nodes.length - 1]}`;
};
const object_copy = (to, from) => {
    for (let prop in from)
        to[prop] = from[prop];
    return to;
};
const _options = {
    user: void 0,
    password: void 0,
    host: "smtp://mx.safeonline.world",
    mail_domain: "safeonline.world",
    is_http_auth: true,
    is_debug: false,
    is_verify_ssl: false,
    is_verify_ssl_host: false,
    cert_path: void 0,
    tls: false,
    from: void 0,
    to: void 0,
    cc: void 0,
    bcc: void 0,
    subject: void 0,
    body: void 0,
    is_html: false,
    attachments: []
}, _required = [
    "user", "password", "host", "mail_domain",
    "from", "to", "subject", "body"
];
class MailMessage {
    constructor(from, to, subs) {
        this.opt = {};
        this.opt.attachments = [];
        if (from) this.from(from);
        if (to) this.to(to);
        if (subs) this.subject(to);
    }
    subject(subs) {
        ensure_value(subs, "Mail subject");
        return this.opt.subject = subs, this;
    }
    bodyAsHtml() {
        return this.opt.is_html = true, this;
    }
    body(str, isHtml) {
        if (this.opt.body)
            delete this.opt.body;
        ensure_value(str, "Mail body");
        this.opt.body = str.replace(/\n/gi, "").replace(/\\t/gi, " ").replace(/\s+/gi, " ").trim(), this.opt.is_html = isHtml;
        return this;
    }
    from(from) {
        if (from === "DEL") {
            return delete this.opt.from, this;
        }
        ensure_value(from, "Mail from");
        if (!is_valid_email(from))
            throw new Error(`Invalid @email address ${from}`);
        this.opt.from = from;
        return this;
    }
    to(to) {
        if (to === "DEL") {
            return delete this.opt.to, this;
        }
        ensure_value(to, "Mail to");
        if (!is_valid_email(to))
            throw new Error(`Invalid @email address ${to}`);
        this.opt.to = to;
        return this;
    }
    cc(cc) {
        if (cc === "DEL") {
            return delete this.opt.cc, this;
        }
        ensure_value(cc, "Mail cc");
        if (!is_valid_email(cc))
            throw new Error(`Invalid @email address ${cc}`);
        if (this.opt.cc) {
            this.opt.cc += "," + cc;
        } else {
            this.opt.cc = cc;
        }
        return this;
    }
    bcc(bcc) {
        if (bcc === "DEL") {
            return delete this.opt.bcc, this;
        }
        ensure_value(bcc, "Mail bcc");
        if (!is_valid_email(bcc))
            throw new Error(`Invalid @email address ${bcc}`);
        if (this.opt.bcc) {
            this.opt.bcc += "," + bcc;
        } else {
            this.opt.bcc = bcc;
        }
        return this;
    }
    attachment(opt) {
        if (opt === "DEL") {
            return delete this.opt.attachments, this.opt.attachments = [], this;
        }
        if (!opt || opt === null || typeof (opt) !== "object")
            throw new Error("Please re-check your attachement arguments...");
        ["name", "path", "mime_type"].forEach(a => {
            ensure_value(opt[a], a);
        });
        let type = get_mime_type(opt.mime_type);
        let support = mime_support_type[type];
        if (opt.encoder) {
            if (support.indexOf(opt.encoder) < 0) {
                throw new Error(`Mime group "${type}", mime type "${opt.mime_type}" not supported this encoding "${opt.encoder}"..`);
            }
        } else {
            opt.encoder = support[0];
        }
        return this.opt.attachments.push(opt), this;
    }
    clear() {
        return delete this.opt, this.opt = {}, this;
    }
    getMessage() {
        return object_copy({}, this.opt);
    }
}
class SMTPRequest {
    constructor(host, user, pwd) {
        this.restOption();
        this.opt.host = host;
        this.opt.user = user;
        this.opt.password = pwd;
        if (host)
            this.opt.mail_domain = get_domain(host);
    }
    restOption() {
        if (this.opt) delete this.opt;
        this.opt = {};
        object_copy(this.opt, _options);
        return this;
    }
    debug() {
        return this.opt.is_debug = true, this;
    }
    verifySSL() {
        return this.opt.is_verify_ssl = true, this;
    }
    enableTls() {
        return this.opt.tls = true, this;
    }
    cert(path) {
        ensure_value(path, "path");
        return this.opt.cert_path = path, this;
    }
    host(host) {
        ensure_value(host, "host");
        this.opt.host = host;
        this.opt.mail_domain = get_domain(host);
        return this;
    }
    credential(user, pwd) {
        ensure_value(user, "user");
        ensure_value(pwd, "pwd");
        this.opt.user = user;
        this.opt.password = pwd;
        return this;
    }
    sendMail(mailMessage) {
        if (!(mailMessage instanceof MailMessage)) {
            throw new Error('message should be instance of "MailMessage"');
        }
        let obj = object_copy({}, this.opt);
        object_copy(obj, mailMessage.getMessage());
        _required.forEach((prop) => {
            ensure_value(obj[prop], prop);
        });
        if (Array.isArray(obj.attachments)) {
            if (obj.attachments.length <= 0) delete obj.attachments;
        }
        try {
            let res = {
                success: create_smtp_request(obj) === "Success",
                msg: "Success"
            };
            if (!res.success) {
                res.msg = "Unknown error occured...";
            }
            return res;
        } catch (e) {
            return {
                success: false,
                msg: e.message
            };
        }
    }
    dispose() {
        delete this.opt;
    }

}
class TemplateParser {
    constructor(path) {
        //if ( !fs.exists_file( path ) )
        //    throw new Error( `File not found ${path}` );
        this.hasTemplate = false;
        this.read(path);
    }
    /**
     * 
     * @param {string} path 
     */
    read(path) {
        if (!path)
            throw new Error('Template sould not left blank.');
        //@ts-ignore
        let rs = fs.read_file(path);// TODO
        if (rs.staus_code < 0)
            throw new Error(rs.message);
        this.str = rs.data.replace(/\n/gi, "").replace(/\\t/gi, " ").replace(/\s+/gi, " ").trim();
        delete rs.data; rs = undefined;
        this.hasTemplate = true;
    }
    parse(param) {
        if (!this.hasTemplate)
            throw new Error("No template found....");
        if (!Array.isArray(param)) {
            throw new Error("Param should be Array required....");
        }
        let len = param.length;
        return this.str.replace(/{(\d+)}/g, function (match, number) {
            let index = parseInt(number);
            if (isNaN(index))
                throw new Error("Invalid param index!!!");

            if (index > len)
                throw new Error("Index should not greater than " + len);

            return typeof (param[index]) !== 'undefined'
                ? param[number]
                : /*match || ""*/""
                ;
        });
    }
    getTemplate() {
        if (!this.hasTemplate)
            throw new Error("No template found....");
        return this.str;
    }
    clear() {
        delete this.str;
        this.hasTemplate = false;
    }
}
module.exports = {
    SMTPRequest: SMTPRequest,
    MailMessage: MailMessage,
    TemplateParser: TemplateParser,
    mimeType: mime_type_names,
    mimeEncoder: mime_encoder,
    nativeInit: function (func) {
        create_smtp_request = func;
    }
};

//4:10 PM 11/26/2019