package sentry

import (
	"fmt"
	"net/http"

	"github.com/getsentry/raven-go"
	"github.com/sirupsen/logrus"
)

var (
	levelsMap = map[logrus.Level]raven.Severity{
		logrus.PanicLevel: raven.FATAL,
		logrus.FatalLevel: raven.FATAL,
		logrus.ErrorLevel: raven.ERROR,
		logrus.WarnLevel:  raven.WARNING,
		logrus.InfoLevel:  raven.INFO,
		logrus.DebugLevel: raven.DEBUG,
	}
)

const (
	SentryField = "sentry"
)

type Hook struct {
	client      *raven.Client
	levels      []logrus.Level
	Async       bool
	SentryField string
}

func (hook *Hook) Levels() []logrus.Level {
	return hook.levels
}

func (hook *Hook) Fire(entry *logrus.Entry) error {
	culprit := ""
	interfaces := []raven.Interface{
		&raven.Message{Message: entry.Message},
	}
	if err, ok := entry.Data[logrus.ErrorKey]; ok && err != nil {
		culprit = fmt.Sprintf("%s", err)
		entry.Data[logrus.ErrorKey] = culprit
	}

	if intfs, ok := entry.Data[hook.SentryField].([]raven.Interface); ok {
		interfaces = append(interfaces, intfs...)
		delete(entry.Data, hook.SentryField)
	}

	packet := &raven.Packet{
		Message:    entry.Message,
		Level:      levelsMap[entry.Level],
		Interfaces: interfaces,
		Extra:      entry.Data,
		Culprit:    culprit,
	}

	_, ch := hook.client.Capture(packet, map[string]string{})
	if !hook.Async || entry.Level == logrus.FatalLevel || entry.Level == logrus.PanicLevel {
		return <-ch
	}

	return nil
}

func (hook *Hook) SetTags(tags map[string]string) {
	hook.client.Tags = tags
}

func (hook *Hook) AddTag(key, value string) {
	hook.client.Tags[key] = value
}

func (hook *Hook) SetRelease(release string) {
	hook.client.SetRelease(release)
}

func (hook *Hook) SetEnvironment(environment string) {
	hook.client.SetEnvironment(environment)
}

func NewHook(dsn string, levels ...logrus.Level) *Hook {
	client, err := raven.New(dsn)
	if err != nil {
		logrus.WithError(err).Error("Set DSN error")
	}

	client.Tags = map[string]string{}

	hook := Hook{
		client:      client,
		levels:      levels,
		Async:       true,
		SentryField: SentryField,
	}
	if len(hook.levels) == 0 {
		hook.levels = logrus.AllLevels
	}

	return &hook
}

func NewSentry(interfaces ...raven.Interface) []raven.Interface {
	return interfaces
}

func WithStacktrace(skip int, context int, appPackagePrefixes []string) *raven.Stacktrace {
	return raven.NewStacktrace(skip, context, appPackagePrefixes)
}

func WithHttpRequest(request *http.Request) *raven.Http {
	return raven.NewHttp(request)
}

func WithException(err error, stacktrace *raven.Stacktrace) *raven.Exception {
	return raven.NewException(err, stacktrace)
}

func WithUser(id, username, email, ip string) *raven.User {
	return &raven.User{
		ID:       id,
		Username: username,
		Email:    email,
		IP:       ip,
	}
}
