package app

import (
	"net/http"

	"github.com/appist/appy"
)

func setupRoutes() {
	Server.GET("/welcome", func(c *appy.Context) {
		c.HTML(http.StatusOK, "welcome/index.html", nil)
	})
}
