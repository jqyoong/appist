package graphql

import (
	"context"
)

type mutationResolver struct{ *RootResolver }

func (r *mutationResolver) SignIn(c context.Context, input SignInInput) (*Session, error) {
	panic("not implemented")
}
