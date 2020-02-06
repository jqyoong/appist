package app

import (
	"appist/pkg/graphql"

	gql "github.com/99designs/gqlgen/graphql"
)

func setupGraphQL() {
	Server.SetupGraphQL(
		"/graphql",
		graphql.NewExecutableSchema(graphql.Config{Resolvers: &graphql.RootResolver{}}),
		[]gql.HandlerExtension{},
	)
}
