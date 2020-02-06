bootstrap:
	brew bundle
	asdf plugin-add golang || true
	asdf plugin-add nodejs || true
	asdf plugin-update --all
	asdf install
	asdf reshim golang
	asdf reshim nodejs

clean:
	rm -rf dist coverage.out appist **/*.log

codecheck:
	go vet ./...
	golint -set_exit_status ./...

install:
	go get -u golang.org/x/lint/golint
	go mod download
	npm i

test:
	mkdir -p tmp/coverage/backend
	go test -covermode=atomic -coverprofile=tmp/coverage/backend/cover.out -race -failfast ./...
	npm test

testcov:
	go tool cover -html=tmp/coverage/backend/cover.out

.PHONY: bootstrap clean codecheck install test testcov
