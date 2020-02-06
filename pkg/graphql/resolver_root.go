package graphql

// RootResolver is the entry for GraphQL resolving.
type RootResolver struct{}

// Mutation defines the GraphQL mutations in `pkg/graphql/resolver_mutation.go`.
func (r *RootResolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}

// Query defines the GraphQL queries in `pkg/graphql/resolver_query.go`.
func (r *RootResolver) Query() QueryResolver {
	return &queryResolver{r}
}

// Subscription defines the GraphQL queries in `pkg/graphql/resolver_subscription.go`.
func (r *RootResolver) Subscription() SubscriptionResolver {
	return &subscriptionResolver{r}
}
