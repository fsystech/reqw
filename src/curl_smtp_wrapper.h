/**
* Copyright (c) 2018, SOW (https://www.safeonline.world). (https://github.com/RKTUXYN) All rights reserved.
* @author {SOW}
* Copyrights licensed under the New BSD License.
* See the accompanying LICENSE file for terms.
*/
//11:44 PM 2/12/2020
#if defined(_MSC_VER)
#pragma once
#endif//!_MSC_VER
#if !defined(_curl_smtp_wrapper_h)
#	define _curl_smtp_wrapper_h
#	include <v8.h>
void smtp_export(v8::Isolate* isolate, v8::Handle<v8::Object> target);
#endif//!_image_win_h