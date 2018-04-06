package printer

import (
	"bytes"
	"fmt"
	"io"
	"strconv"
	"strings"

	"github.com/google/go-jsonnet/ast"
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/astext"
	"github.com/pkg/errors"
)

const (
	space   = byte(' ')
	tab     = byte('\t')
	newline = byte('\n')
	comma   = byte(',')

	syntaxSugar = '+'
)

// Fprint prints a node to the supplied writer using the default
// configuration.
func Fprint(output io.Writer, node ast.Node) error {
	return DefaultConfig.Fprint(output, node)
}

// DefaultConfig is a default configuration.
var DefaultConfig = Config{
	IndentSize: 2,
}

// IndentMode is the indent mode for Config.
type IndentMode int

const (
	// IndentModeSpace indents with spaces.
	IndentModeSpace IndentMode = iota
	// IndentModeTab indents with tabs.
	IndentModeTab
)

// Config is a configuration for the printer.
type Config struct {
	IndentSize int
	IndentMode IndentMode
}

// Fprint prints a node to the supplied writer.
func (c *Config) Fprint(output io.Writer, node ast.Node) error {
	p := printer{cfg: *c}

	p.print(node)

	if p.err != nil {
		return errors.Wrap(p.err, "output")
	}

	_, err := output.Write(p.output)
	return err
}

type printer struct {
	cfg Config

	output      []byte
	indentLevel int
	inFunction  bool

	err error
}

func (p *printer) indent() {
	if len(p.output) == 0 {
		return
	}

	r := p.indentLevel
	var ch byte
	if p.cfg.IndentMode == IndentModeTab {
		ch = tab
	} else {
		ch = space
		r = r * p.cfg.IndentSize
	}

	last := p.output[len(p.output)-1]
	if last == newline {
		pre := bytes.Repeat([]byte{ch}, r)
		p.output = append(p.output, pre...)
	}
}

func (p *printer) writeByte(ch byte, n int) {
	if p.err != nil {
		return
	}

	for i := 0; i < n; i++ {
		p.output = append(p.output, ch)
	}

	p.indent()
}

func (p *printer) writeString(s string) {
	for _, b := range []byte(s) {
		p.writeByte(b, 1)
	}
}

// printer prints a node.
// nolint: gocyclo
func (p *printer) print(n interface{}) {
	if p.err != nil {
		return
	}

	if n == nil {
		p.err = errors.New("node is nil")
		return
	}

	switch t := n.(type) {
	default:
		p.err = errors.Errorf("unknown node type: (%T) %v", n, n)
		return
	case *ast.Apply:
		p.handleApply(t)
	case ast.Arguments:
		p.handleArguments(t)
	case *ast.ApplyBrace:
		p.print(t.Left)
		p.writeByte(space, 1)
		p.print(t.Right)
	case *ast.Array:
		p.writeString("[")
		for i := 0; i < len(t.Elements); i++ {
			p.print(t.Elements[i])

			if i < len(t.Elements)-1 {
				p.writeString(",")
			}
		}
		p.writeString("]")
	case *ast.Binary:
		p.print(t.Left)
		p.writeByte(space, 1)

		p.writeString(t.Op.String())
		p.writeByte(space, 1)

		p.print(t.Right)
	case *ast.Conditional:
		p.handleConditional(t)
	case *ast.Function:
		p.addMethodSignature(t)
	case *ast.Import:
		p.writeString("import ")
		p.print(t.File)
	case *ast.Index:
		p.handleIndex(t)
	case *ast.Local:
		p.handleLocal(t)
	case *ast.Object:
		p.writeString("{")

		for _, field := range t.Fields {
			if !p.inFunction {
				p.indentLevel++
				p.writeByte(newline, 1)
			}

			p.print(field)

			if !p.inFunction {
				p.indentLevel--
				p.writeByte(comma, 1)
			}
		}

		// write an extra newline at the end
		if !p.inFunction {
			p.writeByte(newline, 1)
		}

		p.writeString("}")
	case *astext.Object:
		p.writeString("{")

		for i, field := range t.Fields {
			if !t.Oneline && !p.inFunction {
				p.indentLevel++
				p.writeByte(newline, 1)
			}

			p.print(field)
			if i < len(t.Fields)-1 {
				if t.Oneline {
					p.writeByte(comma, 1)
					p.writeByte(space, 1)
				}
			}

			if !t.Oneline && !p.inFunction {
				p.indentLevel--
				p.writeByte(comma, 1)
			}
		}

		// write an extra newline at the end
		if !t.Oneline && !p.inFunction {
			p.writeByte(newline, 1)
		}

		p.writeString("}")
	case astext.ObjectField, ast.ObjectField:
		p.handleObjectField(t)
	case *ast.LiteralBoolean:
		if t.Value {
			p.writeString("true")
		} else {
			p.writeString("false")
		}
	case *ast.LiteralString:
		switch t.Kind {
		default:
			p.err = errors.Errorf("unknown string literal kind %#v", t.Kind)
			return
		case ast.StringDouble:
			p.writeString(strconv.Quote(t.Value))
		case ast.StringSingle:
			p.writeString(fmt.Sprintf("'%s'", t.Value))
		}

	case *ast.LiteralNumber:
		p.writeString(t.OriginalString)
	case *ast.Self:
		p.writeString("self")
	case *ast.Var:
		p.writeString(string(t.Id))
	}
}

