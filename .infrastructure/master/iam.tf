resource "aws_iam_group" "devops_engineers" {
  name = "devops_engineers"
}

resource "aws_iam_group_policy_attachment" "devops_engineers_ecr_full_access" {
  group      = aws_iam_group.devops_engineers.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess"
}

resource "aws_iam_group_policy_attachment" "devops_engineers_ecs_full_access" {
  group      = aws_iam_group.devops_engineers.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonECS_FullAccess"
}

resource "aws_iam_group_policy_attachment" "devops_engineers_iam_full_access" {
  group      = aws_iam_group.devops_engineers.name
  policy_arn = "arn:aws:iam::aws:policy/IAMFullAccess"
}

resource "aws_iam_group_policy_attachment" "devops_engineers_orgs_full_access" {
  group      = aws_iam_group.devops_engineers.name
  policy_arn = "arn:aws:iam::aws:policy/AWSOrganizationsFullAccess"
}
