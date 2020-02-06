provider "aws" {
  region = "ap-southeast-1"

  assume_role {
    role_arn = "arn:aws:iam::627802198023:role/AWSCrossAccountRoleForTerraform"
  }
}
