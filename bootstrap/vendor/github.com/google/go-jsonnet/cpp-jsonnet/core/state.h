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

#ifndef JSONNET_STATE_H
#define JSONNET_STATE_H

namespace {

/** Mark & sweep: advanced by 1 each GC cycle.
 */
typedef unsigned char GarbageCollectionMark;

/** Supertype of everything that is allocated on the heap.
 */
struct HeapEntity {
    GarbageCollectionMark mark;
    virtual ~HeapEntity() {}
};

/** Tagged union of all values.
 *
 * Primitives (<= 8 bytes) are copied by value.  Otherwise a pointer to a HeapEntity is used.
 */
struct Value {
    enum Type {
        NULL_TYPE = 0x0,  // Unfortunately NULL is a macro in C.
        BOOLEAN = 0x1,
        NUMBER = 0x2,

        ARRAY = 0x10,
        FUNCTION = 0x11,
        OBJECT = 0x12,
        STRING = 0x13
    };
    Type t;
    union {
        HeapEntity *h;
        double d;
        bool b;
    } v;
    bool isHeap(void) const
    {
        return t & 0x10;
    }
};

/** Convert the type into a string, for error messages. */
std::string type_str(Value::Type t)
{
    switch (t) {
        case Value::NULL_TYPE: return "null";
        case Value::BOOLEAN: return "boolean";
        case Value::NUMBER: return "number";
        case Value::ARRAY: return "array";
        case Value::FUNCTION: return "function";
        case Value::OBJECT: return "object";
        case Value::STRING: return "string";
        default:
            std::cerr << "INTERNAL ERROR: Unknown type: " << t << std::endl;
            std::abort();
            return "";  // Quiet, compiler.
    }
}

/** Convert the value's type into a string, for error messages. */
std::string type_str(const Value &v)
{
    return type_str(v.t);
}

struct HeapThunk;

/** Stores the values bound to variables.
 *
 * Each nested local statement, function call, and field access has its own binding frame to
 * give the values for the local variable, function parameters, or upValues.
 */
typedef std::map<const Identifier *, HeapThunk *> BindingFrame;

/** Supertype of all objects.  Types of Value::OBJECT will point at these.  */
struct HeapObject : public HeapEntity {
};

/** Hold an unevaluated expression.  This implements lazy semantics.
 */
struct HeapThunk : public HeapEntity {
    /** Whether or not the thunk was forced. */
    bool filled;

    /** The result when the thunk was forced, if filled == true. */
    Value content;

    /** Used in error tracebacks. */
    const Identifier *name;

    /** The captured environment.
     *
     * Note, this is non-const because we have to add cyclic references to it.
     */
    BindingFrame upValues;

    /** The captured self variable, or nullptr if there was none.  \see CallFrame. */
    HeapObject *self;

    /** The offset from the captured self variable. \see CallFrame. */
    unsigned offset;

    /** Evaluated to force the thunk. */
    const AST *body;

    HeapThunk(const Identifier *name, HeapObject *self, unsigned offset, const AST *body)
        : filled(false), name(name), self(self), offset(offset), body(body)
    {
    }

    void fill(const Value &v)
    {
        content = v;
        filled = true;
        self = nullptr;
        upValues.clear();
    }
};

struct HeapArray : public HeapEntity {
    // It is convenient for this to not be const, so that we can add elements to it one at a
    // time after creation.  Thus, elements are not GCed as the array is being
    // created.
    std::vector<HeapThunk *> elements;
    HeapArray(const std::vector<HeapThunk *> &elements) : elements(elements) {}
};

/** Supertype of all objects that are not super objects or extended objects.  */
struct HeapLeafObject : public HeapObject {
};

/** Objects created via the simple object constructor construct. */
struct HeapSimpleObject : public HeapLeafObject {
    /** The captured environment. */
    const BindingFrame upValues;

    struct Field {
        /** Will the field appear in output? */
        ObjectField::Hide hide;
        /** Expression that is evaluated when indexing this field. */
        AST *body;
    };

    /** The fields.
     *
     * These are evaluated in the captured environment and with self and super bound
     * dynamically.
     */
    const std::map<const Identifier *, Field> fields;

    /** The object's invariants.
     *
     * These are evaluated in the captured environment with self and super bound.
     */
    ASTs asserts;

