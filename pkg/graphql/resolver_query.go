package graphql

import "context"

type queryResolver struct{ *RootResolver }

func (r *queryResolver) Users(c context.Context) ([]*User, error) {
	panic("not implemented")
}
