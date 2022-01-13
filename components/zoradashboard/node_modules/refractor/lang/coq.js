'use strict'

module.exports = coq
coq.displayName = 'coq'
coq.aliases = []
function coq(Prism) {
  ;(function (Prism) {
    // https://github.com/coq/coq
    var commentSource = /\(\*(?:[^(*]|\((?!\*)|\*(?!\))|<self>)*\*\)/.source
    for (var i = 0; i < 2; i++) {
      commentSource = commentSource.replace(/<self>/g, function () {
        return commentSource
      })
    }
    commentSource = commentSource.replace(/<self>/g, '[]')
    Prism.languages.coq = {
      comment: RegExp(commentSource),
      string: {
        pattern: /"(?:[^"]|"")*"(?!")/,
        greedy: true
      },
      attribute: [
        {
          pattern: RegExp(
            /#\[(?:[^\]("]|"(?:[^"]|"")*"(?!")|\((?!\*)|<comment>)*\]/.source.replace(
              /<comment>/g,
              function () {
                return commentSource
              }
            )
          ),
          greedy: true,
          alias: 'attr-name',
          inside: {
            comment: RegExp(commentSource),
            string: {
              pattern: /"(?:[^"]|"")*"(?!")/,
              greedy: true
            },
            operator: /=/,
            punctuation: /^#\[|\]$|[,()]/
          }
        },
        {
          pattern:
            /\b(?:Cumulative|Global|Local|Monomorphic|NonCumulative|Polymorphic|Private|Program)\b/,
          alias: 'attr-name'
        }
      ],
      keyword:
        /\b(?:_|Abort|About|Add|Admit|Admitted|All|apply|Arguments|as|As|Assumptions|at|Axiom|Axioms|Back|BackTo|Backtrace|Bind|BinOp|BinOpSpec|BinRel|Blacklist|by|Canonical|Case|Cd|Check|Class|Classes|Close|Coercion|Coercions|cofix|CoFixpoint|CoInductive|Collection|Combined|Compute|Conjecture|Conjectures|Constant|Constants|Constraint|Constructors|Context|Corollary|Create|CstOp|Custom|Cut|Debug|Declare|Defined|Definition|Delimit|Dependencies|Dependent|Derive|Diffs|Drop|Elimination|else|end|End|Entry|Equality|Eval|Example|Existential|Existentials|Existing|exists|exists2|Export|Extern|Extraction|Fact|Fail|Field|File|Firstorder|fix|Fixpoint|Flags|Focus|for|forall|From|fun|Funclass|Function|Functional|GC|Generalizable|Goal|Grab|Grammar|Graph|Guarded|Haskell|Heap|Hide|Hint|HintDb|Hints|Hypotheses|Hypothesis|Identity|if|IF|Immediate|Implicit|Implicits|Import|in|Include|Induction|Inductive|Infix|Info|Initial|InjTyp|Inline|Inspect|Instance|Instances|Intro|Intros|Inversion|Inversion_clear|JSON|Language|Left|Lemma|let|Let|Lia|Libraries|Library|Load|LoadPath|Locate|Ltac|Ltac2|match|Match|measure|Method|Minimality|ML|Module|Modules|Morphism|move|Next|NoInline|Notation|Number|Obligation|Obligations|OCaml|Opaque|Open|Optimize|Parameter|Parameters|Parametric|Path|Paths|Prenex|Preterm|Primitive|Print|Profile|Projections|Proof|Prop|PropBinOp|Property|PropOp|Proposition|PropUOp|Pwd|Qed|Quit|Rec|Record|Recursive|Redirect|Reduction|Register|Relation|Remark|Remove|removed|Require|Reserved|Reset|Resolve|Restart|return|Rewrite|Right|Ring|Rings|Saturate|Save|Scheme|Scope|Scopes|Search|SearchHead|SearchPattern|SearchRewrite|Section|Separate|Set|Setoid|Show|Signatures|Solve|Solver|Sort|Sortclass|Sorted|Spec|SProp|Step|Strategies|Strategy|String|struct|Structure|SubClass|Subgraph|SuchThat|Tactic|Term|TestCompile|then|Theorem|Time|Timeout|To|Transparent|Type|Typeclasses|Types|Typing|Undelimit|Undo|Unfocus|Unfocused|Unfold|Universe|Universes|UnOp|UnOpSpec|Unshelve|using|Variable|Variables|Variant|Verbose|View|Visibility|wf|where|with|Zify)\b/,
      number:
        /\b(?:0x[a-f0-9][a-f0-9_]*(?:\.[a-f0-9_]+)?(?:p[+-]?\d[\d_]*)?|\d[\d_]*(?:\.[\d_]+)?(?:e[+-]?\d[\d_]*)?)\b/i,
      punct: {
        pattern: /@\{|\{\||\[=|:>/,
        alias: 'punctuation'
      },
      operator:
        /\/\\|\\\/|\.{2,3}|:{1,2}=|\*\*|[-=]>|<(?:->?|[+:=>]|<:)|>(?:=|->)|\|[-|]?|[-!%&*+/<=>?@^~']/,
      punctuation: /\.\(|`\(|@\{|`\{|\{\||\[=|:>|[:.,;(){}\[\]]/
    }
  })(Prism)
}
