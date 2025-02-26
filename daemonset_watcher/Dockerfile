# 使用 golang build image 建構二進位檔
FROM golang AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o daemonset-watcher main.go

FROM golang
COPY --from=builder /app/daemonset-watcher /daemonset-watcher
ENTRYPOINT ["/daemonset-watcher"]