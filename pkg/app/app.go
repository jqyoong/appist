package app

import (
	"appist/pkg/helper"

	"github.com/appist/appy"
)

type (
	cfg struct {
		AppName string `env:"APP_NAME" envDefault:"appist"`
	}

	config struct {
		*appy.Config
		*cfg
	}
)

var (
	app *appy.App

	// Command is the application root command.
	Command *appy.Command

	// Config is the application config combined with appy's config.
	Config *config

	// DBManager is the application database manager.
	DBManager *appy.DBManager

	// I18n is the application I18n provider.
	I18n *appy.I18n

	// Mailer is the application mailer.
	Mailer *appy.Mailer

	// Logger is the application logger.
	Logger *appy.Logger

	// Server is the application server.
	Server *appy.Server

	// Support contains the helpful functions.
	Support appy.Supporter
)

func init() {
	app = appy.NewApp(appy.NewAsset(asset, nil), helper.New())

	// Setup the application's root command.
	Command = app.Command()
	Command.Short = "A single platform to deliver your app continuously on AWS."

	// Setup the application's database manager.
	DBManager = app.DBManager()

	// Setup the application's I18n provider.
	I18n = app.I18n()

	// Setup the application's logger.
	Logger = app.Logger()

	// Setup the application's mailer.
	Mailer = app.Mailer()

	// Setup the application's support.
	Support = app.Support()

	// Setup the application's config.
	c := &cfg{}
	err := Support.ParseEnv(c)
	if err != nil {
		Logger.Fatal(err)
	}

	Config = &config{
		app.Config(),
		c,
	}

	// Setup the application's server and routes.
	Server = app.Server()
	setupMiddleware()
	setupRoutes()
	setupGraphQL()
}

// DB is a shortcut to app.DBManager.DB().
func DB(name string) *appy.DB {
	return app.DBManager().DB(name)
}

// Run starts running the application.
func Run() {
	app.Run()
}
