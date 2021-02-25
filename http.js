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
 * @typedef {import('./index').IHttpRequest} IHttpRequest
 * @typedef {import('./index').ClsHttpRequest} ClsHttpRequest
 * @typedef {import('./index').IHttpConfig} IHttpConfig
 * @typedef {import('./index').INativeHttpReqParam} INativeHttpReqParam
 * @typedef {import('./index').IHttpResponse} IHttpResponse
 */

/** [Object Extend]*/
function extend(destination, source) {
    for (let property in source)
        destination[property] = source[property];
    return destination;
};
/** [/Object Extend]*/
/**
 * @param {INativeHttpReqParam} opt
 * @returns {INativeResult}
 */
var create_http_request = function (opt) { return undefined; };
/**
 * 
 * @param {Date} date 
 * @param {number} h
 * @returns {Date}
 */
function addHours(date, h) {
    date.setHours(date.getHours() + h);
    return date;
}
/**
 * Clear `Object Properties`
 * @param {any} rs 
 */
function cleanObject(rs) {
    if (!rs || rs === null || typeof (rs) !== "object") return;
    for (let p in rs)
        delete rs[p];
}
/**
 * @param {ClsHttpRequest} req
 * @param {string} body 
 * @param {boolean|void} follow_location
 * @returns {INativeResult}
 */
function CreateHttpRequest(req, body, follow_location) {
    if (req.response) {
        req.response.dispose();
        delete req.response;
    }
    /** @type {INativeHttpReqParam} */
    let reqParam = {
        url: req.url,
        method: req.method,
        is_debug: req.is_debug,
        is_verify_ssl: req.is_verify_ssl,
        is_verify_ssl_host: req.is_verify_ssl_host,
        follow_location: typeof (follow_location) !== "boolean" ? true : follow_location
    };
    if (req.method === "POST") {
        if (body === undefined || body === null)
            throw new Error("Request body required for POST request!!!");
        if (typeof (body) !== 'string')
            throw new Error("POST paylod data typeof(string) required !!!");
        reqParam.body = body; body = undefined;
    }
    if (Object.keys(req.headers).length > 0) {
        reqParam.header = [];
        for (let key in req.headers)
            reqParam.header.push(`${key}:${req.headers[key]}`);
    }
    if (req.cookies && req.cookies.length > 0) {
        reqParam.cookie = req.cookies.join(";");
    }
    const res = create_http_request(reqParam);
    cleanObject(reqParam);
    return res;
};
class HttpResponse {
    constructor() {
        this.isDisposed = false;
        this.httpStatusCode = 0;
        this.cookies = [];
        this.header = {};
        this.body = undefined;
        this.is_error = false;
        this.error = undefined;
    }
    dispose() {
        if (this.isDisposed) return;
        this.isDisposed = true;
        delete this.httpStatusCode;
        delete this.cookies;
        delete this.header;
        delete this.body;
        delete this.is_error;
        delete this.error;
    }
}
/**
 * 
 * @param {string|void} str
 * @returns {string}
 */
function trim(str) {
    if (!str) return undefined;
    return str.trim();
}
/**
 * @param {INativeResult} resp
 * @returns {IHttpResponse}
 */
function parseHttpResponse(resp) {
    var response = new HttpResponse();
    if (resp.ret_val < 0) {
        response.is_error = true;
        response.error = resp.ret_msg;
        cleanObject(resp);
        return response;
    }
    response.body = resp.response_body; delete resp.response_body;
    if (!resp.response_header && "string" !== typeof (resp.response_header)) {
        delete resp.response_header;
        cleanObject(resp);
        return response;
    }
    let arr = resp.response_header.split("\r\n");
    delete resp.response_header;
    if (null === arr) return;
    for (let row of arr) {
        if (!row) continue;
        if (row.indexOf('HTTP') > -1) {
            response.httpStatusCode = parseInt(row.split(" ")[1]);
            continue;
        }
        if (row.indexOf('Set-Cookie') > -1) {
            let cok = row.split(":")[1];
            if (!cok) continue;
            cok = cok.split(";")[0];
            response.cookies.push(trim(cok)); continue;
        }
        let harr = row.split(":");
        let key = harr[0].toLowerCase();
        response.header[trim(key)] = trim(harr[1]);
    }
    cleanObject(resp);
    return response;
};
/**
 * 
 * @param {ClsHttpRequest} req
 * @param {string|{[id:string]:any}} body
 * @returns {string}
 */
