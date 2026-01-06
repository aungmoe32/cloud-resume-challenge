terraform {
  backend "s3" {
    bucket         = "cloudresume-terraform-state"
    key            = "project.tfstate"
    region         = var.aws_region
    dynamodb_table = "cloudresume-terraform-state"
    encrypt        = true
  }
}