    HeapSimpleObject(const BindingFrame &up_values,
                     const std::map<const Identifier *, Field> fields, ASTs asserts)
        : upValues(up_values), fields(fields), asserts(asserts)
    {
    }
};

/** Objects created by the + construct. */
struct HeapExtendedObject : public HeapObject {
    /** The left hand side of the construct. */
    HeapObject *left;

    /** The right hand side of the construct. */
    HeapObject *right;

    HeapExtendedObject(HeapObject *left, HeapObject *right) : left(left), right(right) {}
};

/** Objects created by the ObjectComprehensionSimple construct. */
struct HeapComprehensionObject : public HeapLeafObject {
    /** The captured environment. */
    const BindingFrame upValues;

    /** The expression used to compute the field values.  */
    const AST *value;

    /** The identifier of bound variable in that construct.  */
    const Identifier *const id;

    /** Binding for id.
     *
     * For each field, holds the value that should be bound to id.  This is the corresponding
     * array element from the original array used to define this object.  This should not really
     * be a thunk, but it makes the implementation easier.
     *
     * It is convenient to make this non-const to allow building up the values one by one, so that
     * the garbage collector can see them at each intermediate point.
     */
    std::map<const Identifier *, HeapThunk *> compValues;

    HeapComprehensionObject(const BindingFrame &up_values, const AST *value, const Identifier *id,
                            const std::map<const Identifier *, HeapThunk *> &comp_values)
        : upValues(up_values), value(value), id(id), compValues(comp_values)
    {
    }
};

/** Stores the function itself and also the captured environment.
 *
 * Either body is non-null and builtinName is "", or body is null and builtin refers to a built-in
 * function.  In the former case, the closure represents a user function, otherwise calling it
 * will trigger the builtin function to execute.  Params is empty when the function is a
 * builtin.
 */
struct HeapClosure : public HeapEntity {
    /** The captured environment. */
    const BindingFrame upValues;
    /** The captured self variable, or nullptr if there was none.  \see Frame. */
    HeapObject *self;
    /** The offset from the captured self variable.  \see Frame.*/
    unsigned offset;
    struct Param {
        const Identifier *id;
        const AST *def;
        Param(const Identifier *id, const AST *def) : id(id), def(def) {}
    };
    typedef std::vector<Param> Params;
    const Params params;
    const AST *body;
    std::string builtinName;
    HeapClosure(const BindingFrame &up_values, HeapObject *self, unsigned offset,
                const Params &params, const AST *body, const std::string &builtin_name)
        : upValues(up_values),
          self(self),
          offset(offset),
          params(params),
          body(body),
          builtinName(builtin_name)
    {
    }
};

/** Stores a simple string on the heap. */
struct HeapString : public HeapEntity {
    const UString value;
    HeapString(const UString &value) : value(value) {}
};

/** The heap does memory management, i.e. garbage collection. */
class Heap {
    /** How many objects must exist in the heap before we bother doing garbage collection?
     */
    unsigned gcTuneMinObjects;

    /** How much must the heap have grown since the last cycle to trigger a collection?
     */
    double gcTuneGrowthTrigger;

    /** Value used to mark entities at the last garbage collection cycle. */
    GarbageCollectionMark lastMark;

    /** The heap entities (strings, arrays, objects, functions, etc).
     *
     * Not all may be reachable, all should have o->mark == this->lastMark.  Entities are
     * removed from the heap via O(1) swap with last element, so the ordering of entities is
     * arbitrary and changes every garbage collection cycle.
     */
    std::vector<HeapEntity *> entities;

    /** The number of heap entities at the last garbage collection cycle. */
    unsigned long lastNumEntities;

    /** The number of heap entities now. */
    unsigned long numEntities;

    /** Add the HeapEntity inside v to vec, if the value exists on the heap.
     */
    void addIfHeapEntity(Value v, std::vector<HeapEntity *> &vec)
    {
        if (v.isHeap())
            vec.push_back(v.v.h);
    }

    /** Add the HeapEntity inside v to vec, if the value exists on the heap.
     */
    void addIfHeapEntity(HeapEntity *v, std::vector<HeapEntity *> &vec)
    {
        vec.push_back(v);
    }

