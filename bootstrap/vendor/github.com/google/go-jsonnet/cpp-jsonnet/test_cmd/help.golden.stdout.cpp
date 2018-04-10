Jsonnet commandline interpreter v0.10.0

General commandline:
jsonnet [<cmd>] {<option>} { <filename> }
Note: <cmd> defaults to "eval"

The eval command:
jsonnet eval {<option>} <filename>
Note: Only one filename is supported

Available eval options:
  -h / --help             This message
  -e / --exec             Treat filename as code
  -J / --jpath <dir>      Specify an additional library search dir (right-most wins)
  -o / --output-file <file> Write to the output file rather than stdout
  -m / --multi <dir>      Write multiple files to the directory, list files on stdout
  -y / --yaml-stream      Write output as a YAML stream of JSON documents
  -S / --string           Expect a string, manifest as plain text
  -s / --max-stack <n>    Number of allowed stack frames
  -t / --max-trace <n>    Max length of stack trace before cropping
  --gc-min-objects <n>    Do not run garbage collector until this many
  --gc-growth-trigger <n> Run garbage collector after this amount of object growth
  --version               Print version
Available options for specifying values of 'external' variables:
Provide the value as a string:
  -V / --ext-str <var>[=<val>]     If <val> is omitted, get from environment var <var>
       --ext-str-file <var>=<file> Read the string from the file
Provide a value as Jsonnet code:
  --ext-code <var>[=<code>]    If <code> is omitted, get from environment var <var>
  --ext-code-file <var>=<file> Read the code from the file
Available options for specifying values of 'top-level arguments':
Provide the value as a string:
  -A / --tla-str <var>[=<val>]     If <val> is omitted, get from environment var <var>
       --tla-str-file <var>=<file> Read the string from the file
Provide a value as Jsonnet code:
  --tla-code <var>[=<code>]    If <code> is omitted, get from environment var <var>
  --tla-code-file <var>=<file> Read the code from the file
Environment variables:
JSONNET_PATH is a colon (semicolon on Windows) separated list of directories added
in reverse order before the paths specified by --jpath (i.e. left-most wins)
E.g. JSONNET_PATH=a:b jsonnet -J c -J d is equivalent to:
JSONNET_PATH=d:c:a:b jsonnet
jsonnet -J b -J a -J c -J d

The fmt command:
jsonnet fmt {<option>} { <filename> }
Note: Some options do not support multiple filenames

Available fmt options:
  -h / --help             This message
  -e / --exec             Treat filename as code
  -o / --output-file <file> Write to the output file rather than stdout
  -i / --in-place         Update the Jsonnet file(s) in place.
  --test                  Exit with failure if reformatting changed the file(s).
  -n / --indent <n>       Number of spaces to indent by (default 2, 0 means no change)
  --max-blank-lines <n>   Max vertical spacing, 0 means no change (default 2)
  --string-style <d|s|l>  Enforce double, single (default) quotes or 'leave'
  --comment-style <h|s|l> # (h), // (s)(default), or 'leave'; never changes she-bang
  --[no-]pretty-field-names Use syntax sugar for fields and indexing (on by default)
  --[no-]pad-arrays       [ 1, 2, 3 ] instead of [1, 2, 3]
  --[no-]pad-objects      { x: 1, x: 2 } instead of {x: 1, y: 2} (on by default)
  --[no-]sort-imports     Sorting of imports (on by default)
  --debug-desugaring      Unparse the desugared AST without executing it
  --version               Print version

In all cases:
<filename> can be - (stdin)
Multichar options are expanded e.g. -abc becomes -a -b -c.
The -- option suppresses option processing for subsequent arguments.
Note that since filenames and jsonnet programs can begin with -, it is advised to
use -- if the argument is unknown, e.g. jsonnet -- "$FILENAME".
