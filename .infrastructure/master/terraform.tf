terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "appist"

    workspaces {
      name = "appist-master"
    }
  }
}
