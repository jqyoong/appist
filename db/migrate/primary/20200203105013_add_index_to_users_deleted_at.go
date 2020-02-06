package primary

import (
	"github.com/appist/appy"

	"appist/pkg/app"
)

func init() {
	db := app.DB("primary")

	if db != nil {
		db.RegisterMigration(
			// Up migration
			func(db *appy.DB) error {
				_, err := db.Exec(`CREATE INDEX CONCURRENTLY users_on_deleted_at ON users (deleted_at);`)
				return err
			},
			// Down migration
			func(db *appy.DB) error {
				_, err := db.Exec(`DROP INDEX users_on_deleted_at;`)
				return err
			},
		)
	}
}
