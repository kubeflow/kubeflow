/*
Copyright 2015 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

#include <cassert>
#include <cstdlib>
#include <cstring>

#include <exception>
#include <fstream>
#include <iostream>
#include <list>
#include <map>
#include <sstream>
#include <string>
#include <vector>

extern "C" {
#include <libjsonnet.h>
}

#ifdef _WIN32
const char PATH_SEP = ';';
#else
const char PATH_SEP = ':';
#endif

std::string next_arg(unsigned &i, const std::vector<std::string> &args)
{
    i++;
    if (i >= args.size()) {
        std::cerr << "Expected another commandline argument." << std::endl;
        exit(EXIT_FAILURE);
    }
    return args[i];
}

/** Collect commandline args into a vector of strings, and expand -foo to -f -o -o. */
std::vector<std::string> simplify_args(int argc, const char **argv)
{
    std::vector<std::string> r;
    for (int i = 1; i < argc; ++i) {
        std::string arg = argv[i];
        if (arg == "--") {
            // Add this arg and all remaining ones without simplification.
            r.push_back(arg);
            while ((++i) < argc)
                r.push_back(argv[i]);
            break;
        }
        // Check if it is of the form -abc and convert to -a -b -c
        if (arg.length() > 2 && arg[0] == '-' && arg[1] != '-') {
            for (unsigned j = 1; j < arg.length(); ++j) {
                r.push_back("-" + arg.substr(j, 1));
            }
        } else {
            r.push_back(arg);
        }
    }
    return r;
}

void version(std::ostream &o)
{
    o << "Jsonnet commandline interpreter " << jsonnet_version() << std::endl;
}

