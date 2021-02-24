/**
* Copyright (c) 2018, SOW (https://www.safeonline.world). (https://github.com/RKTUXYN) All rights reserved.
* @author {SOW}
* Copyrights licensed under the New BSD License.
* See the accompanying LICENSE file for terms.
*/
//By Rajib Chy
// On 12:25 PM 12/25/2020
declare interface Dict<T> {
    [key: string]: T | undefined;
}
export interface IHttpConfig {
    is_debug?: boolean;
    is_verify_ssl?: boolean;
    is_verify_ssl_host?: boolean;
}
export interface INativeResult { ret_val: number; ret_msg: string; response_body?: string; response_header?: string }
export interface reqw_native {
    create_http_request(...args: any[]): INativeResult;
    create_smtp_request(...args: any[]): string;
    create_http_download_request(...args: any[]): INativeResult;
}
interface IHttpResponse {
    readonly http_status_code: number;
    readonly cookie: string[];
    readonly header: Dict<string>;
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
declare interface IMimeEncoder {
    binary: "binary";
    bit: "8bit";
    base64: "base64";
    quotedPrintable: "quoted-printable";
}
declare interface IMailMimeType {
    text: {
        plain: "text/plain";
        html: "text/html";
        xml: "text/xml";
        richText: "text/richtext";
    };
    application: {
        soap: "application/soap+xml";
        octet: "application/octet-stream";
        rtf: "application/rtf";
        pdf: "application/pdf";
        zip: "application/zip";
        multi_part: "multipart/mixed";
    };
    image: {
        gif: "image/gif";
        tiff: "image/tiff";
        jpeg: "image/jpeg";
    };
}
declare interface IMailAttachments {
    name: string;
    path: string;
    mim_type: string;
    encoder: string;
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
interface IMailMessage {
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
interface MailMessageConstructor {
    new(): IMailMessage;
    new(from: string): IMailMessage;
    new(from: string, to: string): IMailMessage;
    new(from: string, to: string, subs: string): IMailMessage;
    readonly prototype: IMailMessage;
}
interface ISmtpRequest {
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