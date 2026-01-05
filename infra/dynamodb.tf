resource "aws_dynamodb_table" "resume-visitors" {
  name         = "resume-visitors"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}
resource "aws_dynamodb_table_item" "visitor_count_item" {
  table_name = aws_dynamodb_table.resume-visitors.name
  hash_key   = "id"

  item = jsonencode({
    id    = { S = "1" }
    views = { N = "0" }
  })
}