void usage(std::ostream &o)
{
    version(o);
    o << "\n";
    o << "General commandline:\n";
    o << "jsonnet [<cmd>] {<option>} { <filename> }\n";
    o << "Note: <cmd> defaults to \"eval\"\n";
    o << "\n";
    o << "The eval command:\n";
    o << "jsonnet eval {<option>} <filename>\n";
    o << "Note: Only one filename is supported\n";
    o << "\n";
    o << "Available eval options:\n";
    o << "  -h / --help             This message\n";
    o << "  -e / --exec             Treat filename as code\n";
    o << "  -J / --jpath <dir>      Specify an additional library search dir (right-most wins)\n";
    o << "  -o / --output-file <file> Write to the output file rather than stdout\n";
    o << "  -m / --multi <dir>      Write multiple files to the directory, list files on stdout\n";
    o << "  -y / --yaml-stream      Write output as a YAML stream of JSON documents\n";
    o << "  -S / --string           Expect a string, manifest as plain text\n";
    o << "  -s / --max-stack <n>    Number of allowed stack frames\n";
    o << "  -t / --max-trace <n>    Max length of stack trace before cropping\n";
    o << "  --gc-min-objects <n>    Do not run garbage collector until this many\n";
    o << "  --gc-growth-trigger <n> Run garbage collector after this amount of object growth\n";
    o << "  --version               Print version\n";
    o << "Available options for specifying values of 'external' variables:\n";
    o << "Provide the value as a string:\n";
    o << "  -V / --ext-str <var>[=<val>]     If <val> is omitted, get from environment var <var>\n";
    o << "       --ext-str-file <var>=<file> Read the string from the file\n";
    o << "Provide a value as Jsonnet code:\n";
    o << "  --ext-code <var>[=<code>]    If <code> is omitted, get from environment var <var>\n";
    o << "  --ext-code-file <var>=<file> Read the code from the file\n";
    o << "Available options for specifying values of 'top-level arguments':\n";
    o << "Provide the value as a string:\n";
    o << "  -A / --tla-str <var>[=<val>]     If <val> is omitted, get from environment var <var>\n";
    o << "       --tla-str-file <var>=<file> Read the string from the file\n";
    o << "Provide a value as Jsonnet code:\n";
    o << "  --tla-code <var>[=<code>]    If <code> is omitted, get from environment var <var>\n";
    o << "  --tla-code-file <var>=<file> Read the code from the file\n";
    o << "Environment variables:\n";
    o << "JSONNET_PATH is a colon (semicolon on Windows) separated list of directories added\n";
    o << "in reverse order before the paths specified by --jpath (i.e. left-most wins)\n";
    o << "E.g. JSONNET_PATH=a:b jsonnet -J c -J d is equivalent to:\n";
    o << "JSONNET_PATH=d:c:a:b jsonnet\n";
    o << "jsonnet -J b -J a -J c -J d\n";
    o << "\n";
    o << "The fmt command:\n";
    o << "jsonnet fmt {<option>} { <filename> }\n";
    o << "Note: Some options do not support multiple filenames\n";
    o << "\n";
    o << "Available fmt options:\n";
    o << "  -h / --help             This message\n";
    o << "  -e / --exec             Treat filename as code\n";
    o << "  -o / --output-file <file> Write to the output file rather than stdout\n";
    o << "  -i / --in-place         Update the Jsonnet file(s) in place.\n";
    o << "  --test                  Exit with failure if reformatting changed the file(s).\n";
    o << "  -n / --indent <n>       Number of spaces to indent by (default 2, 0 means no change)\n";
    o << "  --max-blank-lines <n>   Max vertical spacing, 0 means no change (default 2)\n";
    o << "  --string-style <d|s|l>  Enforce double, single (default) quotes or 'leave'\n";
    o << "  --comment-style <h|s|l> # (h), // (s)(default), or 'leave'; never changes she-bang\n";
    o << "  --[no-]pretty-field-names Use syntax sugar for fields and indexing (on by default)\n";
    o << "  --[no-]pad-arrays       [ 1, 2, 3 ] instead of [1, 2, 3]\n";
    o << "  --[no-]pad-objects      { x: 1, x: 2 } instead of {x: 1, y: 2} (on by default)\n";
    o << "  --[no-]sort-imports     Sorting of imports (on by default)\n";
    o << "  --debug-desugaring      Unparse the desugared AST without executing it\n";
    o << "  --version               Print version\n";
    o << "\n";
    o << "In all cases:\n";
    o << "<filename> can be - (stdin)\n";
    o << "Multichar options are expanded e.g. -abc becomes -a -b -c.\n";
    o << "The -- option suppresses option processing for subsequent arguments.\n";
    o << "Note that since filenames and jsonnet programs can begin with -, it is advised to\n";
    o << "use -- if the argument is unknown, e.g. jsonnet -- \"$FILENAME\".";
    o << std::endl;
}

long strtol_check(const std::string &str)
{
    const char *arg = str.c_str();
    char *ep;
    long r = std::strtol(arg, &ep, 10);
    if (*ep != '\0' || *arg == '\0') {
        std::cerr << "ERROR: invalid integer \"" << arg << "\"\n" << std::endl;
        exit(EXIT_FAILURE);
    }
    return r;
}

enum Command {
    EVAL,
    FMT,
};

/** Class for representing configuration read from command line flags.  */
struct JsonnetConfig {
    Command cmd;
    std::vector<std::string> inputFiles;
    std::string outputFile;
    bool filenameIsCode;

    // EVAL flags
    bool evalMulti;
    bool evalStream;
    std::string evalMultiOutputDir;

    // FMT flags
    bool fmtInPlace;
    bool fmtTest;

    JsonnetConfig()
        : cmd(EVAL),
          filenameIsCode(false),
          evalMulti(false),
          evalStream(false),
          fmtInPlace(false),
          fmtTest(false)
    {
    }
};

bool get_var_val(const std::string &var_val, std::string &var, std::string &val)
{
    size_t eq_pos = var_val.find_first_of('=', 0);
    if (eq_pos == std::string::npos) {
        var = var_val;
        const char *val_cstr = ::getenv(var.c_str());
        if (val_cstr == nullptr) {
            std::cerr << "ERROR: environment variable " << var << " was undefined." << std::endl;
            return false;
        }
        val = val_cstr;
    } else {
        var = var_val.substr(0, eq_pos);
        val = var_val.substr(eq_pos + 1, std::string::npos);
    }
    return true;
}

