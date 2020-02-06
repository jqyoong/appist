resource "aws_ecr_repository" "appist" {
  name                 = "appist/appist"
  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
