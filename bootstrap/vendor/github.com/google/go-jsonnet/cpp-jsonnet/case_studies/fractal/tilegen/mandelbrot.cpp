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


#include <cstdlib>
#include <cmath>
#include <iostream>

#include <string>
#include <vector>

#include <png.h>


int main(int argc, const char **argv)
{
    if (argc != 8) {
        std::cerr <<"Usage: <width> <height> <iters> <left> <bottom> <right> <top>" << std::endl;
        std::cerr <<"PNG file is written to stdout." << std::endl;
        exit(EXIT_FAILURE);
    }

    unsigned long width = strtoul(argv[1], NULL, 10);
    unsigned long height = strtoul(argv[2], NULL, 10);
    unsigned long iterations = strtoul(argv[3], NULL, 10);
    double left = strtod(argv[4], NULL);
    double bottom = strtod(argv[5], NULL);
    double right = strtod(argv[6], NULL);
    double top = strtod(argv[7], NULL);

    struct Exception {
        const std::string &msg;
        Exception(const std::string &msg) : msg(msg) { }
    };
    
    int code = EXIT_SUCCESS;
    png_structp png_write_struct = NULL;
    volatile png_infop info_ptr = NULL;

    try {
        png_write_struct = png_create_write_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL);
        if (png_write_struct == NULL)
            throw Exception("Could not allocate libpng write_struct.");

        info_ptr = png_create_info_struct(png_write_struct);
        if (info_ptr == NULL)
            throw Exception("Could not allocate libpng info_struct.");

        if (setjmp(png_jmpbuf(png_write_struct)))
            throw Exception("Exception from libpng");

        png_init_io(png_write_struct, stdout);

        png_set_IHDR(png_write_struct, info_ptr, width, height, 8, PNG_COLOR_TYPE_RGB,
                     PNG_INTERLACE_NONE, PNG_COMPRESSION_TYPE_BASE, PNG_FILTER_TYPE_BASE);

        png_write_info(png_write_struct, info_ptr);

        std::vector<png_byte> row(3 * width);
        for (unsigned long y=0 ; y<height ; y++) {
            const double scalar_y = double(y) / height;
            const double mb_y = scalar_y * bottom + (1-scalar_y) * top;  // libpng y==0 is top
            for (unsigned long x=0 ; x<width ; x++) {
                const double scalar_x = double(x) / width;
                const double mb_x = scalar_x * right + (1-scalar_x) * left;
                row[3*x + 0] = 255;
                row[3*x + 1] = 255;
                row[3*x + 2] = 255;
                double c_x = mb_x;
                double c_y = mb_y;
                for (unsigned i=1 ; i<iterations ; ++i) {
                    const double len2 = c_x*c_x + c_y*c_y;
                    if (len2 > 4) {
                        // escaped
                        // smooth with fractional escape velocity
                        float escape_vel = i + 1 - ::log2f(::logf(::sqrtf(len2)));
                        float tonemapped = escape_vel / (20 + escape_vel);
                        row[3*x + 0] = png_byte(powf(tonemapped, 10) * 255);
                        row[3*x + 1] = png_byte(powf(tonemapped, 2.5) * 255);
                        row[3*x + 2] = png_byte(tonemapped * 255);
                        /*
                        row[3*x + 0] = png_byte(escape_vel);
                        row[3*x + 1] = png_byte(escape_vel);
                        row[3*x + 2] = png_byte(escape_vel);
                        */
                        break;
                    }
                    const double o_x = c_x;
                    c_x = c_x*c_x - c_y*c_y + mb_x;
                    c_y = 2 * o_x * c_y + mb_y;
                }
            }
            png_write_row(png_write_struct, &row[0]);
        }

        png_write_end(png_write_struct, NULL);

    } catch (const Exception &e) {
        std::cerr << e.msg << std::endl;
        code = EXIT_FAILURE;
    }

    if (png_write_struct != NULL) png_destroy_write_struct(&png_write_struct, (png_infopp)NULL);
    if (info_ptr != NULL) png_free_data(png_write_struct, info_ptr, PNG_FREE_ALL, -1);

    return code;
}