bool get_var_file(const std::string &var_file, const std::string &imp, std::string &var, std::string &val)
{
    size_t eq_pos = var_file.find_first_of('=', 0);
    if (eq_pos == std::string::npos) {
        std::cerr << "ERROR: argument not in form <var>=<file> \"" << var_file << "\"."
                  << std::endl;
        return false;
    }
    var = var_file.substr(0, eq_pos);
    const std::string path = var_file.substr(eq_pos + 1, std::string::npos);

    size_t b, e;
    val.erase().append(imp).append(" @'");
    // duplicate all the single quotes in @path to make a quoted string
    for (b = 0; (e = path.find("'", b)) != std::string::npos; b = e + 1) {
        val.append(path.substr(b, e - b + 1)).push_back('\'');
    }
    val.append(path.substr(b)).push_back('\'');

    return true;
}

enum ArgStatus {
    ARG_CONTINUE,
    ARG_SUCCESS,
    ARG_FAILURE,
};

/** Parse the command line arguments, configuring the Jsonnet VM context and
 * populating the JsonnetConfig.
 */
static ArgStatus process_args(int argc, const char **argv, JsonnetConfig *config, JsonnetVm *vm)
{
    auto args = simplify_args(argc, argv);
    std::vector<std::string> remaining_args;

    unsigned i = 0;
    if (args.size() > 0 && args[i] == "fmt") {
        config->cmd = FMT;
        i++;
    } else if (args.size() > 0 && args[i] == "eval") {
        config->cmd = EVAL;
        i++;
    }

    for (; i < args.size(); ++i) {
        const std::string &arg = args[i];
        if (arg == "-h" || arg == "--help") {
            usage(std::cout);
            return ARG_SUCCESS;
        } else if (arg == "-v" || arg == "--version") {
            version(std::cout);
            return ARG_SUCCESS;
        } else if (arg == "-e" || arg == "--exec") {
            config->filenameIsCode = true;
        } else if (arg == "-o" || arg == "--output-file") {
            std::string output_file = next_arg(i, args);
            if (output_file.length() == 0) {
                std::cerr << "ERROR: -o argument was empty string" << std::endl;
                return ARG_FAILURE;
            }
            config->outputFile = output_file;
        } else if (arg == "--") {
            // All subsequent args are not options.
            while ((++i) < args.size())
                remaining_args.push_back(args[i]);
            break;
        } else if (config->cmd == EVAL) {
            if (arg == "-s" || arg == "--max-stack") {
                long l = strtol_check(next_arg(i, args));
                if (l < 1) {
                    std::cerr << "ERROR: invalid --max-stack value: " << l << std::endl;
                    return ARG_FAILURE;
                }
                jsonnet_max_stack(vm, l);
            } else if (arg == "-J" || arg == "--jpath") {
                std::string dir = next_arg(i, args);
                if (dir.length() == 0) {
                    std::cerr << "ERROR: -J argument was empty string" << std::endl;
                    return ARG_FAILURE;
                }
                if (dir[dir.length() - 1] != '/') {
                    dir += '/';
                }
                jsonnet_jpath_add(vm, dir.c_str());
            } else if (arg == "-V" || arg == "--ext-str") {
                std::string var, val;
                if (!get_var_val(next_arg(i, args), var, val))
                    return ARG_FAILURE;
                jsonnet_ext_var(vm, var.c_str(), val.c_str());
            } else if (arg == "-E" || arg == "--var" || arg == "--env") {
                // TODO(dcunnin): Delete this in a future release.
                std::cerr << "WARNING: jsonnet eval -E, --var and --env are deprecated,"
                          << " please use -V or --ext-str." << std::endl;
                std::string var, val;
                if (!get_var_val(next_arg(i, args), var, val))
                    return ARG_FAILURE;
                jsonnet_ext_var(vm, var.c_str(), val.c_str());
            } else if (arg == "--ext-str-file") {
                std::string var, val;
                if (!get_var_file(next_arg(i, args), "importstr", var, val))
                    return ARG_FAILURE;
                jsonnet_ext_code(vm, var.c_str(), val.c_str());
            } else if (arg == "-F" || arg == "--file") {
                // TODO(dcunnin): Delete this in a future release.
                std::cerr << "WARNING: jsonnet eval -F and --file are deprecated,"
                          << " please use --ext-str-file." << std::endl;
                std::string var, val;
                if (!get_var_file(next_arg(i, args), "importstr", var, val))
                    return ARG_FAILURE;
                jsonnet_ext_code(vm, var.c_str(), val.c_str());
            } else if (arg == "--ext-code") {
                std::string var, val;
                if (!get_var_val(next_arg(i, args), var, val))
                    return ARG_FAILURE;
                jsonnet_ext_code(vm, var.c_str(), val.c_str());
            } else if (arg == "--code-var" || arg == "--code-env") {
                // TODO(dcunnin): Delete this in a future release.
                std::cerr << "WARNING: jsonnet eval --code-var and --code-env are deprecated,"
                          << " please use --ext-code." << std::endl;
                std::string var, val;
                if (!get_var_val(next_arg(i, args), var, val))
                    return ARG_FAILURE;
                jsonnet_ext_code(vm, var.c_str(), val.c_str());
            } else if (arg == "--ext-code-file") {
                std::string var, val;
                if (!get_var_file(next_arg(i, args), "import", var, val))
                    return ARG_FAILURE;
                jsonnet_ext_code(vm, var.c_str(), val.c_str());
            } else if (arg == "--code-file") {
                // TODO(dcunnin): Delete this in a future release.
                std::cerr << "WARNING: jsonnet eval --code-file is deprecated,"
                          << " please use --ext-code-file." << std::endl;
                std::string var, val;
                if (!get_var_file(next_arg(i, args), "import", var, val))
                    return ARG_FAILURE;
                jsonnet_ext_code(vm, var.c_str(), val.c_str());
            } else if (arg == "-A" || arg == "--tla-str") {
                std::string var, val;
                if (!get_var_val(next_arg(i, args), var, val))
                    return ARG_FAILURE;
                jsonnet_tla_var(vm, var.c_str(), val.c_str());
            } else if (arg == "--tla-str-file") {
                std::string var, val;
                if (!get_var_file(next_arg(i, args), "importstr", var, val))
                    return ARG_FAILURE;
                jsonnet_tla_code(vm, var.c_str(), val.c_str());
            } else if (arg == "--tla-code") {
                std::string var, val;
                if (!get_var_val(next_arg(i, args), var, val))
                    return ARG_FAILURE;
                jsonnet_tla_code(vm, var.c_str(), val.c_str());
            } else if (arg == "--tla-code-file") {
                std::string var, val;
                if (!get_var_file(next_arg(i, args), "import", var, val))
                    return ARG_FAILURE;
                jsonnet_tla_code(vm, var.c_str(), val.c_str());

            } else if (arg == "--gc-min-objects") {
                long l = strtol_check(next_arg(i, args));
                if (l < 0) {
                    std::cerr << "ERROR: invalid --gc-min-objects value: " << l << std::endl;
                    return ARG_FAILURE;
                }
                jsonnet_gc_min_objects(vm, l);
            } else if (arg == "-t" || arg == "--max-trace") {
                long l = strtol_check(next_arg(i, args));
                if (l < 0) {
                    std::cerr << "ERROR: invalid --max-trace value: " << l << std::endl;
                    return ARG_FAILURE;
                }
                jsonnet_max_trace(vm, l);
            } else if (arg == "--gc-growth-trigger") {
                const char *arg = next_arg(i, args).c_str();
                char *ep;
                double v = std::strtod(arg, &ep);
                if (*ep != '\0' || *arg == '\0') {
                    std::cerr << "ERROR: invalid number \"" << arg << "\"" << std::endl;
                    return ARG_FAILURE;
                }
                if (v < 0) {
                    std::cerr << "ERROR: invalid --gc-growth-trigger \"" << arg << "\""
                              << std::endl;
                    return ARG_FAILURE;
                }
                jsonnet_gc_growth_trigger(vm, v);
            } else if (arg == "-m" || arg == "--multi") {
                config->evalMulti = true;
                std::string output_dir = next_arg(i, args);
                if (output_dir.length() == 0) {
                    std::cerr << "ERROR: -m argument was empty string" << std::endl;
                    return ARG_FAILURE;
                }
                if (output_dir[output_dir.length() - 1] != '/') {
                    output_dir += '/';
                }
                config->evalMultiOutputDir = output_dir;
            } else if (arg == "-y" || arg == "--yaml-stream") {
                config->evalStream = true;
            } else if (arg == "-S" || arg == "--string") {
                jsonnet_string_output(vm, 1);
            } else if (arg.length() > 1 && arg[0] == '-') {
                std::cerr << "ERROR: unrecognized argument: " << arg << std::endl;
                return ARG_FAILURE;
            } else {
                remaining_args.push_back(args[i]);
            }

        } else {
            assert(config->cmd == FMT);
            if (arg == "-i" || arg == "--in-place") {
                config->fmtInPlace = true;
            } else if (arg == "--test") {
                config->fmtTest = true;
            } else if (arg == "-n" || arg == "--indent") {
                long l = strtol_check(next_arg(i, args));
                if (l < 0) {
                    std::cerr << "ERROR: invalid --indent value: " << l << std::endl;
                    return ARG_FAILURE;
                }
                jsonnet_fmt_indent(vm, l);
            } else if (arg == "--max-blank-lines") {
                long l = strtol_check(next_arg(i, args));
                if (l < 0) {
                    std::cerr << "ERROR: invalid --max-blank-lines value: " << l << ""
                              << std::endl;
                    return ARG_FAILURE;
                }
                jsonnet_fmt_max_blank_lines(vm, l);
            } else if (arg == "--comment-style") {
                const std::string val = next_arg(i, args);
                if (val == "h") {
                    jsonnet_fmt_comment(vm, 'h');
                } else if (val == "s") {
                    jsonnet_fmt_comment(vm, 's');
                } else if (val == "l") {
                    jsonnet_fmt_comment(vm, 'l');
                } else {
                    std::cerr << "ERROR: invalid --comment-style value: " << val
                              << std::endl;
                    return ARG_FAILURE;
                }
            } else if (arg == "--string-style") {
                const std::string val = next_arg(i, args);
                if (val == "d") {
                    jsonnet_fmt_string(vm, 'd');
                } else if (val == "s") {
                    jsonnet_fmt_string(vm, 's');
                } else if (val == "l") {
                    jsonnet_fmt_string(vm, 'l');
                } else {
                    std::cerr << "ERROR: invalid --string-style value: " << val
                              << std::endl;
                    return ARG_FAILURE;
                }
            } else if (arg == "--pad-arrays") {
                jsonnet_fmt_pad_arrays(vm, true);
            } else if (arg == "--no-pad-arrays") {
                jsonnet_fmt_pad_arrays(vm, false);
            } else if (arg == "--pad-objects") {
                jsonnet_fmt_pad_objects(vm, true);
            } else if (arg == "--no-pad-objects") {
                jsonnet_fmt_pad_objects(vm, false);
            } else if (arg == "--pretty-field-names") {
                jsonnet_fmt_pretty_field_names(vm, true);
            } else if (arg == "--no-pretty-field-names") {
                jsonnet_fmt_pretty_field_names(vm, false);
            } else if (arg == "--sort-imports") {
                jsonnet_fmt_sort_imports(vm, true);
            } else if (arg == "--no-sort-imports") {
                jsonnet_fmt_sort_imports(vm, false);
            } else if (arg == "--debug-desugaring") {
                jsonnet_fmt_debug_desugaring(vm, true);
            } else if (arg.length() > 1 && arg[0] == '-') {
                std::cerr << "ERROR: unrecognized argument: " << arg << std::endl;
                return ARG_FAILURE;
            } else {
                remaining_args.push_back(args[i]);
            }
        }
    }

    const char *want = config->filenameIsCode ? "code" : "filename";
    if (remaining_args.size() == 0) {
        std::cerr << "ERROR: must give " << want << "\n" << std::endl;
        usage(std::cerr);
        return ARG_FAILURE;
    }

    bool multiple_files_allowed = config->cmd == FMT && (config->fmtTest || config->fmtInPlace);
    if (!multiple_files_allowed) {
        if (remaining_args.size() > 1) {
            std::string filename = remaining_args[0];
            std::cerr << "ERROR: only one " << want << " is allowed\n" << std::endl;
            return ARG_FAILURE;
        }
    }
    config->inputFiles = remaining_args;
    return ARG_CONTINUE;
}

