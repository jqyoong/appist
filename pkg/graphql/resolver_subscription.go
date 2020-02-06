package graphql

import (
	"context"
)

type subscriptionResolver struct{ *RootResolver }

func (r *subscriptionResolver) MessageChange(c context.Context) (<-chan *Message, error) {
	return make(chan *Message, 1), nil
}
