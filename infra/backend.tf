terraform {
  backend "s3" {
    bucket         = "cloudresume-terraform-state"
    key            = "project.tfstate"
    region         = "ap-southeast-1"
    dynamodb_table = "cloudresume-terraform-state"
    encrypt        = true
  }
}