   public:
    Heap(unsigned gc_tune_min_objects, double gc_tune_growth_trigger)
        : gcTuneMinObjects(gc_tune_min_objects),
          gcTuneGrowthTrigger(gc_tune_growth_trigger),
          lastMark(0),
          lastNumEntities(0),
          numEntities(0)
    {
    }

    ~Heap(void)
    {
        // Nothing is marked, everything will be collected.
        sweep();
    }

    /** Garbage collection: Mark v, and entities reachable from v. */
    void markFrom(Value v)
    {
        if (v.isHeap())
            markFrom(v.v.h);
    }

    /** Garbage collection: Mark heap entities reachable from the given heap entity. */
    void markFrom(HeapEntity *from)
    {
        assert(from != nullptr);
        const GarbageCollectionMark thisMark = lastMark + 1;
        struct State {
            HeapEntity *ent;
            std::vector<HeapEntity *> children;
            State(HeapEntity *ent) : ent(ent) {}
        };

        std::vector<State> stack;
        stack.emplace_back(from);

        while (stack.size() > 0) {
            size_t curr_index = stack.size() - 1;
            State &s = stack[curr_index];
            HeapEntity *curr = s.ent;
            if (curr->mark != thisMark) {
                curr->mark = thisMark;

                if (auto *obj = dynamic_cast<HeapSimpleObject *>(curr)) {
                    for (auto upv : obj->upValues)
                        addIfHeapEntity(upv.second, s.children);

                } else if (auto *obj = dynamic_cast<HeapExtendedObject *>(curr)) {
                    addIfHeapEntity(obj->left, s.children);
                    addIfHeapEntity(obj->right, s.children);

                } else if (auto *obj = dynamic_cast<HeapComprehensionObject *>(curr)) {
                    for (auto upv : obj->upValues)
                        addIfHeapEntity(upv.second, s.children);
                    for (auto upv : obj->compValues)
                        addIfHeapEntity(upv.second, s.children);

                } else if (auto *arr = dynamic_cast<HeapArray *>(curr)) {
                    for (auto el : arr->elements)
                        addIfHeapEntity(el, s.children);

                } else if (auto *func = dynamic_cast<HeapClosure *>(curr)) {
                    for (auto upv : func->upValues)
                        addIfHeapEntity(upv.second, s.children);
                    if (func->self)
                        addIfHeapEntity(func->self, s.children);

                } else if (auto *thunk = dynamic_cast<HeapThunk *>(curr)) {
                    if (thunk->filled) {
                        if (thunk->content.isHeap())
                            addIfHeapEntity(thunk->content.v.h, s.children);
                    } else {
                        for (auto upv : thunk->upValues)
                            addIfHeapEntity(upv.second, s.children);
                        if (thunk->self)
                            addIfHeapEntity(thunk->self, s.children);
                    }
                }
            }

            if (s.children.size() > 0) {
                HeapEntity *next = s.children[s.children.size() - 1];
                s.children.pop_back();
                stack.emplace_back(next);  // CAUTION: s invalidated here
            } else {
                stack.pop_back();  // CAUTION: s invalidated here
            }
        }
    }

    /** Delete everything that was not marked since the last collection. */
    void sweep(void)
    {
        lastMark++;
        // Heap shrinks during this loop.  Do not cache entities.size().
        for (unsigned long i = 0; i < entities.size(); ++i) {
            HeapEntity *x = entities[i];
            if (x->mark != lastMark) {
                delete x;
                if (i != entities.size() - 1) {
                    // Swap it with the back.
                    entities[i] = entities[entities.size() - 1];
                }
                entities.pop_back();
                --i;
            }
        }
        lastNumEntities = numEntities = entities.size();
    }

    /** Is it time to initiate a GC cycle? */
    bool checkHeap(void)
    {
        return numEntities > gcTuneMinObjects &&
               numEntities > gcTuneGrowthTrigger * lastNumEntities;
    }

    /** Allocate a heap entity.
     *
     * If the heap is large enough (\see gcTuneMinObjects) and has grown by enough since the
     * last collection cycle (\see gcTuneGrowthTrigger), a collection cycle is performed.
     */
    template <class T, class... Args>
    T *makeEntity(Args &&... args)
    {
        T *r = new T(std::forward<Args>(args)...);
        entities.push_back(r);
        r->mark = lastMark;
        numEntities = entities.size();
        return r;
    }
};

}  // namespace

#endif  // JSONNET_STATE_H