/** Reads from the input file or stdin into the input buffer. */
static bool read_input_content(std::string filename, std::string *input)
{
    // Input file "-" tells Jsonnet to read stdin.
    if (filename == "-") {
        input->assign(std::istreambuf_iterator<char>(std::cin), std::istreambuf_iterator<char>());
    } else {
        std::ifstream f;
        f.open(filename);
        if (!f.good()) {
            std::string msg = "Opening input file: " + filename;
            perror(msg.c_str());
            return false;
        }
        input->assign(std::istreambuf_iterator<char>(f), std::istreambuf_iterator<char>());
        if (!f.good()) {
            std::string msg = "Reading input file: " + filename;
            perror(msg.c_str());
            return false;
        }
    }
    return true;
}

void change_special_filename(JsonnetConfig *config, std::string *filename)
{
    if (config->filenameIsCode) {
        *filename = "<cmdline>";
    } else if (*filename == "-") {
        *filename = "<stdin>";
    }
}

/** Gets Jsonnet code from any source into the input buffer and changes
 * the filename if it's not an actual filename (e.g. "-"). */
static bool read_input(JsonnetConfig *config, std::string *filename, std::string *input)
{
    bool ok;
    if (config->filenameIsCode) {
        *input = *filename;
        ok = true;
    } else {
        ok = read_input_content(*filename, input);
    }
    // Let's change the filename to something we can show the user
    // if it is not a real filename.
    change_special_filename(config, filename);
    return ok;
}

