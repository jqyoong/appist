package mailer

import "github.com/appist/appy"

func newMailPreview() appy.Mail {
	return appy.Mail{
		From:    "support@appist.io",
		To:      []string{"jane@appist.io"},
		ReplyTo: []string{"john@appist.io", "mary@appist.io"},
		Cc:      []string{"elaine@appist.io", "kerry@appist.io"},
		Bcc:     []string{"joel@appist.io", "daniel@appist.io"},
	}
}
