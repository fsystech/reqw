/**
* Copyright (c) 2018, SOW (https://www.safeonline.world). (https://github.com/RKTUXYN) All rights reserved.
* @author {SOW}
* Copyrights licensed under the New BSD License.
* See the accompanying LICENSE file for terms.
*/
//By Rajib Chy
// On 12:25 PM 12/25/2020
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
declare interface Dict<T> {
    [key: string]: T | undefined;
}
export interface IHttpConfig {
    is_debug?: boolean;
    is_verify_ssl?: boolean;
    is_verify_ssl_host?: boolean;
}
export interface INativeResult {
    ret_val: number;
    ret_msg: string;
    response_body?: string;
    response_header?: string
}
export declare interface INativeHttpReqParam {
    method: string;
    cookie?: string;
    header?: string[];
    is_verify_ssl_host: boolean;
    is_verify_ssl: boolean;
    is_debug: boolean;
    url: string;
    body?: string;
    follow_location: boolean;
}
export declare interface reqw_native {
    create_http_request(opt: INativeHttpReqParam): INativeResult;
    create_smtp_request(...args: any[]): string;
    create_http_download_request(...args: any[]): INativeResult;
}
interface IHttpResponse {
    readonly httpStatusCode?: number;
    readonly cookie?: string[];
    readonly header?: IncomingHttpHeaders;//Dict<string>;
    readonly body?: string;
    readonly is_error?: boolean;
    readonly error?: string;
    dispose(): void;
}
export declare interface IHttpRequest {
    readonly url: string;
    readonly response: IHttpResponse;
    setUrl(url: string): IHttpRequest;
    getTimeStamp(day?: number): string;
    existsCookie(cook: string): boolean;
    setRawCookie(cook: string): IHttpRequest;
    setCookie(key: string, value: string): IHttpRequest;
    setRawCookie(cook: string): IHttpRequest;
    removeHeader(key: string): IHttpRequest;
    setHeader(key: string, value: string): IHttpRequest;
    getAsync(follow_location?: boolean): Promise<void>;
    postAsync(body: string | Dict<any>, follow_location?: boolean): Promise<void>;
    sendAsync(body: string | Dict<any>, follow_location?: boolean): Promise<void>;
    get(follow_location?: boolean): IHttpRequest;
    post(body: string | Dict<any>, follow_location?: boolean): IHttpRequest;
    send(body: string | Dict<any>, follow_location?: boolean): IHttpRequest;
    moveToRequest(withHeader?: boolean): IHttpRequest;
    clearResponse(): IHttpRequest;
    dispose(): void;
}
export class ClsHttpRequest implements IHttpRequest {
    public method: string;
    public cookie: string[];
    public header: OutgoingHttpHeaders;
    public is_verify_ssl_host: boolean;
    public is_verify_ssl: boolean;
    public is_debug: boolean;
    public url: string;
    public response: IHttpResponse;
    public setUrl(url: string): IHttpRequest;
    public getTimeStamp(day?: number): string;
    public existsCookie(cook: string): boolean;
    public setRawCookie(cook: string): IHttpRequest;
    public setCookie(key: string, value: string): IHttpRequest;
    public setRawCookie(cook: string): IHttpRequest;
    public removeHeader(key: string): IHttpRequest;
    public setHeader(key: string, value: string): IHttpRequest;
    public getAsync(follow_location?: boolean): Promise<void>;
    public postAsync(body: string | Dict<any>, follow_location?: boolean): Promise<void>;
    public sendAsync(body: string | Dict<any>, follow_location?: boolean): Promise<void>;
    public get(follow_location?: boolean): IHttpRequest;
    public post(body: string | Dict<any>, follow_location?: boolean): IHttpRequest;
    public send(body: string | Dict<any>, follow_location?: boolean): IHttpRequest;
    public moveToRequest(withHeader?: boolean): IHttpRequest;
    public clearResponse(): IHttpRequest;
    public dispose(): void;
}
export declare interface HttpRequestConstructor {
    new(url: string, opt: IHttpConfig): IHttpRequest;
    new(url: string): IHttpRequest;
    new(): IHttpRequest;
    readonly prototype: IHttpRequest;
}
declare var HttpRequest: HttpRequestConstructor;
declare interface IMimeEncoder {
    readonly binary: "binary";
    readonly bit: "8bit";
    readonly base64: "base64";
    readonly quotedPrintable: "quoted-printable";
}
declare interface IMailMimeType {
    readonly text: {
        readonly plain: "text/plain";
        readonly html: "text/html";
        readonly xml: "text/xml";
        readonly richText: "text/richtext";
    };
    readonly application: {
        readonly soap: "application/soap+xml";
        readonly octet: "application/octet-stream";
        readonly rtf: "application/rtf";
        readonly pdf: "application/pdf";
        readonly zip: "application/zip";
        readonly multi_part: "multipart/mixed";
    };
    readonly image: {
        readonly gif: "image/gif";
        readonly tiff: "image/tiff";
        readonly jpeg: "image/jpeg";
    };
}
declare interface IMailAttachments {
    readonly name: string;
    readonly path: string;
    readonly mim_type: string;
    readonly encoder: string;
}
declare interface ITemplateParser {
    read(path: string): void;
    parse(param: any[]): string;
    getTemplate(): string;
    clear(): void;
}
declare interface TemplateParserConstructor {
    new(): ITemplateParser;
    new(path: string): ITemplateParser;
    readonly prototype: ITemplateParser;
}
declare interface IMailMessage {
    from(from: string): IMailMessage;
    to(to: string): IMailMessage;
    cc(cc: string): IMailMessage;
    bcc(bcc: string): IMailMessage;
    subject(subs: string): IMailMessage;
    body(str: string, isHtml?: boolean): IMailMessage;
    attachment(opt: IMailAttachments): IMailMessage;
    attachment(task: 'DEL'): IMailMessage;
    bodyAsHtml(): IMailMessage;
    clear(): IMailMessage;
}
declare interface MailMessageConstructor {
    new(): IMailMessage;
    new(from: string): IMailMessage;
    new(from: string, to: string): IMailMessage;
    new(from: string, to: string, subs: string): IMailMessage;
    readonly prototype: IMailMessage;
}
declare interface ISmtpRequest {
    restOption(): ISmtpRequest;
    debug(): ISmtpRequest;
    verifySSL(): ISmtpRequest;
    enableTls(): ISmtpRequest;
    cert(path: string): ISmtpRequest;
    host(host: string): ISmtpRequest;
    dispose(): ISmtpRequest;
    credential(user: string, pwd: string): ISmtpRequest;
    sendMail(mailMessage: IMailMessage): { success: boolean; msg: string; };
}
interface SmtpRequestConstructor {
    new(url: string, opt: IHttpConfig): ISmtpRequest;
    new(url: string): ISmtpRequest;
    new(): ISmtpRequest;
    readonly prototype: ISmtpRequest;
}
declare var SMTPRequest: SmtpRequestConstructor;
declare var MailMessage: MailMessageConstructor;
declare var TemplateParser: TemplateParserConstructor;
declare var mimeType: IMailMimeType;
declare var mimeEncoder: IMimeEncoder;