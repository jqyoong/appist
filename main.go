package main

import (
	"appist/pkg/app"

	// Import mailer preview.
	_ "appist/pkg/mailer"

	// Import database migration/seed.
	_ "appist/db/migrate/primary"
)

func main() {
	// Run the application.
	app.Run()
}
