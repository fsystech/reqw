/**
* MIT License
*
* Copyright (c) 2022 FSys Tech Ltd.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
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