func (p *printer) handleApply(a *ast.Apply) {
	switch a.Target.(type) {
	default:
		p.writeString("function")
		p.writeString("(")
		p.print(a.Arguments)
		p.writeString(")")
		p.writeByte(space, 1)
		p.print(a.Target)
	case *ast.Apply, *ast.Index, *ast.Self, *ast.Var:
		p.print(a.Target)
		p.writeString("(")
		p.print(a.Arguments)
		p.writeString(")")
	}
}

func (p *printer) handleArguments(a ast.Arguments) {
	// NOTE: only supporting positional arguments
	for i, arg := range a.Positional {
		p.print(arg)
		if i < len(a.Positional)-1 {
			p.writeByte(comma, 1)
			p.writeByte(space, 1)
		}
	}
}

func (p *printer) handleConditional(c *ast.Conditional) {
	p.writeString("if ")
	p.print(c.Cond)

	p.writeString(" then ")
	p.print(c.BranchTrue)

	if c.BranchFalse != nil {
		p.writeString(" else ")
		p.print(c.BranchFalse)
	}
}

func (p *printer) writeComment(c *astext.Comment) {
	if c == nil {
		return
	}

	lines := strings.Split(c.Text, "\n")
	for _, line := range lines {
		p.writeString("//")
		if len(line) > 0 {
			p.writeByte(space, 1)
		}
		p.writeString(strings.TrimSpace(line))
		p.writeByte(newline, 1)
	}
}

func (p *printer) handleIndex(i *ast.Index) {
	if i == nil {
		p.err = errors.New("index is nil")
		return
	}
	p.print(i.Target)
	p.writeString(".")

	id, err := indexID(i)
	if err != nil {
		p.err = err
		return
	}
	p.writeString(id)

}

func (p *printer) handleLocal(l *ast.Local) {
	p.writeString("local ")

	for _, bind := range l.Binds {
		p.writeString(string(bind.Variable))
		switch bodyType := bind.Body.(type) {
		default:
			p.writeString(" = ")
			p.print(bind.Body)
			p.writeString(";")
		case *ast.Function:
			p.print(bind.Body)
			p.handleLocalFunction(bodyType)
		}
		c := 1
		if _, ok := l.Body.(*ast.Local); !ok {
			c = 2
		}
		p.writeByte(newline, c)

	}

	p.print(l.Body)
}

func (p *printer) handleLocalFunction(f *ast.Function) {
	p.writeString(" =")
	switch f.Body.(type) {
	default:
		p.writeByte(space, 1)
		p.print(f.Body)
		p.writeString(";")
	case *ast.Local:
		p.indentLevel++
		p.writeByte(newline, 1)
		p.print(f.Body)
		p.writeString(";")
		p.indentLevel--
	}
}

