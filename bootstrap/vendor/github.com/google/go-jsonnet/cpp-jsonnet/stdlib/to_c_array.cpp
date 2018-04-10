// Converts stdin string to a comma-separated list of byte values and prints the
// result. Used for transforming the standard library into a C array.
//
// Usage:
//   to_c_array <infile> <outfile>
#include <fstream>
#include <iostream>
#include <iterator>

int main(int argc, char *argv[])
{
    if (argc < 3) {
        std::cerr << "usage: to_c_array <infile> <outfile>\n";
        return 1;
    }

    std::ifstream in_file(argv[1]);
    if (!in_file.is_open()) {
        std::cerr << "Can't open input file.";
        return 1;
    }

    std::ofstream out_file(argv[2]);
    if (!out_file.is_open()) {
        std::cerr << "Can't open output file.";
        return 1;
    }

    char c;
    bool first_character = true;
    while (in_file.get(c)) {
        if (first_character) {
            first_character = false;
        } else {
            out_file << ",";
        }
        // Write byte value of c to stdout.
        out_file << (int)c;
    }

    return 0;
}
