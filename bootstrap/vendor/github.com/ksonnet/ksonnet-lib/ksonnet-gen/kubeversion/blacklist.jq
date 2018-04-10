#!/usr/bin/env jq -S -f


# -----------------------------------------------------------------------------
# USAGE NOTES.
#
# This `jq` script will generate a list of top-level Kubernetes API
# objects that contain either (or both of):
#
#   1. a property with the name `"status"`, or
#   2. a property whose type is `meta.v1.ListMeta`.
#
# For example:
#
#  {
#    "io.k8s.apimachinery.pkg.apis.meta.v1.Status": [
#      "status", "metadata"
#    ]
#  }
#
# This would indicate that the fields `metadata` and `status` are to
# be blacklisted in the object `meta.v1.Status`.
#
#
# Usage:
#   cat swagger.json | jq -S -f blacklist.jq
#
# Or, if you are on an OS with jq > v1.4
#   cat swagger.json | ./blacklist.jq
#
# NOTE: It is very important to pass the -S flag here, because sorting
# the object keys makes the output diffable.
# -----------------------------------------------------------------------------


# has_status_prop takes an Kubernetes API object definition from the
# swagger spec, and outputs a boolean indicating whether that API
# object has a property called `status`.
#
# For example, the input might be a
# `io.k8s.kubernetes.pkg.apis.apps.v1beta1.Deployment` object, which
# does indeed have a `status` field.
def has_status_prop:
  . as $definition
  | if $definition.properties.status != null then true else false end;

# property_has_listmeta_type takes the property of a Kubernetes API
# object definition, and returns a bool indicating whether its type is
# a `$ref` of `meta.v1.ListMeta`.
#
# For example, `io.k8s.kubernetes.pkg.apis.apps.v1beta1.Deployment`
# does not have a property with a type that is a `$ref` to
# `meta.v1.ListMeta`.
def property_has_listmeta_type:
  . as $property
  | $property["$ref"] != null and
    $property["$ref"] == "#/definitions/io.k8s.apimachinery.pkg.apis.meta.v1.ListMeta";

# props_with_listmeta_type returns the names of all properties in some
# Kubernetes API object definition whose type is `meta.v1.ListMeta`.
#
# For example, `io.k8s.kubernetes.pkg.apis.apps.v1beta1.Deployment`
# does not contain any properties with this type, so we would return
# an empty array, while another object might return a list of names.
def props_with_listmeta_type: [
  . as $definition
  | select($definition.properties != null)
  | $definition.properties
  | to_entries[]
  | select(.value | property_has_listmeta_type)
  | .key
];

# entry_blacklist_props takes a key/value pair representing a
# Kubernetes API object and its name, and returns a list of properties
# that are blacklisted.
#
# For example, `.key` might be
# `io.k8s.kubernetes.pkg.apis.apps.v1beta1.Deployment`, while `.value`
# woudl be the actual swagger specification of the `Deployment`
# object.
def entry_blacklist_props:
  .value as $definition
  | ($definition | has_status_prop) as $has_status_prop
  | ($definition | props_with_listmeta_type) as $props_with_listmeta_type
  | ($props_with_listmeta_type | length > 0) as $has_listmeta_type_props
  | if $has_status_prop and $has_listmeta_type_props
    then {(.key): (["status"] | .+ $props_with_listmeta_type)}
    elif $has_status_prop
    then {(.key): ["status"]}
    elif $has_listmeta_type_props
    then {(.key): $props_with_listmeta_type}
    else {(.key): []}
    end;

def create_blacklist:
  [ .definitions | to_entries[] | entry_blacklist_props ]
  | add
  | with_entries(select(.value | length > 0));


# Execute.
create_blacklist
