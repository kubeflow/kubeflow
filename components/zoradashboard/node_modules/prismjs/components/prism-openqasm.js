// https://qiskit.github.io/openqasm/grammar/index.html

Prism.languages.openqasm = {
	'comment': /\/\*[\s\S]*?\*\/|\/\/.*/,
	'string': {
		pattern: /"[^"\r\n\t]*"|'[^'\r\n\t]*'/,
		greedy: true
	},

	'keyword': /\b(?:barrier|boxas|boxto|break|const|continue|ctrl|def|defcal|defcalgrammar|delay|else|end|for|gate|gphase|if|in|include|inv|kernel|lengthof|let|measure|pow|reset|return|rotary|stretchinf|while|CX|OPENQASM|U)\b|#pragma\b/,
	'class-name': /\b(?:angle|bit|bool|creg|fixed|float|int|length|qreg|qubit|stretch|uint)\b/,
	'function': /\b(?:sin|cos|tan|exp|ln|sqrt|rotl|rotr|popcount)\b(?=\s*\()/,

	'constant': /\b(?:pi|tau|euler)\b|π|𝜏|ℇ/,
	'number': {
		pattern: /(^|[^.\w$])(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?(?:dt|ns|us|µs|ms|s)?/i,
		lookbehind: true
	},
	'operator': /->|>>=?|<<=?|&&|\|\||\+\+|--|[!=<>&|~^+\-*/%]=?|@/,
	'punctuation': /[(){}\[\];,:.]/
};

Prism.languages.qasm = Prism.languages.openqasm;