/** Writes output files for multiple file output */
static bool write_multi_output_files(JsonnetVm *vm, char *output, const std::string &output_dir,
                                     const std::string &output_file)
{
    // If multiple file output is used, then iterate over each string from
    // the sequence of strings returned by jsonnet_evaluate_snippet_multi,
    // construct pairs of filename and content, and write each output file.
    std::map<std::string, std::string> r;
    for (const char *c = output; *c != '\0';) {
        const char *filename = c;
        const char *c2 = c;
        while (*c2 != '\0')
            ++c2;
        ++c2;
        const char *json = c2;
        while (*c2 != '\0')
            ++c2;
        ++c2;
        c = c2;
        r[filename] = json;
    }
    jsonnet_realloc(vm, output, 0);

    std::ostream *o;
    std::ofstream f;

    if (output_file.empty()) {
        o = &std::cout;
    } else {
        f.open(output_file.c_str());
        if (!f.good()) {
            std::string msg = "Writing to output file: " + output_file;
            perror(msg.c_str());
            return false;
        }
        o = &f;
    }

    for (const auto &pair : r) {
        const std::string &new_content = pair.second;
        const std::string &filename = output_dir + pair.first;
        (*o) << filename << std::endl;
        {
            std::ifstream exists(filename.c_str());
            if (exists.good()) {
                std::string existing_content;
                existing_content.assign(std::istreambuf_iterator<char>(exists),
                                        std::istreambuf_iterator<char>());
                if (existing_content == new_content) {
                    // Do not bump the timestamp on the file if its content is
                    // the same. This may trigger other tools (e.g. make) to do
                    // unnecessary work.
                    continue;
                }
            }
        }
        std::ofstream f;
        f.open(filename.c_str());
        if (!f.good()) {
            std::string msg = "Opening output file: " + filename;
            perror(msg.c_str());
            return false;
        }
        f << new_content;
        f.close();
        if (!f.good()) {
            std::string msg = "Writing to output file: " + filename;
            perror(msg.c_str());
            return false;
        }
    }

    if (output_file.empty()) {
        std::cout.flush();
    } else {
        f.close();
        if (!f.good()) {
            std::string msg = "Writing to output file: " + output_file;
            perror(msg.c_str());
            return false;
        }
    }
    return true;
}

