/**
* Copyright (c) 2018, SOW (https://www.safeonline.world). (https://github.com/RKTUXYN) All rights reserved.
* @author {SOW}
* Copyrights licensed under the New BSD License.
* See the accompanying LICENSE file for terms.
*/
// @ts-check
//8:23 PM 12/2/2018
/**
 * @typedef {import('./index').INativeResult} INativeResult
 */

/** [Object Extend]*/
function extend(destination, source) {
    for (let property in source)
        destination[property] = source[property];
    return destination;
};
/** [/Object Extend]*/
/**
 * @param {any[]} args
 * @returns {INativeResult}
 */
var create_http_request = function (...args) { return undefined; };
/**
 * 
 * @param {Date} date 
 * @param {number} h
 * @returns {Date}
 */
function addHours(date, h) {
    date.setHours(date.getHours() + h);
    return date;
};
function http_init(body, follow_location) {
    let req_object = {
        url: this.url,
        method: this.method,
        is_debug: this.is_debug,
        is_verify_ssl: this.is_verify_ssl,
        is_verify_ssl_host: this.is_verify_ssl_host,
        follow_location: typeof (follow_location) !== "boolean" ? true : follow_location
    };
    if (this.method === "POST") {
        if (body === undefined || body === null)
            throw new Error("Request body required for POST request!!!");
        if (typeof (body) !== 'string')
            throw new Error("POST paylod data typeof(string) required !!!");
        req_object.body = body; body = undefined;
    }
    if (Object.keys(this.header).length > 0) {
        req_object.header = [];
        for (let key in this.header)
            req_object.header.push(`${key}:${this.header[key]}`);
    }
    if (this.cookie && this.cookie.length > 0) {
        req_object.cookie = this.cookie.join(";");
    }
    return create_http_request(req_object);
};
function parse_response(resp) {
    this.response = {
        http_status_code: 0,
        cookie: [],
        header: {},
        body: {},
        is_error: false,
        error: undefined
    };
    if (resp.ret_val < 0) {
        this.response.is_error = true;
        this.response.error = resp.ret_msg;
        return;
    }
    this.response.body = resp.response_body; delete resp.response_body;
    if (!resp.response_header && "string" !== typeof (resp.response_header)) {
        delete resp.response_header;
        return;
    }
    let arr = resp.response_header.split("\r\n");
    delete resp.response_header;
    if (null === arr) return;
    for (let row of arr) {
        if (!row) continue;
        if (row.indexOf('HTTP') > -1) {
            this.response.http_status_code = parseInt(row.split(" ")[1]);
            continue;
        }
        if (row.indexOf('Set-Cookie') > -1) {
            let cok = row.split(":")[1];
            if (!cok) continue;
            cok = cok.split(";")[0];
            this.response.cookie.push(cok); continue;
        }
        let harr = row.split(":");
        let key = harr[0].replace(/-/g, "_").toLowerCase();
        this.response.header[key] = harr[1];
    }
    return;
};
function prepare_post_data(body) {
    if ('object' !== typeof (body) || typeof (body) === 'string') {
        this.set_header("Content-Length", String(body.length))
        return body;
    }
    if (null === body && 'object' !== typeof (body))
        throw new Error("Request body required for POST request!!!");

    let str = [];
    for (let p in body) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(body[p]));
    }
    let data = str.join("&");
    this.set_header("Content-Length", String(data.length));
    return data;

};
function clean_resp(rs) {
    for (let p in rs)
        delete rs[p];
};
//8:23 PM 12/2/2018
//1:02 PM 11/24/2019
//With Rajib & Ovi
class HttpRequest {
    constructor(url, opt) {
        this.url = url;
        if (!opt || opt === null || typeof (opt) !== "object") {
            opt = {
                is_debug: false,
                is_verify_ssl: false,
                is_verify_ssl_host: false
            };
        }
        extend(this, opt);
        this.response = {};
        this.method = void 0;
        this.cookie = [];
        this.header = {};
    }
    getTimeStamp(day) {
        return addHours(new Date(), typeof (day) === "number" ? day : 1).toString().split("(")[0].trim();
    }
    existsCookie(cook) {
        return this.cookie.indexOf(cook) >= 0;
    }
    setCookie(key, value) {
        return this.setRawCookie(`${key}=${value}`);
    }
    setRawCookie(cook) {
        if (this.existsCookie(cook)) return this;
        this.cookie.push(cook);
        return this;
    }
    removeHeader(key) {
        if (this.header[key])
            delete this.header[key];
        return this;
    }
    setHeader(key, value) {
        this.removeHeader(key);
        this.header[key] = value;
        return this;
    }
    getAsync(follow_location) {
        return new Promise((resolve, reject) => {
            this.get(follow_location);
            resolve();
        });
    }
    postAsync(body, follow_location) {
        return new Promise((resolve, reject) => {
            this.post(body, follow_location); body = undefined;
            resolve();
        });
    }
    sendAsync(body, follow_location) {
        return new Promise((resolve, reject) => {
            this.post(body, follow_location);
            return body = undefined, resolve();
        });
    }
    get(follow_location) {
        this.method = "GET";
        let resp = http_init.call(this, void 0, follow_location);
        parse_response.call(this, resp);
        clean_resp(resp);
        return this;
    }
    post(body, follow_location) {
        this.method = "POST";
        let resp = http_init.call(this, prepare_post_data.call(this, body), follow_location); body = void 0;
        parse_response.call(this, resp);
        clean_resp(resp);
        return this;
    }
    send(body, follow_location) {
        this.method = "POST";
        let resp = http_init.call(this, prepare_post_data.call(this, body), follow_location); body = void 0;
        parse_response.call(this, resp);
        clean_resp(resp);
        return this;
    }
    moveToRequest(with_header) {
        if ('number' === typeof (this.response.http_status_code) && this.response.http_status_code > 0) {
            this.cookie = [];
            for (let part; this.response.cookie.length && (part = this.response.cookie.shift());) {
                this.cookie.push(part);
            }
        }
        if (!with_header)
            this.header = {};
        return this;
    }
    setUrl(url) {
        this.clearResponse();
        this.url = url;
    }
    clearResponse() {
        if (this.response || this.url) {
            clean_resp(this.response);
            delete this.response;
            this.url = undefined;
            this.method = undefined;
            this.header = {};
            this.cookie = [];
        }
        return this;
    }
};
module.exports.HttpRequest = HttpRequest;
module.exports.nativeInit = function (func) {
    create_http_request = func;
}