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
// by Rajib chy
// 6:55 PM 12/12/2020
#   include "v8_util.h"
#   include "curl_download_wrapper.h"
#   include "curl_http_wrapper.h"
#   include "curl_smtp_wrapper.h"

#define SET_NATIVE_METHOD(app, isolate, method_name, method, external, context) \
    app->Set( context,                                                          \
    v8_str( isolate, method_name ),                                             \
    v8::FunctionTemplate::New( isolate, method, external )                      \
    ->GetFunction( context ).ToLocalChecked( ) ).FromJust( );

void Initialize( v8::Local<v8::Object> exports ) {
    v8::Isolate *isolate = v8::Isolate::GetCurrent( );
    v8::Local<v8::Context> context = isolate->GetCurrentContext( );
    // Create a new instance of `AddonData` for this instance of the addon and
    // tie its life cycle to that of the Node.js environment.
    internal_data *data = new internal_data( isolate );
    // Wrap the data in a `v8::External` so we can pass it to the method we
    // expose.
    v8::Local<v8::External> external = v8::External::New( isolate, data );
    v8::Local<v8::Object> app = v8::Object::New( isolate );
    // Expose the method `Method` to JavaScript, and make sure it receives the
    // per-addon-instance data we created above by passing `external` as the
    // third parameter to the `FunctionTemplate` constructor.
    SET_NATIVE_METHOD( app, isolate, "create_http_request", http_request, external, context );
    SET_NATIVE_METHOD( app, isolate, "create_smtp_request", smtp_request, external, context );
    SET_NATIVE_METHOD( app, isolate, "create_http_download_request", http_download_request, external, context );
    exports->Set( context, v8_str( isolate, "reqw" ), app ).ToChecked( );
}

NODE_MODULE( reqw, Initialize )