/** Writes output files for YAML stream output */
static bool write_output_stream(JsonnetVm *vm, char *output, const std::string &output_file)
{
    std::ostream *o;
    std::ofstream f;

    if (output_file.empty()) {
        o = &std::cout;
    } else {
        f.open(output_file.c_str());
        if (!f.good()) {
            std::string msg = "Writing to output file: " + output_file;
            perror(msg.c_str());
            return false;
        }
        o = &f;
    }

    // If YAML stream output is used, then iterate over each string from
    // the sequence of strings returned by jsonnet_evaluate_snippet_stream,
    // and add the --- and ... as defined by the YAML spec.
    std::vector<std::string> r;
    for (const char *c = output; *c != '\0';) {
        const char *json = c;
        while (*c != '\0')
            ++c;
        ++c;
        r.emplace_back(json);
    }
    jsonnet_realloc(vm, output, 0);
    for (const auto &str : r) {
        (*o) << "---\n";
        (*o) << str;
    }
    if (r.size() > 0)
        (*o) << "...\n";
    o->flush();

    if (output_file.empty()) {
        std::cout.flush();
    } else {
        f.close();
        if (!f.good()) {
            std::string msg = "Writing to output file: " + output_file;
            perror(msg.c_str());
            return false;
        }
    }

    return true;
}

