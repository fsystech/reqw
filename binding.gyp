{
    "targets": [
        {
            "target_name": "reqw",
            "cflags!": ["-fno-exceptions"],
            "cflags_cc!": ["-fno-exceptions"],
            "sources": [
                "./src/addon.cc",
                "./src/v8_util.cpp",
                "./src/curl_util.cpp",
                "./src/smtp_client.cpp",
                "./src/http_request.cpp",
                "./src/download_request.cpp",
                "./src/curl_smtp_wrapper.cpp",
                "./src/curl_http_wrapper.cpp",
                "./src/curl_download_wrapper.cpp"
                
            ],
            'defines': ['NAPI_DISABLE_CPP_EXCEPTIONS', 'BUILDING_WKHTMLTOX'],
            "msvs_settings": {
                "VCCLCompilerTool": {
                    "ExceptionHandling": 1
                }
            },
            "direct_dependent_settings": {},
            "conditions": [
                ["OS=='linux'", {
                    'defines': [
                        'LINUX_OS',
                    ],
                    'include_dirs': [
                        "<!(node -e \"console.log('./dependency/linux/%s/curl/include',require('process').arch);\")",
                        "<!(node -e \"require('nan')\")"
                    ],
                    "link_settings": {
                        "libraries": [
                            "<!(node -e \"console.log('../dependency/linux/%s/curl/lib/libcurl.so.0',require('process').arch);\")"
                        ]
                    },
                }],
                ['OS=="win"', {
                    "include_dirs": [
                        "<!(node -e \"console.log('./dependency/win/%s/curl/include',require('process').arch);\")",
                        "<!(node -e \"require('nan')\")"
                    ],
                    "link_settings": {
                        "libraries": [
                            "<!(node -e \"console.log('../dependency/win/%s/curl/lib/libcurl.lib',require('process').arch);\")"
                        ]
                    },
                    "defines": [
                        'WINDOWS_OS'
                    ]
                }]
            ]
        },
        {
            "target_name": "action_after_build",
            "type": "none",
            "dependencies": ["<(module_name)"],
            "conditions": [
                ["OS=='linux'", {
                    "copies": [{
                        "files": [
                            "<(PRODUCT_DIR)/<(module_name).node",
                        ],
                        "destination": "<(module_path)"
                    }]
                }],
                ['OS=="win"', {
                    "copies": [{
                        "files": [
                            "<(PRODUCT_DIR)/<(module_name).node",
                            "<!(node -e \"console.log('./dependency/win/%s/curl/bin/libcurl.dll', require('process').arch);\")"
                        ],
                        "destination": "<(module_path)"
                    }]
                }]
            ]
        }
    ]
}
