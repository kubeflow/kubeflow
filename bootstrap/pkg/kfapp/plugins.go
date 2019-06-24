package kfapp

// TODO(jlewi): We should be able to delete all this code now that we use PluginSpec and don't encode
// plugin parameters as key value pairs.
// Constants defining common plugin parameters

//const (
//	UsernameParamName   = "username"
//	PasswordParamName   = "password"
//)
//
//// GetUsername returns the username to use for basic auth.
//func GetBasicAuthUsername(s kfdefs.KfDefSpec) (string, error) {
//	d := &kfdefs.KfDef{
//		Spec: s,
//	}
//
//	pluginName := d.Spec.Platform
//	return d.GetPluginParameter(pluginName, UsernameParamName)
//}
//
//// GetPassword returns the password to use for basic auth.
//func GetBasicAuthPassword(s kfdefs.KfDefSpec) (string, error) {
//	d := &kfdefs.KfDef{
//		Spec: s,
//	}
//	pluginName := d.Spec.Platform
//	return d.GetPluginParameter(pluginName, PasswordParamName)
//}
