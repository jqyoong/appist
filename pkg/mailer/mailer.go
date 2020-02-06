package mailer

import "github.com/appist/appy"

func newMail() appy.Mail {
	return appy.Mail{
		From: "support@appist.io",
	}
}
