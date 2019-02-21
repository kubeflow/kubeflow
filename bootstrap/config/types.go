package config

import (
)

type NameValue struct {
	Name  string `json:"name,omitempty"`
	Value string `json:"value,omitempty"`
}

type Parameters map[string][]NameValue

type Config struct {
	Repo string `json:"repo,omitempty"`
	Components []string `json:"components,omitempty"`
	ProtoParams Parameters `json:"protoParams,omitempty"`
	CompParams Parameters `json:"compParams,omityempty"`
	Platform string `json:"platform,omitempty"`
}
