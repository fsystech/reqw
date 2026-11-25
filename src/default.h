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
// by Rajib Chy
// 4:19 PM 12/24/2020

#if !defined(FALSE)
#	define FALSE 0
#endif// !FALSE
#if !defined(TRUE)
#	define TRUE 1
#endif// !TRUE
#if !defined(_free_obj)
#define _free_obj(obj)                  \
while(obj){                             \
    obj->clear();delete obj;obj = NULL; \
}
#endif//!_free_obj
#if !defined(_free_char)
#define _free_char(obj)                 \
while(obj){                             \
    delete[] obj; obj = NULL;           \
}
#endif//!_free_char
#if !defined(js_method_args)
#define js_method_args const v8::FunctionCallbackInfo<v8::Value>& args
#endif//!js_method_args
#if !defined(V8_JS_METHOD)
#define V8_JS_METHOD(name)\
void name(js_method_args)
#endif//!V8_JS_METHOD
template<class _swap_obj>
void swap_obj(_swap_obj& obj) {
	obj.clear();
	_swap_obj().swap(obj);
}