/** Writes the output JSON to the specified output file for single-file
 * output
 */
static bool write_output_file(const char *output, const std::string &output_file)
{
    std::ostream *o;
    std::ofstream f;

    if (output_file.empty()) {
        o = &std::cout;
    } else {
        f.open(output_file.c_str());
        if (!f.good()) {
            std::string msg = "Writing to output file: " + output_file;
            perror(msg.c_str());
            return false;
        }
        o = &f;
    }

    (*o) << output;

    if (output_file.empty()) {
        std::cout.flush();
    } else {
        f.close();
        if (!f.good()) {
            std::string msg = "Writing to output file: " + output_file;
            perror(msg.c_str());
            return false;
        }
    }
    return true;
}

int main(int argc, const char **argv)
{
    try {
        JsonnetVm *vm = jsonnet_make();
        JsonnetConfig config;
        if (const char *jsonnet_path_env = getenv("JSONNET_PATH")) {
            std::list<std::string> jpath;
            std::istringstream iss(jsonnet_path_env);
            std::string path;
            while (std::getline(iss, path, PATH_SEP)) {
                jpath.push_front(path);
            }
            for (const std::string &path : jpath) {
                jsonnet_jpath_add(vm, path.c_str());
            }
        }
        ArgStatus arg_status = process_args(argc, argv, &config, vm);
        if (arg_status != ARG_CONTINUE) {
            jsonnet_destroy(vm);
            return arg_status == ARG_SUCCESS ? EXIT_SUCCESS : EXIT_FAILURE;
        }

        // Evaluate input Jsonnet and handle any errors from Jsonnet VM.
        int error;
        char *output;
        switch (config.cmd) {
            case EVAL: {
                assert(config.inputFiles.size() == 1);

                // Read input file.
                std::string input;
                if (!read_input(&config, &config.inputFiles[0], &input)) {
                    jsonnet_destroy(vm);
                    return EXIT_FAILURE;
                }

                if (config.evalMulti) {
                    output = jsonnet_evaluate_snippet_multi(
                        vm, config.inputFiles[0].c_str(), input.c_str(), &error);
                } else if (config.evalStream) {
                    output = jsonnet_evaluate_snippet_stream(
                        vm, config.inputFiles[0].c_str(), input.c_str(), &error);
                } else {
                    output = jsonnet_evaluate_snippet(
                        vm, config.inputFiles[0].c_str(), input.c_str(), &error);
                }

                if (error) {
                    std::cerr << output;
                    jsonnet_realloc(vm, output, 0);
                    jsonnet_destroy(vm);
                    return EXIT_FAILURE;
                }

                // Write output JSON.
                if (config.evalMulti) {
                    if (!write_multi_output_files(
                            vm, output, config.evalMultiOutputDir, config.outputFile)) {
                        jsonnet_destroy(vm);
                        return EXIT_FAILURE;
                    }
                } else if (config.evalStream) {
                    if (!write_output_stream(vm, output, config.outputFile)) {
                        jsonnet_destroy(vm);
                        return EXIT_FAILURE;
                    }
                } else {
                    bool successful = write_output_file(output, config.outputFile);
                    jsonnet_realloc(vm, output, 0);
                    if (!successful) {
                        jsonnet_destroy(vm);
                        return EXIT_FAILURE;
                    }
                }
            } break;

            case FMT: {
                std::string output_file = config.outputFile;

                if (config.fmtInPlace || config.fmtTest) {
                    assert(config.inputFiles.size() >= 1);
                    for (std::string &inputFile : config.inputFiles) {
                        if (config.fmtInPlace) {
                            output_file = inputFile;

                            if (inputFile == "-") {
                                std::cerr << "ERROR: cannot use --in-place with stdin" << std::endl;
                                jsonnet_destroy(vm);
                                return EXIT_FAILURE;
                            }
                            if (config.filenameIsCode) {
                                std::cerr << "ERROR: cannot use --in-place with --exec"
                                          << std::endl;
                                jsonnet_destroy(vm);
                                return EXIT_FAILURE;
                            }
                        }

                        std::string input;
                        if (!read_input(&config, &inputFile, &input)) {
                            jsonnet_destroy(vm);
                            return EXIT_FAILURE;
                        }

                        output = jsonnet_fmt_snippet(vm, inputFile.c_str(), input.c_str(), &error);

                        if (error) {
                            std::cerr << output;
                            jsonnet_realloc(vm, output, 0);
                            jsonnet_destroy(vm);
                            return EXIT_FAILURE;
                        }

                        if (config.fmtTest) {
                            // Check the output matches the input.
                            bool ok = output == input;
                            jsonnet_realloc(vm, output, 0);
                            if (!ok) {
                                jsonnet_destroy(vm);
                                return 2;
                            }
                        } else {
                            // Write output Jsonnet.
                            bool successful = write_output_file(output, output_file);
                            jsonnet_realloc(vm, output, 0);
                            if (!successful) {
                                jsonnet_destroy(vm);
                                return EXIT_FAILURE;
                            }
                        }
                    }
                } else {
                    assert(config.inputFiles.size() == 1);
                    // Read input file.
                    std::string input;
                    if (!read_input(&config, &config.inputFiles[0], &input)) {
                        jsonnet_destroy(vm);
                        return EXIT_FAILURE;
                    }

                    output = jsonnet_fmt_snippet(
                        vm, config.inputFiles[0].c_str(), input.c_str(), &error);

                    if (error) {
                        std::cerr << output;
                        jsonnet_realloc(vm, output, 0);
                        jsonnet_destroy(vm);
                        return EXIT_FAILURE;
                    }

                    // Write output Jsonnet.
                    bool successful = write_output_file(output, output_file);
                    jsonnet_realloc(vm, output, 0);
                    if (!successful) {
                        jsonnet_destroy(vm);
                        return EXIT_FAILURE;
                    }
                }
            } break;
        }

        jsonnet_destroy(vm);
        return EXIT_SUCCESS;

    } catch (const std::bad_alloc &) {
        // Avoid further allocation attempts
        fputs("Internal out-of-memory error (please report this)\n", stderr);
    } catch (const std::exception &e) {
        std::cerr << "Internal error (please report this): " << e.what() << std::endl;
    } catch (...) {
        std::cerr << "An unknown exception occurred (please report this)." << std::endl;
    }
    return EXIT_FAILURE;
}
