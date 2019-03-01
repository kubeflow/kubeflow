package config

import ()

type NameValue struct {
	Name  string `json:"name,omitempty"`
	Value string `json:"value,omitempty"`
}

type Parameters map[string][]NameValue

// Default components configuration definitions.
type Config struct {
	// Name of repository.
	Repo        string     `json:"repo,omitempty"`
	// List of default components.
	Components  []string   `json:"components,omitempty"`
	// List of default packages.
	Packages    []string   `json:"packages,omitempty"`
	// Parameters to be passed into component prototypes.
	ProtoParams Parameters `json:"protoParams,omitempty"`
	// Parameters to be set to components using ks param set.
	CompParams  Parameters `json:"compParams,omityempty"`
	// Platform type.
	Platform    string     `json:"platform,omitempty"`
}
