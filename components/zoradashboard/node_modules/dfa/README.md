# dfa

Compiles a regular expression like syntax to fast deterministic finite automata.
Useful for pattern matching against non-string sequences.

## Example

This example matches [Hangul](https://en.wikipedia.org/wiki/Hangul) syllables. The symbols defined in the machine are Unicode character categories which could be mapped from code points.

Machine definition:

```coffeescript
# define symbols
X   = 0; # Other character
L   = 1; # Leading consonant
V   = 2; # Medial vowel
T   = 3; # Trailing consonant
LV  = 4; # Composed <LV> syllable
LVT = 5; # Composed <LVT> syllable
M   = 6; # Tone mark

# define variables
decomposed = L V T?;
partial = LV T?;
composed = LVT;

# define main state machine pattern
main = (decomposed | partial | composed) M?;
```

Visualized, the machine looks like this (double circles are accepting states):

![dfa](https://cloud.githubusercontent.com/assets/19409/19143719/8fbc6a12-8b5a-11e6-868d-99621644d094.png)

Compiling and using the machine:

```javascript
import compile from 'dfa/compile';
import fs from 'fs';

let stateMachine = compile(fs.readFileSync('hangul.machine', 'utf8'));

// find matches
for (let [startIndex, endIndex] of stateMachine.match([0, 1, 2, 3, 0, 4, 6]) {
  console.log('match:', startIndex, endIndex);
}
```

Output:
```
match: 1 3
match: 5 6
```

## Syntax

A state machine file contains a list of assignment statements. Comments are also allowed
and are started with the `#` character. Each statement is an assignment of a variable name
to a value or expression. Assigning a variable to a number produces a symbol, which is
added to the state machine's alphabet. Assigning a variable to an expression allows
for substitutions into later expressions. The special `main` variable should always be
assigned to at the end of the file, and is the final expression that will be compiled.

A subset of common regular expression syntax is supported. A list of operators and their
precedence is below. Operators with the same precedence are evaluated left to right.

| Precedence | Syntax     | Type          | Meaning                                    |
| ---------- | ---------- | --------------| ------------------------------------------ |
| 1          | `a \| b`   | Alternation   | Matches either `a` or `b`                  |
| 2          | `a b`      | Concatenation | Matches `a` followed by `b`                |
| 3          | `a*`       | Repetition    | Matches zero or more occurrences of `a`    |
| 3          | `a+`       | Repetition    | Matches one ore more occurrences of `a`    |
| 3          | `a?`       | Optional      | Matches zero or one occurrence of `a`      |
| 3          | `a{n}`     | Repetition    | Matches exactly n occurrences of `a`       |
| 3          | `a{n,}`    | Repetition    | Matches n or more occurrences of `a`       |
| 3          | `a{,n}`    | Repetition    | Matches up to n occurrences of `a`         |
| 3          | `a{n,m}`   | Repetition    | Matches n to m occurrences of `a`          |
| 4          | `t:<expr>` | Tag           | Tags the following expression with tag `t` |
| 5          | `(<expr>)` | Grouping      | Groups an expression                       |

## License

MIT
