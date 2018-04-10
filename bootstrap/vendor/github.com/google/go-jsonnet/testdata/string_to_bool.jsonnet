local stringToBool(s) =
      if s == "true" then true
      else if s == "false" then false
      else error "invalid boolean: " + std.manifestJson(s);
[stringToBool("false"), stringToBool("true")]