function preparePostData(req, body) {
    if ('object' !== typeof (body) || typeof (body) === 'string') {
        req.setHeader("Content-Length", String(body.length))
        return body;
    }
    if (null === body && 'object' !== typeof (body))
        throw new Error("Request body required for POST request!!!");

    let str = [];
    for (let p in body) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(body[p]));
    }
    let data = str.join("&");
    req.setHeader("Content-Length", String(data.length));
    return data;

};
//8:23 PM 12/2/2018
//1:02 PM 11/24/2019
//With Rajib & Ovi
/** @type {ClsHttpRequest} */
class HttpRequest {
    /**
     * 
     * @param {string|void} url 
     * @param {IHttpConfig|void} opt 
     */
    constructor(url, opt) {
        if (url) {
            this.url = url;
        } else {
            this.url = undefined;
        }

        if (!opt || opt === null || typeof (opt) !== "object") {
            opt = {
                is_debug: false,
                is_verify_ssl: false,
                is_verify_ssl_host: false
            };
        }
        extend(this, opt);
        this.response = undefined;
        this.method = void 0;
        this.cookies = [];
        this.headers = {};
        this.is_debug = false;
        this.is_verify_ssl = false;
        this.is_verify_ssl_host = false;
    }
    /**
     * 
     * @param {number} day
     * @returns {string}
     */
    getTimeStamp(day) {
        return addHours(new Date(), typeof (day) === "number" ? day : 1).toString().split("(")[0].trim();
    }
    /**
     * 
     * @param {string} cook 
     * @returns {boolean}
     */
    existsCookie(cook) {
        return this.cookies.indexOf(cook) >= 0;
    }
    /**
     * 
     * @param {string|string[]} key 
     * @param {string|void} value
     * @returns {IHttpRequest} 
     */
    setCookie(key, value) {
        if (Array.isArray(key)) {
            for (let kv in key) {
                this.setRawCookie(kv);
            }
            return this;
        }
        return this.setRawCookie(`${key}=${value}`);
    }
    clearCookies() {
        if (Array.isArray(this.cookies)) {
            this.cookies.length = 0;
        }
        return this;
    }
    /**
     * 
     * @param {string} cook
     * @returns {IHttpRequest}
     */
    setRawCookie(cook) {
        if (this.existsCookie(cook)) return this;
        this.cookies.push(cook);
        return this;
    }
    /**
     * 
     * @param {string} key
     * @returns {IHttpRequest}
     */
    removeHeader(key) {
        if (this.headers[key])
            delete this.headers[key];
        return this;
    }
    /**
     * 
     * @param {string} key 
     * @param {string} value
     * @returns {IHttpRequest}
     */
    setHeader(key, value) {
        this.removeHeader(key);
        this.headers[key] = value;
        return this;
    }
    /**
     * 
     * @param {boolean|void} follow_location
     * @returns {Promise<void>} 
     */
    getAsync(follow_location) {
        return new Promise((resolve, reject) => {
            this.get(follow_location);
            resolve();
        });
    }
    /**
     * 
     * @param {string|{[id:string]:any}} body 
     * @param {boolean|void} follow_location
     * @returns {Promise<void>}  
     */
    postAsync(body, follow_location) {
        return new Promise((resolve, reject) => {
            this.post(body, follow_location); body = undefined;
            resolve();
        });
    }
    /**
     * 
     * @param {string|{[id:string]:any}} body 
     * @param {boolean|void} follow_location
     * @returns {Promise<void>}  
     */
    sendAsync(body, follow_location) {
        return new Promise((resolve, reject) => {
            this.post(body, follow_location);
            return body = undefined, resolve();
        });
    }
    /**
     * 
     * @param {boolean|void} follow_location
     * @returns {IHttpRequest}
     */
    get(follow_location) {
        this.method = "GET";
        this.response = parseHttpResponse(CreateHttpRequest(this, void 0, follow_location));
        return this;
    }
    /**
     * @param {string|{[id:string]:any}} body
     * @param {boolean|void} follow_location
     * @returns {IHttpRequest}
     */
    post(body, follow_location) {
        this.method = "POST";
        let resp = CreateHttpRequest(this, preparePostData(this, body), follow_location); body = void 0;
        this.response = parseHttpResponse(resp);
        cleanObject(resp);
        return this;
    }
    /**
     * @param {string|{[id:string]:any}} body
     * @param {boolean|void} follow_location
     * @returns {IHttpRequest}
     */
    send(body, follow_location) {
        this.method = "POST";
        let resp = CreateHttpRequest(this, preparePostData(this, body), follow_location); body = void 0;
        this.response = parseHttpResponse(resp);
        cleanObject(resp);
        return this;
    }
    /**
     * 
     * @param {boolean|void} withHeader
     * @returns {IHttpRequest}
     */
    moveToRequest(withHeader) {
        if ('number' === typeof (this.response.httpStatusCode) && this.response.httpStatusCode > 0) {
            this.cookies = [];
            for (let part; this.response.cookies.length && (part = this.response.cookies.shift());) {
                this.cookies.push(part);
            }
        }
        if (!withHeader)
            this.headers = {};
        return this;
    }
    /**
     * 
     * @param {string} url
     * @returns {IHttpRequest} 
     */
    setUrl(url) {
        this.clearResponse();
        this.url = url;
        return this;
    }
    /**
     * @returns {IHttpRequest}
     */
    clearResponse() {
        if (this.response) {
            this.response.dispose();
            delete this.response;
        }
        if (this.method) {
            delete this.method;
        }
        if (this.url) {
            delete this.url;
        }
        return this;
    }
    dispose() {
        this.clearResponse();
        if (this.headers) {
            delete this.headers;
        }
        if (this.cookies) {
            this.cookies.length = 0;
            delete this.cookies;
        }
    }
};
module.exports.HttpRequest = HttpRequest;
module.exports.nativeInit = function (func) {
    create_http_request = func;
}