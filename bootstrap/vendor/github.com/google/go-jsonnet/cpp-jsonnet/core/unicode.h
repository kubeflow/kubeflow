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

#ifndef JSONNET_UNICODE_H
#define JSONNET_UNICODE_H

/** Substituted when a unicode translation format encoding error is encountered. */
#define JSONNET_CODEPOINT_ERROR 0xfffd
#define JSONNET_CODEPOINT_MAX 0x110000

/** Convert a unicode codepoint to UTF8.
 *
 * \param x The unicode codepoint.
 * \param s The UTF-8 string to append to.
 * \returns The number of characters appended.
 */
static inline int encode_utf8(char32_t x, std::string &s)
{
    if (x >= JSONNET_CODEPOINT_MAX)
        x = JSONNET_CODEPOINT_ERROR;

    // 00ZZZzzz 00zzYYYY 00Yyyyxx 00xxxxxx
    long bytes = ((x & 0x1C0000) << 6) | ((x & 0x03F000) << 4) | ((x & 0x0FC0) << 2) | (x & 0x3F);

    if (x < 0x80) {
        s.push_back((char)x);
        return 1;
    } else if (x < 0x800) {  // note that capital 'Y' bits must be 0
        bytes |= 0xC080;
        s.push_back((bytes >> 8) & 0xFF);
        s.push_back((bytes >> 0) & 0xFF);
        return 2;
    } else if (x < 0x10000) {  // note that 'z' bits must be 0
        bytes |= 0xE08080;
        s.push_back((bytes >> 16) & 0xFF);
        s.push_back((bytes >> 8) & 0xFF);
        s.push_back((bytes >> 0) & 0xFF);
        return 3;
    } else if (x < 0x110000) {  // note that capital 'Z' bits must be 0
        bytes |= 0xF0808080;
        s.push_back((bytes >> 24) & 0xFF);
        s.push_back((bytes >> 16) & 0xFF);
        s.push_back((bytes >> 8) & 0xFF);
        s.push_back((bytes >> 0) & 0xFF);
        return 4;
    } else {
        std::cerr << "Should never get here." << std::endl;
        abort();
    }
}

/** Convert the UTF8 byte sequence in the given string to a unicode code point.
 *
 * \param str The string.
 * \param i The index of the string from which to start decoding and returns the index of the last
 *          byte of the encoded codepoint.
 * \returns The decoded unicode codepoint.
 */
static inline char32_t decode_utf8(const std::string &str, size_t &i)
{
    char c0 = str[i];
    if ((c0 & 0x80) == 0) {  // 0xxxxxxx
        return c0;
    } else if ((c0 & 0xE0) == 0xC0) {  // 110yyyxx 10xxxxxx
        if (i + 1 >= str.length()) {
            return JSONNET_CODEPOINT_ERROR;
        }
        char c1 = str[++i];
        if ((c1 & 0xC0) != 0x80) {
            return JSONNET_CODEPOINT_ERROR;
        }
        return ((c0 & 0x1F) << 6ul) | (c1 & 0x3F);
    } else if ((c0 & 0xF0) == 0xE0) {  // 1110yyyy 10yyyyxx 10xxxxxx
        if (i + 2 >= str.length()) {
            return JSONNET_CODEPOINT_ERROR;
        }
        char c1 = str[++i];
        if ((c1 & 0xC0) != 0x80) {
            return JSONNET_CODEPOINT_ERROR;
        }
        char c2 = str[++i];
        if ((c2 & 0xC0) != 0x80) {
            return JSONNET_CODEPOINT_ERROR;
        }
        return ((c0 & 0xF) << 12ul) | ((c1 & 0x3F) << 6) | (c2 & 0x3F);
    } else if ((c0 & 0xF8) == 0xF0) {  // 11110zzz 10zzyyyy 10yyyyxx 10xxxxxx
        if (i + 3 >= str.length()) {
            return JSONNET_CODEPOINT_ERROR;
        }
        char c1 = str[++i];
        if ((c1 & 0xC0) != 0x80) {
            return JSONNET_CODEPOINT_ERROR;
        }
        char c2 = str[++i];
        if ((c2 & 0xC0) != 0x80) {
            return JSONNET_CODEPOINT_ERROR;
        }
        char c3 = str[++i];
        if ((c3 & 0xC0) != 0x80) {
            return JSONNET_CODEPOINT_ERROR;
        }
        return ((c0 & 0x7) << 24ul) | ((c1 & 0x3F) << 12ul) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
    } else {
        return JSONNET_CODEPOINT_ERROR;
    }
}

/** A string class capable of holding unicode codepoints. */
typedef std::basic_string<char32_t> UString;

static inline void encode_utf8(const UString &s, std::string &r)
{
    for (char32_t cp : s)
        encode_utf8(cp, r);
}

static inline std::string encode_utf8(const UString &s)
{
    std::string r;
    encode_utf8(s, r);
    return r;
}

static inline UString decode_utf8(const std::string &s)
{
    UString r;
    for (size_t i = 0; i < s.length(); ++i)
        r.push_back(decode_utf8(s, i));
    return r;
}

/** A stringstream-like class capable of holding unicode codepoints.
 * The C++ standard does not support std::basic_stringstream<char32_t.
 */
class UStringStream {
    UString buf;

   public:
    UStringStream &operator<<(const UString &s)
    {
        buf.append(s);
        return *this;
    }
    UStringStream &operator<<(const char32_t *s)
    {
        buf.append(s);
        return *this;
    }
    UStringStream &operator<<(char32_t c)
    {
        buf.push_back(c);
        return *this;
    }
    template <class T>
    UStringStream &operator<<(T c)
    {
        std::stringstream ss;
        ss << c;
        for (char c : ss.str())
            buf.push_back(char32_t(c));
        return *this;
    }
    UString str()
    {
        return buf;
    }
};

#endif  // JSONNET_UNICODE_H
