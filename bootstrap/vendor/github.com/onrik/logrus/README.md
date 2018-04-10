# Hooks for [logrus](https://github.com/Sirupsen/logrus)

Example
```go
package main

import (
  "net/http"
  
  "github.com/onrik/logrus/filename"
  "github.com/onrik/logrus/sentry"
  log "github.com/sirupsen/logrus"
)

var (
  dsn = "http://60a0257d7b5a429a8838e5f2ba873ec9:cb785a64cd3649ea987a1f2f5fad5e82@example.com/1"
)

func main() {
  filenameHook := filename.NewHook()
  filenameHook.Field = "custom_source_field" // Customize source field name
  log.AddHook(filenameHook)
  
  sentryHook := sentry.NewHook(dsn, log.PanicLevel, log.FatalLevel, log.ErrorLevel)
  log.AddHook(sentryHook)
  
  request, err := http.NewRequest("GET", "http://example.com", nil)
  log.WithFields(log.Fields{
    "error": err,
    "sentry": sentry.NewSentry(
      sentry.WithHttpRequest(request),
      sentry.WithUser("22", "testuser", "test@example.com", "127.0.0.1"),
    ),
  }).Info("Request info")
}

```
