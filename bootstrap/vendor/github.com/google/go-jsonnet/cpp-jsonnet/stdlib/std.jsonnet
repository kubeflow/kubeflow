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

/* This is the Jsonnet standard library, at least the parts of it that are written in Jsonnet.
 *
 * There are some native methods as well, which are defined in the interpreter and added to this
 * file.  It is never necessary to import std.jsonnet, it is embedded into the interpreter at
 * compile-time and automatically imported into all other Jsonnet programs.
 */
{

  local std = self,

  isString(v):: std.type(v) == 'string',
  isNumber(v):: std.type(v) == 'number',
  isBoolean(v):: std.type(v) == 'boolean',
  isObject(v):: std.type(v) == 'object',
  isArray(v):: std.type(v) == 'array',
  isFunction(v):: std.type(v) == 'function',

  toString(a)::
    if std.type(a) == 'string' then a else '' + a,

  substr(str, from, len)::
    if std.type(str) != 'string' then
      error 'substr first parameter should be a string, got ' + std.type(str)
    else if std.type(from) != 'number' then
      error 'substr second parameter should be a number, got ' + std.type(from)
    else if std.type(len) != 'number' then
      error 'substr third parameter should be a number, got ' + std.type(len)
    else if len < 0 then
      error 'substr third parameter should be greater than zero, got ' + len
    else
      std.join('', std.makeArray(len, function(i) str[i + from])),

  startsWith(a, b)::
    if std.length(a) < std.length(b) then
      false
    else
      std.substr(a, 0, std.length(b)) == b,

  endsWith(a, b)::
    if std.length(a) < std.length(b) then
      false
    else
      std.substr(a, std.length(a) - std.length(b), std.length(b)) == b,

  stringChars(str)::
    std.makeArray(std.length(str), function(i) str[i]),

  parseInt(str)::
    local addDigit(aggregate, digit) =
      if digit < 0 || digit > 9 then
        error ('parseInt got string which does not match regex [0-9]+')
      else
        10 * aggregate + digit;
    local toDigits(str) =
      [std.codepoint(char) - std.codepoint('0') for char in std.stringChars(str)];
    if str[0] == '-' then
      -std.foldl(addDigit, toDigits(str[1:]), 0)
    else
      std.foldl(addDigit, toDigits(str), 0),

  split(str, c)::
    if std.type(str) != 'string' then
      error 'std.split first parameter should be a string, got ' + std.type(str)
    else if std.type(c) != 'string' then
      error 'std.split second parameter should be a string, got ' + std.type(c)
    else if std.length(c) != 1 then
      error 'std.split second parameter should have length 1, got ' + std.length(c)
    else
      std.splitLimit(str, c, -1),

  splitLimit(str, c, maxsplits)::
    if std.type(str) != 'string' then
      error 'std.splitLimit first parameter should be a string, got ' + std.type(str)
    else if std.type(c) != 'string' then
      error 'std.splitLimit second parameter should be a string, got ' + std.type(c)
    else if std.length(c) != 1 then
      error 'std.splitLimit second parameter should have length 1, got ' + std.length(c)
    else if std.type(maxsplits) != 'number' then
      error 'std.splitLimit third parameter should be a number, got ' + std.type(maxsplits)
    else
      local aux(str, delim, i, arr, v) =
        local c = str[i];
        local i2 = i + 1;
        if i >= std.length(str) then
          arr + [v]
        else if c == delim && (maxsplits == -1 || std.length(arr) < maxsplits) then
          aux(str, delim, i2, arr + [v], '') tailstrict
        else
          aux(str, delim, i2, arr, v + c) tailstrict;
      aux(str, c, 0, [], ''),

  strReplace(str, from, to)::
    assert std.type(str) == 'string';
    assert std.type(from) == 'string';
    assert std.type(to) == 'string';
    assert from != '' : "'from' string must not be zero length.";

    // Cache for performance.
    local str_len = std.length(str);
    local from_len = std.length(from);

    // True if from is at str[i].
    local found_at(i) = str[i:i + from_len] == from;

    // Return the remainder of 'str' starting with 'start_index' where
    // all occurrences of 'from' after 'curr_index' are replaced with 'to'.
    local replace_after(start_index, curr_index, acc) =
      if curr_index > str_len then
        acc + str[start_index:curr_index]
      else if found_at(curr_index) then
        local new_index = curr_index + std.length(from);
        replace_after(new_index, new_index, acc + str[start_index:curr_index] + to)
      else
        replace_after(start_index, curr_index + 1, acc);

    // if from_len==1, then we replace by splitting and rejoining the
    // string which is much faster than recursing on replace_after
    if from_len == 1 then
      std.join(to, std.split(str, from))
    else
      replace_after(0, 0, ''),

  asciiUpper(x)::
    local cp = std.codepoint;
    local up_letter(c) = if cp(c) >= 97 && cp(c) < 123 then
      std.char(cp(c) - 32)
    else
      c;
    std.join('', std.map(up_letter, std.stringChars(x))),

  asciiLower(x)::
    local cp = std.codepoint;
    local down_letter(c) = if cp(c) >= 65 && cp(c) < 91 then
      std.char(cp(c) + 32)
    else
      c;
    std.join('', std.map(down_letter, std.stringChars(x))),


  range(from, to)::
    std.makeArray(to - from + 1, function(i) i + from),

  slice(indexable, index, end, step)::
    local invar =
      // loop invariant with defaults applied
      {
        indexable: indexable,
        index:
          if index == null then 0
          else index,
        end:
          if end == null then std.length(indexable)
          else end,
        step:
          if step == null then 1
          else step,
        length: std.length(indexable),
        type: std.type(indexable),
      };
    if invar.index < 0 || invar.end < 0 || invar.step < 0 then
      error ('got [%s:%s:%s] but negative index, end, and steps are not supported'
             % [invar.index, invar.end, invar.step])
    else if step == 0 then
      error ('got %s but step must be greater than 0' % step)
    else if std.type(indexable) != 'string' && std.type(indexable) != 'array' then
      error ('std.slice accepts a string or an array, but got: %s' % std.type(indexable))
    else
      local build(slice, cur) =
        if cur >= invar.end || cur >= invar.length then
          slice
        else
          build(
            if invar.type == 'string' then
              slice + invar.indexable[cur]
            else
              slice + [invar.indexable[cur]],
            cur + invar.step
          ) tailstrict;
      build(if invar.type == 'string' then '' else [], invar.index),

  count(arr, x):: std.length(std.filter(function(v) v == x, arr)),

  mod(a, b)::
    if std.type(a) == 'number' && std.type(b) == 'number' then
      std.modulo(a, b)
    else if std.type(a) == 'string' then
      std.format(a, b)
    else
      error 'Operator % cannot be used on types ' + std.type(a) + ' and ' + std.type(b) + '.',

  map(func, arr)::
    if std.type(func) != 'function' then
      error ('std.map first param must be function, got ' + std.type(func))
    else if std.type(arr) != 'array' && std.type(arr) != 'string' then
      error ('std.map second param must be array / string, got ' + std.type(arr))
    else
      std.makeArray(std.length(arr), function(i) func(arr[i])),

  mapWithIndex(func, arr)::
    if std.type(func) != 'function' then
      error ('std.mapWithIndex first param must be function, got ' + std.type(func))
    else if std.type(arr) != 'array' && std.type(arr) != 'string' then
      error ('std.mapWithIndex second param must be array, got ' + std.type(arr))
    else
      std.makeArray(std.length(arr), function(i) func(i, arr[i])),

  mapWithKey(func, obj)::
    if std.type(func) != 'function' then
      error ('std.mapWithKey first param must be function, got ' + std.type(func))
    else if std.type(obj) != 'object' then
      error ('std.mapWithKey second param must be object, got ' + std.type(obj))
    else
      { [k]: func(k, obj[k]) for k in std.objectFields(obj) },

  join(sep, arr)::
    local aux(arr, i, first, running) =
      if i >= std.length(arr) then
        running
      else if arr[i] == null then
        aux(arr, i + 1, first, running) tailstrict
      else if std.type(arr[i]) != std.type(sep) then
        error 'expected %s but arr[%d] was %s ' % [std.type(sep), i, std.type(arr[i])]
      else if first then
        aux(arr, i + 1, false, running + arr[i]) tailstrict
      else
        aux(arr, i + 1, false, running + sep + arr[i]) tailstrict;
    if std.type(arr) != 'array' then
      error 'join second parameter should be array, got ' + std.type(arr)
    else if std.type(sep) == 'string' then
      aux(arr, 0, true, '')
    else if std.type(sep) == 'array' then
      aux(arr, 0, true, [])
    else
      error 'join first parameter should be string or array, got ' + std.type(sep),

  lines(arr)::
    std.join('\n', arr + ['']),

  deepJoin(arr)::
    if std.isString(arr) then
      arr
    else if std.isArray(arr) then
      std.join('', [std.deepJoin(x) for x in arr])
    else
      error 'Expected string or array, got %s' % std.type(arr),


  format(str, vals)::

    /////////////////////////////
    // Parse the mini-language //
    /////////////////////////////

    local try_parse_mapping_key(str, i) =
      if i >= std.length(str) then
        error 'Truncated format code.'
      else
        local c = str[i];
        if c == '(' then
          local consume(str, j, v) =
            if j >= std.length(str) then
              error 'Truncated format code.'
            else
              local c = str[j];
              if c != ')' then
                consume(str, j + 1, v + c)
              else
                { i: j + 1, v: v };
          consume(str, i + 1, '')
        else
          { i: i, v: null };

    local try_parse_cflags(str, i) =
      local consume(str, j, v) =
        if j >= std.length(str) then
          error 'Truncated format code.'
        else
          local c = str[j];
          if c == '#' then
            consume(str, j + 1, v { alt: true })
          else if c == '0' then
            consume(str, j + 1, v { zero: true })
          else if c == '-' then
            consume(str, j + 1, v { left: true })
          else if c == ' ' then
            consume(str, j + 1, v { blank: true })
          else if c == '+' then
            consume(str, j + 1, v { sign: true })
          else
            { i: j, v: v };
      consume(str, i, { alt: false, zero: false, left: false, blank: false, sign: false });

    local try_parse_field_width(str, i) =
      if i < std.length(str) && str[i] == '*' then
        { i: i + 1, v: '*' }
      else
        local consume(str, j, v) =
          if j >= std.length(str) then
            error 'Truncated format code.'
          else
            local c = str[j];
            if c == '0' then
              consume(str, j + 1, v * 10 + 0)
            else if c == '1' then
              consume(str, j + 1, v * 10 + 1)
            else if c == '2' then
              consume(str, j + 1, v * 10 + 2)
            else if c == '3' then
              consume(str, j + 1, v * 10 + 3)
            else if c == '4' then
              consume(str, j + 1, v * 10 + 4)
            else if c == '5' then
              consume(str, j + 1, v * 10 + 5)
            else if c == '6' then
              consume(str, j + 1, v * 10 + 6)
            else if c == '7' then
              consume(str, j + 1, v * 10 + 7)
            else if c == '8' then
              consume(str, j + 1, v * 10 + 8)
            else if c == '9' then
              consume(str, j + 1, v * 10 + 9)
            else
              { i: j, v: v };
        consume(str, i, 0);

    local try_parse_precision(str, i) =
      if i >= std.length(str) then
        error 'Truncated format code.'
      else
        local c = str[i];
        if c == '.' then
          try_parse_field_width(str, i + 1)
        else
          { i: i, v: null };

    // Ignored, if it exists.
    local try_parse_length_modifier(str, i) =
      if i >= std.length(str) then
        error 'Truncated format code.'
      else
        local c = str[i];
        if c == 'h' || c == 'l' || c == 'L' then
          i + 1
        else
          i;

    local parse_conv_type(str, i) =
      if i >= std.length(str) then
        error 'Truncated format code.'
      else
        local c = str[i];
        if c == 'd' || c == 'i' || c == 'u' then
          { i: i + 1, v: 'd', caps: false }
        else if c == 'o' then
          { i: i + 1, v: 'o', caps: false }
        else if c == 'x' then
          { i: i + 1, v: 'x', caps: false }
        else if c == 'X' then
          { i: i + 1, v: 'x', caps: true }
        else if c == 'e' then
          { i: i + 1, v: 'e', caps: false }
        else if c == 'E' then
          { i: i + 1, v: 'e', caps: true }
        else if c == 'f' then
          { i: i + 1, v: 'f', caps: false }
        else if c == 'F' then
          { i: i + 1, v: 'f', caps: true }
        else if c == 'g' then
          { i: i + 1, v: 'g', caps: false }
        else if c == 'G' then
          { i: i + 1, v: 'g', caps: true }
        else if c == 'c' then
          { i: i + 1, v: 'c', caps: false }
        else if c == 's' then
          { i: i + 1, v: 's', caps: false }
        else if c == '%' then
          { i: i + 1, v: '%', caps: false }
        else
          error 'Unrecognised conversion type: ' + c;


    // Parsed initial %, now the rest.
    local parse_code(str, i) =
      if i >= std.length(str) then
        error 'Truncated format code.'
      else
        local mkey = try_parse_mapping_key(str, i);
        local cflags = try_parse_cflags(str, mkey.i);
        local fw = try_parse_field_width(str, cflags.i);
        local prec = try_parse_precision(str, fw.i);
        local len_mod = try_parse_length_modifier(str, prec.i);
        local ctype = parse_conv_type(str, len_mod);
        {
          i: ctype.i,
          code: {
            mkey: mkey.v,
            cflags: cflags.v,
            fw: fw.v,
            prec: prec.v,
            ctype: ctype.v,
            caps: ctype.caps,
          },
        };

    // Parse a format string (containing none or more % format tags).
    local parse_codes(str, i, out, cur) =
      if i >= std.length(str) then
        out + [cur]
      else
        local c = str[i];
        if c == '%' then
          local r = parse_code(str, i + 1);
          parse_codes(str, r.i, out + [cur, r.code], '') tailstrict
        else
          parse_codes(str, i + 1, out, cur + c) tailstrict;

    local codes = parse_codes(str, 0, [], '');


    ///////////////////////
    // Format the values //
    ///////////////////////

    // Useful utilities
    local padding(w, s) =
      local aux(w, v) =
        if w <= 0 then
          v
        else
          aux(w - 1, v + s);
      aux(w, '');

    // Add s to the left of str so that its length is at least w.
    local pad_left(str, w, s) =
      padding(w - std.length(str), s) + str;

    // Add s to the right of str so that its length is at least w.
    local pad_right(str, w, s) =
      str + padding(w - std.length(str), s);

    // Render an integer (e.g., decimal or octal).
    local render_int(n__, min_chars, min_digits, blank, sign, radix, zero_prefix) =
      local n_ = std.abs(n__);
      local aux(n) =
        if n == 0 then
          zero_prefix
        else
          aux(std.floor(n / radix)) + (n % radix);
      local dec = if std.floor(n_) == 0 then '0' else aux(std.floor(n_));
      local neg = n__ < 0;
      local zp = min_chars - (if neg || blank || sign then 1 else 0);
      local zp2 = std.max(zp, min_digits);
      local dec2 = pad_left(dec, zp2, '0');
      (if neg then '-' else if sign then '+' else if blank then ' ' else '') + dec2;

    // Render an integer in hexadecimal.
    local render_hex(n__, min_chars, min_digits, blank, sign, add_zerox, capitals) =
      local numerals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                       + if capitals then ['A', 'B', 'C', 'D', 'E', 'F']
                       else ['a', 'b', 'c', 'd', 'e', 'f'];
      local n_ = std.abs(n__);
      local aux(n) =
        if n == 0 then
          ''
        else
          aux(std.floor(n / 16)) + numerals[n % 16];
      local hex = if std.floor(n_) == 0 then '0' else aux(std.floor(n_));
      local neg = n__ < 0;
      local zp = min_chars - (if neg || blank || sign then 1 else 0)
                 - (if add_zerox then 2 else 0);
      local zp2 = std.max(zp, min_digits);
      local hex2 = (if add_zerox then (if capitals then '0X' else '0x') else '')
                   + pad_left(hex, zp2, '0');
      (if neg then '-' else if sign then '+' else if blank then ' ' else '') + hex2;

    local strip_trailing_zero(str) =
      local aux(str, i) =
        if i < 0 then
          ''
        else
          if str[i] == '0' then
            aux(str, i - 1)
          else
            std.substr(str, 0, i + 1);
      aux(str, std.length(str) - 1);

    // Render floating point in decimal form
    local render_float_dec(n__, zero_pad, blank, sign, ensure_pt, trailing, prec) =
      local n_ = std.abs(n__);
      local whole = std.floor(n_);
      local dot_size = if prec == 0 && !ensure_pt then 0 else 1;
      local zp = zero_pad - prec - dot_size;
      local str = render_int(std.sign(n__) * whole, zp, 0, blank, sign, 10, '');
      if prec == 0 then
        str + if ensure_pt then '.' else ''
      else
        local frac = std.floor((n_ - whole) * std.pow(10, prec) + 0.5);
        if trailing || frac > 0 then
          local frac_str = render_int(frac, prec, 0, false, false, 10, '');
          str + '.' + if !trailing then strip_trailing_zero(frac_str) else frac_str
        else
          str;

    // Render floating point in scientific form
    local render_float_sci(n__, zero_pad, blank, sign, ensure_pt, trailing, caps, prec) =
      local exponent = std.floor(std.log(std.abs(n__)) / std.log(10));
      local suff = (if caps then 'E' else 'e')
                   + render_int(exponent, 3, 0, false, true, 10, '');
      local mantissa = n__ / std.pow(10, exponent);
      local zp2 = zero_pad - std.length(suff);
      render_float_dec(mantissa, zp2, blank, sign, ensure_pt, trailing, prec) + suff;

    // Render a value with an arbitrary format code.
    local format_code(val, code, fw, prec_or_null, i) =
      local cflags = code.cflags;
      local fpprec = if prec_or_null != null then prec_or_null else 6;
      local iprec = if prec_or_null != null then prec_or_null else 0;
      local zp = if cflags.zero && !cflags.left then fw else 0;
      if code.ctype == 's' then
        std.toString(val)
      else if code.ctype == 'd' then
        if std.type(val) != 'number' then
          error 'Format required number at '
                + i + ', got ' + std.type(val)
        else
          render_int(val, zp, iprec, cflags.blank, cflags.sign, 10, '')
      else if code.ctype == 'o' then
        if std.type(val) != 'number' then
          error 'Format required number at '
                + i + ', got ' + std.type(val)
        else
          local zero_prefix = if cflags.alt then '0' else '';
          render_int(val, zp, iprec, cflags.blank, cflags.sign, 8, zero_prefix)
      else if code.ctype == 'x' then
        if std.type(val) != 'number' then
          error 'Format required number at '
                + i + ', got ' + std.type(val)
        else
          render_hex(val,
                     zp,
                     iprec,
                     cflags.blank,
                     cflags.sign,
                     cflags.alt,
                     code.caps)
      else if code.ctype == 'f' then
        if std.type(val) != 'number' then
          error 'Format required number at '
                + i + ', got ' + std.type(val)
        else
          render_float_dec(val,
                           zp,
                           cflags.blank,
                           cflags.sign,
                           cflags.alt,
                           true,
                           fpprec)
      else if code.ctype == 'e' then
        if std.type(val) != 'number' then
          error 'Format required number at '
                + i + ', got ' + std.type(val)
        else
          render_float_sci(val,
                           zp,
                           cflags.blank,
                           cflags.sign,
                           cflags.alt,
                           true,
                           code.caps,
                           fpprec)
      else if code.ctype == 'g' then
        if std.type(val) != 'number' then
          error 'Format required number at '
                + i + ', got ' + std.type(val)
        else
          local exponent = std.floor(std.log(std.abs(val)) / std.log(10));
          if exponent < -4 || exponent >= fpprec then
            render_float_sci(val,
                             zp,
                             cflags.blank,
                             cflags.sign,
                             cflags.alt,
                             cflags.alt,
                             code.caps,
                             fpprec - 1)
          else
            local digits_before_pt = std.max(1, exponent + 1);
            render_float_dec(val,
                             zp,
                             cflags.blank,
                             cflags.sign,
                             cflags.alt,
                             cflags.alt,
                             fpprec - digits_before_pt)
      else if code.ctype == 'c' then
        if std.type(val) == 'number' then
          std.char(val)
        else if std.type(val) == 'string' then
          if std.length(val) == 1 then
            val
          else
            error '%c expected 1-sized string got: ' + std.length(val)
        else
          error '%c expected number / string, got: ' + std.type(val)
      else
        error 'Unknown code: ' + code.ctype;

    // Render a parsed format string with an array of values.
    local format_codes_arr(codes, arr, i, j, v) =
      if i >= std.length(codes) then
        if j < std.length(arr) then
          error ('Too many values to format: ' + std.length(arr) + ', expected ' + j)
        else
          v
      else
        local code = codes[i];
        if std.type(code) == 'string' then
          format_codes_arr(codes, arr, i + 1, j, v + code) tailstrict
        else
          local tmp = if code.fw == '*' then {
            j: j + 1,
            fw: if j >= std.length(arr) then
              error 'Not enough values to format: ' + std.length(arr)
            else
              arr[j],
          } else {
            j: j,
            fw: code.fw,
          };
          local tmp2 = if code.prec == '*' then {
            j: tmp.j + 1,
            prec: if tmp.j >= std.length(arr) then
              error 'Not enough values to format: ' + std.length(arr)
            else
              arr[tmp.j],
          } else {
            j: tmp.j,
            prec: code.prec,
          };
          local j2 = tmp2.j;
          local val =
            if j2 < std.length(arr) then
              arr[j2]
            else
              error 'Not enough values to format, got ' + std.length(arr);
          local s =
            if code.ctype == '%' then
              '%'
            else
              format_code(val, code, tmp.fw, tmp2.prec, j2);
          local s_padded =
            if code.cflags.left then
              pad_right(s, tmp.fw, ' ')
            else
              pad_left(s, tmp.fw, ' ');
          local j3 =
            if code.ctype == '%' then
              j2
            else
              j2 + 1;
          format_codes_arr(codes, arr, i + 1, j3, v + s_padded) tailstrict;

    // Render a parsed format string with an object of values.
    local format_codes_obj(codes, obj, i, v) =
      if i >= std.length(codes) then
        v
      else
        local code = codes[i];
        if std.type(code) == 'string' then
          format_codes_obj(codes, obj, i + 1, v + code) tailstrict
        else
          local f =
            if code.mkey == null then
              error 'Mapping keys required.'
            else
              code.mkey;
          local fw =
            if code.fw == '*' then
              error 'Cannot use * field width with object.'
            else
              code.fw;
          local prec =
            if code.prec == '*' then
              error 'Cannot use * precision with object.'
            else
              code.prec;
          local val =
            if std.objectHasAll(obj, f) then
              obj[f]
            else
              error 'No such field: ' + f;
          local s =
            if code.ctype == '%' then
              '%'
            else
              format_code(val, code, fw, prec, f);
          local s_padded =
            if code.cflags.left then
              pad_right(s, fw, ' ')
            else
              pad_left(s, fw, ' ');
          format_codes_obj(codes, obj, i + 1, v + s_padded) tailstrict;

    if std.type(vals) == 'array' then
      format_codes_arr(codes, vals, 0, 0, '')
    else if std.type(vals) == 'object' then
      format_codes_obj(codes, vals, 0, '')
    else
      format_codes_arr(codes, [vals], 0, 0, ''),

  foldr(func, arr, init)::
    local aux(func, arr, running, idx) =
      if idx < 0 then
        running
      else
        aux(func, arr, func(arr[idx], running), idx - 1) tailstrict;
    aux(func, arr, init, std.length(arr) - 1),

  foldl(func, arr, init)::
    local aux(func, arr, running, idx) =
      if idx >= std.length(arr) then
        running
      else
        aux(func, arr, func(running, arr[idx]), idx + 1) tailstrict;
    aux(func, arr, init, 0),


  filterMap(filter_func, map_func, arr)::
    if std.type(filter_func) != 'function' then
      error ('std.filterMap first param must be function, got ' + std.type(filter_func))
    else if std.type(map_func) != 'function' then
      error ('std.filterMap second param must be function, got ' + std.type(map_func))
    else if std.type(arr) != 'array' then
      error ('std.filterMap third param must be array, got ' + std.type(arr))
    else
      std.map(map_func, std.filter(filter_func, arr)),

  assertEqual(a, b)::
    if a == b then
      true
    else
      error 'Assertion failed. ' + a + ' != ' + b,

  abs(n)::
    if std.type(n) != 'number' then
      error 'std.abs expected number, got ' + std.type(n)
    else
      if n > 0 then n else -n,

  sign(n)::
    if std.type(n) != 'number' then
      error 'std.sign expected number, got ' + std.type(n)
    else
      if n > 0 then
        1
      else if n < 0 then
        -1
      else 0,

  max(a, b)::
    if std.type(a) != 'number' then
      error 'std.max first param expected number, got ' + std.type(a)
    else if std.type(b) != 'number' then
      error 'std.max second param expected number, got ' + std.type(b)
    else
      if a > b then a else b,

  min(a, b)::
    if std.type(a) != 'number' then
      error 'std.max first param expected number, got ' + std.type(a)
    else if std.type(b) != 'number' then
      error 'std.max second param expected number, got ' + std.type(b)
    else
      if a < b then a else b,

  flattenArrays(arrs)::
    std.foldl(function(a, b) a + b, arrs, []),

  manifestIni(ini)::
    local body_lines(body) =
      std.join([], [
        local value_or_values = body[k];
        if std.type(value_or_values) == 'array' then
          ['%s = %s' % [k, value] for value in value_or_values]
        else
          ['%s = %s' % [k, value_or_values]]

        for k in std.objectFields(body)
      ]);

    local section_lines(sname, sbody) = ['[%s]' % [sname]] + body_lines(sbody),
          main_body = if std.objectHas(ini, 'main') then body_lines(ini.main) else [],
          all_sections = [
      section_lines(k, ini.sections[k])
      for k in std.objectFields(ini.sections)
    ];
    std.join('\n', main_body + std.flattenArrays(all_sections) + ['']),

  escapeStringJson(str_)::
    local str = std.toString(str_);
    local trans(ch) =
      if ch == '"' then
        '\\"'
      else if ch == '\\' then
        '\\\\'
      else if ch == '\b' then
        '\\b'
      else if ch == '\f' then
        '\\f'
      else if ch == '\n' then
        '\\n'
      else if ch == '\r' then
        '\\r'
      else if ch == '\t' then
        '\\t'
      else
        local cp = std.codepoint(ch);
        if cp < 32 || (cp >= 126 && cp <= 159) then
          '\\u%04x' % [cp]
        else
          ch;
    '"%s"' % std.join('', [trans(ch) for ch in std.stringChars(str)]),

  escapeStringPython(str)::
    std.escapeStringJson(str),

  escapeStringBash(str_)::
    local str = std.toString(str_);
    local trans(ch) =
      if ch == "'" then
        "'\"'\"'"
      else
        ch;
    "'%s'" % std.join('', [trans(ch) for ch in std.stringChars(str)]),

  escapeStringDollars(str_)::
    local str = std.toString(str_);
    local trans(ch) =
      if ch == '$' then
        '$$'
      else
        ch;
    std.foldl(function(a, b) a + trans(b), std.stringChars(str), ''),

  manifestJson(value):: std.manifestJsonEx(value, '    '),

  manifestJsonEx(value, indent)::
    local aux(v, path, cindent) =
      if v == true then
        'true'
      else if v == false then
        'false'
      else if v == null then
        'null'
      else if std.type(v) == 'number' then
        '' + v
      else if std.type(v) == 'string' then
        std.escapeStringJson(v)
      else if std.type(v) == 'function' then
        error 'Tried to manifest function at ' + path
      else if std.type(v) == 'array' then
        local range = std.range(0, std.length(v) - 1);
        local new_indent = cindent + indent;
        local lines = ['[\n']
                      + std.join([',\n'],
                                 [
                                   [new_indent + aux(v[i], path + [i], new_indent)]
                                   for i in range
                                 ])
                      + ['\n' + cindent + ']'];
        std.join('', lines)
      else if std.type(v) == 'object' then
        local lines = ['{\n']
                      + std.join([',\n'],
                                 [
                                   [cindent + indent + std.escapeStringJson(k) + ': '
                                    + aux(v[k], path + [k], cindent + indent)]
                                   for k in std.objectFields(v)
                                 ])
                      + ['\n' + cindent + '}'];
        std.join('', lines);
    aux(value, [], ''),

  manifestYamlDoc(value)::
    local aux(v, in_object, path, cindent) =
      if v == true then
        'true'
      else if v == false then
        'false'
      else if v == null then
        'null'
      else if std.type(v) == 'number' then
        '' + v
      else if std.type(v) == 'string' then
        local len = std.length(v);
        if len == 0 then
          '""'
        else if v[len - 1] == '\n' then
          local split = std.split(v, '\n');
          std.join('\n' + cindent, ['|'] + split[0:std.length(split) - 1])
        else
          std.escapeStringJson(v)
      else if std.type(v) == 'function' then
        error 'Tried to manifest function at ' + path
      else if std.type(v) == 'array' then
        if std.length(v) == 0 then
          '[]'
        else
          local range = std.range(0, std.length(v) - 1);
          local actual_indent = if in_object then cindent[2:] else cindent;
          local parts = [aux(v[i], false, path + [i], cindent) for i in range];
          (if in_object then '\n' + actual_indent else '')
          + '- ' + std.join('\n' + actual_indent + '- ', parts)
      else if std.type(v) == 'object' then
        if std.length(v) == 0 then
          '{}'
        else
          local new_indent = cindent + '  ';
          local lines = [
            std.escapeStringJson(k) + ': ' + aux(v[k], true, path + [k], new_indent)
            for k in std.objectFields(v)
          ];
          (if in_object then '\n' + cindent else '') + std.join('\n' + cindent, lines);
    aux(value, false, [], ''),

  manifestYamlStream(value)::
    if std.type(value) != 'array' then
      error 'manifestYamlStream only takes arrays, got ' + std.type(value)
    else
      '---\n' + std.join('\n---\n', [std.manifestYamlDoc(e) for e in value]) + '\n...\n',


  manifestPython(o)::
    if std.type(o) == 'object' then
      local fields = [
        '%s: %s' % [std.escapeStringPython(k), std.manifestPython(o[k])]
        for k in std.objectFields(o)
      ];
      '{%s}' % [std.join(', ', fields)]
    else if std.type(o) == 'array' then
      '[%s]' % [std.join(', ', [std.manifestPython(o2) for o2 in o])]
    else if std.type(o) == 'string' then
      '%s' % [std.escapeStringPython(o)]
    else if std.type(o) == 'function' then
      error 'cannot manifest function'
    else if std.type(o) == 'number' then
      std.toString(o)
    else if o == true then
      'True'
    else if o == false then
      'False'
    else if o == null then
      'None',

  manifestPythonVars(conf)::
    local vars = ['%s = %s' % [k, std.manifestPython(conf[k])] for k in std.objectFields(conf)];
    std.join('\n', vars + ['']),

  manifestXmlJsonml(value)::
    if !std.isArray(value) then
      error 'Expected a JSONML value (an array), got %s' % std.type(value)
    else
      local aux(v) =
        if std.isString(v) then
          v
        else
          local tag = v[0];
          local has_attrs = std.length(v) > 1 && std.type(v[1]) == 'object';
          local attrs = if has_attrs then v[1] else {};
          local children = if has_attrs then v[2:] else v[1:];
          local attrs_str =
            std.join('', [' %s="%s"' % [k, attrs[k]] for k in std.objectFields(attrs)]);
          std.deepJoin(['<', tag, attrs_str, '>', [aux(x) for x in children], '</', tag, '>']);

      aux(value),

  local base64_table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  local base64_inv = { [base64_table[i]]: i for i in std.range(0, 63) },

  base64(input)::
    local bytes =
      if std.type(input) == 'string' then
        std.map(function(c) std.codepoint(c), input)
      else
        input;

    local aux(arr, i, r) =
      if i >= std.length(arr) then
        r
      else if i + 1 >= std.length(arr) then
        local str =
          // 6 MSB of i
          base64_table[(arr[i] & 252) >> 2] +
          // 2 LSB of i
          base64_table[(arr[i] & 3) << 4] +
          '==';
        aux(arr, i + 3, r + str) tailstrict
      else if i + 2 >= std.length(arr) then
        local str =
          // 6 MSB of i
          base64_table[(arr[i] & 252) >> 2] +
          // 2 LSB of i, 4 MSB of i+1
          base64_table[(arr[i] & 3) << 4 | (arr[i + 1] & 240) >> 4] +
          // 4 LSB of i+1
          base64_table[(arr[i + 1] & 15) << 2] +
          '=';
        aux(arr, i + 3, r + str) tailstrict
      else
        local str =
          // 6 MSB of i
          base64_table[(arr[i] & 252) >> 2] +
          // 2 LSB of i, 4 MSB of i+1
          base64_table[(arr[i] & 3) << 4 | (arr[i + 1] & 240) >> 4] +
          // 4 LSB of i+1, 2 MSB of i+2
          base64_table[(arr[i + 1] & 15) << 2 | (arr[i + 2] & 192) >> 6] +
          // 6 LSB of i+2
          base64_table[(arr[i + 2] & 63)];
        aux(arr, i + 3, r + str) tailstrict;

    local sanity = std.foldl(function(r, a) r && (a < 256), bytes, true);
    if !sanity then
      error 'Can only base64 encode strings / arrays of single bytes.'
    else
      aux(bytes, 0, ''),


  base64DecodeBytes(str)::
    if std.length(str) % 4 != 0 then
      error 'Not a base64 encoded string "%s"' % str
    else
      local aux(str, i, r) =
        if i >= std.length(str) then
          r
        else
          // all 6 bits of i, 2 MSB of i+1
          local n1 = [base64_inv[str[i]] << 2 | (base64_inv[str[i + 1]] >> 4)];
          // 4 LSB of i+1, 4MSB of i+2
          local n2 =
            if str[i + 2] == '=' then []
            else [(base64_inv[str[i + 1]] & 15) << 4 | (base64_inv[str[i + 2]] >> 2)];
          // 2 LSB of i+2, all 6 bits of i+3
          local n3 =
            if str[i + 3] == '=' then []
            else [(base64_inv[str[i + 2]] & 3) << 6 | base64_inv[str[i + 3]]];
          aux(str, i + 4, r + n1 + n2 + n3) tailstrict;
      aux(str, 0, []),

  base64Decode(str)::
    local bytes = std.base64DecodeBytes(str);
    std.join('', std.map(function(b) std.char(b), bytes)),

  // Quicksort
  sort(arr)::
    local l = std.length(arr);
    if std.length(arr) == 0 then
      []
    else
      local pivot = arr[0];
      local rest = std.makeArray(l - 1, function(i) arr[i + 1]);
      local left = std.filter(function(x) x <= pivot, rest);
      local right = std.filter(function(x) x > pivot, rest);
      std.sort(left) + [pivot] + std.sort(right),

  uniq(arr)::
    local f(a, b) =
      if std.length(a) == 0 then
        [b]
      else if a[std.length(a) - 1] == b then
        a
      else
        a + [b];
    std.foldl(f, arr, []),

  set(arr)::
    std.uniq(std.sort(arr)),

  setMember(x, arr)::
    // TODO(dcunnin): Binary chop for O(log n) complexity
    std.length(std.setInter([x], arr)) > 0,

  setUnion(a, b)::
    std.set(a + b),

  setInter(a, b)::
    local aux(a, b, i, j, acc) =
      if i >= std.length(a) || j >= std.length(b) then
        acc
      else
        if a[i] == b[j] then
          aux(a, b, i + 1, j + 1, acc + [a[i]]) tailstrict
        else if a[i] < b[j] then
          aux(a, b, i + 1, j, acc) tailstrict
        else
          aux(a, b, i, j + 1, acc) tailstrict;
    aux(a, b, 0, 0, []) tailstrict,

  setDiff(a, b)::
    local aux(a, b, i, j, acc) =
      if i >= std.length(a) then
        acc
      else if j >= std.length(b) then
        aux(a, b, i + 1, j, acc + [a[i]]) tailstrict
      else
        if a[i] == b[j] then
          aux(a, b, i + 1, j + 1, acc) tailstrict
        else if a[i] < b[j] then
          aux(a, b, i + 1, j, acc + [a[i]]) tailstrict
        else
          aux(a, b, i, j + 1, acc) tailstrict;
    aux(a, b, 0, 0, []) tailstrict,

  mergePatch(target, patch)::
    if std.type(patch) == 'object' then
      local target_object =
        if std.type(target) == 'object' then target else {};

      local target_fields =
        if std.type(target_object) == 'object' then std.objectFields(target_object) else [];

      local null_fields = [k for k in std.objectFields(patch) if patch[k] == null];
      local both_fields = std.setUnion(target_fields, std.objectFields(patch));

      {
        [k]:
          if !std.objectHas(patch, k) then
            target_object[k]
          else if !std.objectHas(target_object, k) then
            std.mergePatch(null, patch[k]) tailstrict
          else
            std.mergePatch(target_object[k], patch[k]) tailstrict
        for k in std.setDiff(both_fields, null_fields)
      }
    else
      patch,

  objectFields(o)::
    std.objectFieldsEx(o, false),

  objectFieldsAll(o)::
    std.objectFieldsEx(o, true),

  objectHas(o, f)::
    std.objectHasEx(o, f, false),

  objectHasAll(o, f)::
    std.objectHasEx(o, f, true),

  equals(a, b)::
    local ta = std.type(a);
    local tb = std.type(b);
    if !std.primitiveEquals(ta, tb) then
      false
    else
      if std.primitiveEquals(ta, 'array') then
        local la = std.length(a);
        if !std.primitiveEquals(la, std.length(b)) then
          false
        else
          local aux(a, b, i) =
            if i >= la then
              true
            else if a[i] != b[i] then
              false
            else
              aux(a, b, i + 1) tailstrict;
          aux(a, b, 0)
      else if std.primitiveEquals(ta, 'object') then
        local fields = std.objectFields(a);
        local lfields = std.length(fields);
        if fields != std.objectFields(b) then
          false
        else
          local aux(a, b, i) =
            if i >= lfields then
              true
            else if local f = fields[i]; a[f] != b[f] then
              false
            else
              aux(a, b, i + 1) tailstrict;
          aux(a, b, 0)
      else
        std.primitiveEquals(a, b),


  resolvePath(f, r)::
    local arr = std.split(f, '/');
    std.join('/', std.makeArray(std.length(arr) - 1, function(i) arr[i]) + [r]),

  prune(a)::
    local isContent(b) =
      local t = std.type(b);
      if b == null then
        false
      else if t == 'array' then
        std.length(b) > 0
      else if t == 'object' then
        std.length(b) > 0
      else
        true;
    local t = std.type(a);
    if t == 'array' then
      [std.prune(x) for x in a if isContent($.prune(x))]
    else if t == 'object' then {
      [x]: $.prune(a[x])
      for x in std.objectFields(a)
      if isContent(std.prune(a[x]))
    } else
      a,
}
