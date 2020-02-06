package mailer

import (
	"appist/pkg/app"

	"github.com/appist/appy"
)

func init() {
	verifyAccountMailPreview()
	resetPasswordMailPreview()
}

func verifyAccountMailPreview() {
	mail := newMailPreview()
	mail.Subject = "mailers.user.verifyAccount.subject"
	mail.Template = "mailers/user/verify_account"
	mail.TemplateData = appy.H{
		"actionURL":    "https://appist.io/reset_password",
		"appName":      "Appist",
		"appURL":       "https://appist.io",
		"supportEmail": "support@appist.io",
		"username":     "cayter",
	}
	app.Mailer.AddPreview(mail)
}

func resetPasswordMailPreview() {
	mail := newMailPreview()
	mail.Subject = "mailers.user.resetPassword.subject"
	mail.Template = "mailers/user/reset_password"
	mail.TemplateData = appy.H{
		"actionURL":    "https://appist.io/reset_password",
		"appName":      "Appist",
		"appURL":       "https://appist.io",
		"supportEmail": "support@appist.io",
		"username":     "cayter",
	}
	app.Mailer.AddPreview(mail)
}
