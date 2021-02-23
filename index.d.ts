/**
* Copyright (c) 2018, SOW (https://www.safeonline.world). (https://github.com/RKTUXYN) All rights reserved.
* @author {SOW}
* Copyrights licensed under the New BSD License.
* See the accompanying LICENSE file for terms.
*/
//By Rajib Chy
// On 12:25 PM 12/25/2020
import { ServerResponse } from 'http';
import { ReadStream, WriteStream } from 'fs';
export interface IHttpConfig {
    is_debug?: boolean;
    is_verify_ssl?: boolean;
    is_verify_ssl_host?: boolean;
}
export interface INativeResult { ret_val: number; ret_msg: string; response_body?: string; response_header?: string }
export interface reqw_native {
    create_http_request(...args: any[]): INativeResult;
    create_smtp_request(...args: any[]): INativeResult;
    create_http_download_request(...args: any[]): INativeResult;
}
interface IHttpResponse {
    readonly http_status_code: number;
    readonly cookie: string[];
    readonly header: NodeJS.Dict<string>;
    readonly body: string;
    readonly is_error: boolean;
    readonly error?: string;
}
export interface IHttpRequest {
    readonly response: IHttpResponse;
    setUrl(url: string): IHttpRequest;
    getTimeStamp(day?: number): string;
    existsCookie(cook: string): boolean;
    setRawCookie(cook: string): IHttpRequest;
    setCookie(key: string, value: string): IHttpRequest
    removeHeader(key: string): IHttpRequest;
    setHeader(key: string, value: string): IHttpRequest;
    getAsync(follow_location?: boolean): Promise<void>;
    postAsync(body: string, follow_location?: boolean): Promise<void>;
    sendAsync(body: string, follow_location?: boolean): Promise<void>;
    get(follow_location?: boolean): IHttpRequest;
    post(body: string, follow_location?: boolean): IHttpRequest;
    send(body: string, follow_location?: boolean): IHttpRequest;
    moveToRequest(withHeader?: boolean): IHttpRequest;
    clearResponse(): IHttpRequest;
}
export interface HttpRequestConstructor {
    new(url: string, opt: IHttpConfig): IHttpRequest;
    new(url: string): IHttpRequest;
    new(): IHttpRequest;
    readonly prototype: IHttpRequest;
}
declare var HttpRequest: HttpRequestConstructor;