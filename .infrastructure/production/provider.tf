provider "aws" {
  region = "ap-southeast-1"

  assume_role {
    role_arn = "arn:aws:iam::871889295982:role/AWSCrossAccountRoleForTerraform"
  }
}
