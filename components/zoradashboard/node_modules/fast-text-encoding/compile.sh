#!/usr/bin/env sh

google-closure-compiler             \
	--compilation_level ADVANCED      \
	--js_output_file text.min.js      \
	--language_out ECMASCRIPT5        \
	--warning_level VERBOSE           \
	--create_source_map %outname%.map \
	--externs externs.js              \
	text.js
