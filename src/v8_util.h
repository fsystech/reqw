/**
* Copyright (c) 2018, SOW (https://www.safeonline.world). (https://github.com/RKTUXYN) All rights reserved.
* @author {SOW}
* Copyrights licensed under the New BSD License.
* See the accompanying LICENSE file for terms.
*/
#if defined(_MSC_VER)
#pragma once
#endif//!_MSC_VER
#if !defined(_v8_util_h)
#	define _v8_util_h
#	include <node.h>
#	include <map>
#if !defined(v8_str)
#define v8_str(isolate, x)\
	v8::String::NewFromUtf8(isolate, x, v8::NewStringType::kNormal).ToLocalChecked()
#endif//!v8_str

#if !defined(throw_js_error)
#define throw_js_error(isolate, err)\
	isolate->ThrowException(v8::Exception::Error(v8_str(isolate, err)))
#endif//!throw_js_error

#if !defined(throw_js_type_error)
#define throw_js_type_error(isolate, err)\
	isolate->ThrowException(v8::Exception::TypeError(v8_str(isolate, err)))
#endif//!throw_js_type_error
#endif //!_v8_util_h
class internal_data {
public:
	explicit internal_data( v8::Isolate *isolate );
	// Per-addon data.
	int initilized;
};
namespace sow_util{
bool to_boolean(v8::Isolate* isolate, v8::Local<v8::Value> value);
internal_data *get_internal_data( v8::Local<v8::Value> value );
std::string to_cstr( v8::Isolate *isolate, v8::Local<v8::Value>val );
void to_cstr( v8::Isolate *isolate, v8::Local<v8::Value>val, std::string &output );
void destroy_app( const v8::FunctionCallbackInfo<v8::Value> &args );
const char* to_char_str(v8::Isolate* isolate, v8::Local<v8::Value> x);
void v8_object_loop( v8::Isolate *isolate, const v8::Local<v8::Object>v8_obj, std::map<std::string, std::string> &out_put ) ;
}

