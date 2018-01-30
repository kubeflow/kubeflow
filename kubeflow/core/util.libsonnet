// Some useful routines.
{
	// Convert a string to upper case.
	upper:: function(x) {
		local cp(c) = std.codepoint(c),
		local upLetter(c) = if cp(c) >= 97 && cp(c) < 123 then 
			std.char(cp(c) - 32) 
			else c,
		result:: std.join("", std.map(upLetter, std.stringChars(x))),
	}.result,

	// Convert a boolean or string of the form true/false to a boolean.
	// This is primarily intended for dealing with parameters that should be booleans.
	toBool::function(x) { 
		result:: if std.type(x) == "boolean" then
			x
			else 
				if std.type(x) == "string" then
					if $.upper(x) == "TRUE" then 
						true
					else false
				else 
					false,

	}.result,
}