func fieldID(expr1 ast.Node, id *ast.Identifier) string {
	if expr1 != nil {
		ls := expr1.(*ast.LiteralString)
		return fmt.Sprintf(`"%s"`, ls.Value)
	}

	if id != nil {
		return string(*id)
	}

	return ""
}

func (p *printer) handleObjectField(n interface{}) {
	var ofHide ast.ObjectFieldHide
	var ofKind ast.ObjectFieldKind
	var ofID string
	var ofMethod *ast.Function
	var ofSugar bool
	var ofExpr2 ast.Node

	switch t := n.(type) {
	default:
		p.err = errors.Errorf("unknown object field type %T", t)
		return
	case ast.ObjectField:
		ofHide = t.Hide
		ofKind = t.Kind
		ofID = fieldID(t.Expr1, t.Id)
		ofMethod = t.Method
		ofSugar = t.SuperSugar
		ofExpr2 = t.Expr2
	case astext.ObjectField:
		ofHide = t.Hide
		ofKind = t.Kind
		ofID = fieldID(t.Expr1, t.Id)
		ofMethod = t.Method
		ofSugar = t.SuperSugar
		ofExpr2 = t.Expr2
		p.writeComment(t.Comment)
	}

	if ofID == "" {
		p.err = errors.New("id is not defined")
		return
	}

	var fieldType string

	switch ofHide {
	default:
		p.err = errors.Errorf("unknown Hide type %#v", ofHide)
		return
	case ast.ObjectFieldHidden:
		fieldType = "::"
	case ast.ObjectFieldVisible:
		fieldType = ":::"
	case ast.ObjectFieldInherit:
		fieldType = ":"
	}

	switch ofKind {
	default:
		p.err = errors.Errorf("unknown Kind type %#v", ofKind)
		return
	case ast.ObjectFieldID:
		p.writeString(ofID)
		if ofMethod != nil {
			p.addMethodSignature(ofMethod)
		}

		if ofSugar {
			p.writeByte(syntaxSugar, 1)
		}

		p.writeString(fieldType)

		if isLocal(ofExpr2) {
			p.indentLevel++
			p.writeByte(newline, 1)
			p.print(ofExpr2)
			p.indentLevel--

		} else {
			p.writeByte(space, 1)
			p.print(ofExpr2)
		}

	case ast.ObjectLocal:
		p.writeString("local ")
		p.writeString(ofID)
		p.addMethodSignature(ofMethod)
		p.writeString(" = ")
		p.print(ofExpr2)
	case ast.ObjectFieldStr:
		p.writeString(fmt.Sprintf(`%s%s `, ofID, fieldType))
		p.print(ofExpr2)
	}
}

func isLocal(node ast.Node) bool {
	switch node.(type) {
	default:
		return false
	case *ast.Local:
		return true
	}
}

func (p *printer) addMethodSignature(method *ast.Function) {
	if method == nil {
		return
	}
	params := method.Parameters

	p.writeString("(")
	var args []string
	for _, arg := range params.Required {
		args = append(args, string(arg))
	}

	for _, opt := range params.Optional {
		if opt.DefaultArg == nil {
			continue
		}
		var arg string
		arg += string(opt.Name)
		arg += "="

		child := printer{cfg: p.cfg}
		child.inFunction = true
		child.print(opt.DefaultArg)
		if child.err != nil {
			p.err = errors.Wrapf(child.err, "invalid argument for %s", string(opt.Name))
			return
		}

		arg += string(child.output)

		args = append(args, arg)
	}

	p.writeString(strings.Join(args, ", "))
	p.writeString(")")
}

func literalStringValue(ls *ast.LiteralString) (string, error) {
	if ls == nil {
		return "", errors.New("literal string is nil")
	}

	return ls.Value, nil
}

func indexID(i *ast.Index) (string, error) {
	if i == nil {
		return "", errors.New("index is nil")
	}

	if i.Index != nil {
		ls, ok := i.Index.(*ast.LiteralString)
		if !ok {
			return "", errors.New("index is not a literal string")
		}

		return literalStringValue(ls)
	} else if i.Id != nil {
		return string(*i.Id), nil
	} else {
		return "", errors.New("index and id can't both be blank")
	}
}
