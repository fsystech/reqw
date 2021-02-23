#include "v8_util.h"
#include "default.h"
bool sow_util::to_boolean( v8::Isolate *isolate, v8::Local<v8::Value> value ) {
#if V8_MAJOR_VERSION < 7 || (V8_MAJOR_VERSION == 7 && V8_MINOR_VERSION == 0)
	/* Old */
	return value->BooleanValue( isolate->GetCurrentContext( ) ).ToChecked( );
#else
	return value->BooleanValue( isolate );
#endif
}
internal_data::internal_data( v8::Isolate *isolate ) {
	this->initilized = FALSE;
}
internal_data *sow_util::get_internal_data( v8::Local<v8::Value> value ) {
	return reinterpret_cast< internal_data * >(value.As<v8::External>( )->Value( ));
}
std::string sow_util::to_cstr( v8::Isolate *isolate, v8::Local<v8::Value>val ) {
	if ( val->IsNullOrUndefined( ) ) return std::string( );
	v8::String::Utf8Value str( isolate, val );
	return std::string( *str );
}
const char *_toCharStr( const v8::String::Utf8Value &value ) {
	if ( value.length( ) <= 0 )return "";
	return *value ? *value : "<string conversion failed>";
}
const char *sow_util::to_char_str( v8::Isolate *isolate, v8::Local<v8::Value> x ) {
	v8::String::Utf8Value str( isolate, x );
	return _toCharStr( str );
}
void sow_util::to_cstr( v8::Isolate *isolate, v8::Local<v8::Value>val, std::string &output ) {
	if ( val->IsNullOrUndefined( ) ) return;
	v8::String::Utf8Value str( isolate, val );
	output.insert( output.length( ), *str );
}
void sow_util::destroy_app( const v8::FunctionCallbackInfo<v8::Value> &args ) {
	internal_data *idata = get_internal_data( args.Data( ) );
	if ( idata->initilized == TRUE ) {
		// destroy_wkhtmltopdf( );
		idata->initilized = FALSE;
	}
}
void sow_util::v8_object_loop( v8::Isolate *isolate, const v8::Local<v8::Object>v8_obj, std::map<std::string, std::string> &out_put ) {
	v8::Local<v8::Context>ctx = isolate->GetCurrentContext( );
	v8::Local<v8::Array> property_names = v8_obj->GetOwnPropertyNames( ctx ).ToLocalChecked( );
	uint32_t length = property_names->Length( );
	for ( uint32_t i = 0; i < length; ++i ) {
		v8::Local<v8::Value> key = property_names->Get( ctx, i ).ToLocalChecked( );
		v8::Local<v8::Value> value = v8_obj->Get( ctx, key ).ToLocalChecked( );
		if ( value->IsNullOrUndefined( ) )continue;
		if ( key->IsString( ) && value->IsString( ) ) {
			out_put[to_cstr( isolate, key )] = to_cstr( isolate, value );
		}
	}
}