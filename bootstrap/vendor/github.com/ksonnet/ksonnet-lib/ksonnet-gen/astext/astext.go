package astext

import (
	"regexp"

	"github.com/google/go-jsonnet/ast"
	"github.com/pkg/errors"
)

// ObjectFields is a slice of ObjectField.
type ObjectFields []ObjectField

// ObjectField wraps ast.ObjectField and adds commenting and the ability to
// be printed on one line.
type ObjectField struct {
	ast.ObjectField

	// Comment is a comment for the object field.
	Comment *Comment

	// Oneline prints this field on a single line.
	Oneline bool
}

// Object wraps ast.Object and adds the ability to be printed on one line.
type Object struct {
	ast.Object

	Fields []ObjectField

	// Oneline prints this field on a single line.
	Oneline bool
}

var (
	// reFieldStr matches a field id that should be enclosed in quotes.
	reFieldStr = regexp.MustCompile(`^[A-Za-z]+[A-Za-z0-9\-]*$`)
	// reField matches a field id.
	reField = regexp.MustCompile(`^[A-Za-z]+[A-Za-z0-9]*$`)
)

// CreateField creates an ObjectField with a name. If the name matches `reFieldStr`, it will
// create an ObjectField with Kind `ObjectFieldStr`. If not, it will create an identifier
// and set the ObjectField kind to `ObjectFieldId`.
func CreateField(name string) (*ObjectField, error) {
	of := ObjectField{ObjectField: ast.ObjectField{}}
	if reField.MatchString(name) {
		id := ast.Identifier(name)
		of.Kind = ast.ObjectFieldID
		of.Id = &id
	} else if reFieldStr.MatchString(name) {
		of.Expr1 = &ast.LiteralString{
			Value: name,
			Kind:  ast.StringDouble,
		}
		of.Kind = ast.ObjectFieldStr
	} else {
		return nil, errors.Errorf("invalid field name %q", name)
	}

	return &of, nil
}
