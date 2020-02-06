resource "aws_organizations_account" "stg" {
  name  = "AWS Staging Account"
  email = "aws+stg@appist.io"
}

resource "aws_organizations_account" "prd" {
  name  = "AWS Production Account"
  email = "aws+prd@appist.io"
}

resource "aws_organizations_account" "staging" {
  name      = "AWS Staging Account"
  email     = "aws+staging@appist.io"
  role_name = "AWSCrossAccountRoleForTerraform"
}

resource "aws_organizations_account" "production" {
  name      = "AWS Production Account"
  email     = "aws+production@appist.io"
  role_name = "AWSCrossAccountRoleForTerraform"
}
