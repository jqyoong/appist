package primary

import (
	"github.com/appist/appy"

	"appist/pkg/app"
)

func init() {
	db := app.DB("primary")

	if db != nil {
		db.RegisterMigrationTx(
			// Up migration
			func(db *appy.DBTx) error {
				_, err := db.Exec(`
					CREATE TABLE IF NOT EXISTS users (
						id SERIAL PRIMARY KEY,
						confirmation_token VARCHAR,
						confirmation_sent_at TIMESTAMP,
						confirmed_at TIMESTAMP,
						email VARCHAR UNIQUE NOT NULL,
						username VARCHAR UNIQUE NOT NULL,
						encrypted_password VARCHAR(128),
						failed_attempts INT4 NOT NULL DEFAULT 0,
						locked_at TIMESTAMP,
						unlock_token VARCHAR,
						reset_password_sent_at TIMESTAMP,
						reset_password_token VARCHAR,
						created_at TIMESTAMP NOT NULL,
						deleted_at TIMESTAMP,
						updated_at TIMESTAMP
					);
				`)
				return err
			},
			// Down migration
			func(db *appy.DBTx) error {
				_, err := db.Exec(`
					DROP TABLE IF EXISTS users
				`)
				return err
			},
		)
	}
}
