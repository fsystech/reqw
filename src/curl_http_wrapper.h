/**
* Copyright (c) 2018, SOW (https://www.safeonline.world). (https://github.com/RKTUXYN) All rights reserved.
* @author {SOW}
* Copyrights licensed under the New BSD License.
* See the accompanying LICENSE file for terms.
*/
//11:39 PM 2/12/2020
#if defined(_MSC_VER)
#pragma once
#endif//!_MSC_VER
#if !defined(_curl_http_wrapper_h)
#	define _curl_http_wrapper_h
#	include <v8.h>
void http_export(v8::Isolate* isolate, v8::Handle<v8::Object> target);
void on_resource_free();
#endif//!_curl_http_wrapper_h