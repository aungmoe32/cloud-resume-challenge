resource "aws_apigatewayv2_api" "http_api" {
  name          = "cloudresume-http-api"
  protocol_type = "HTTP"
}
resource "aws_apigatewayv2_integration" "lambda" {
  api_id = aws_apigatewayv2_api.http_api.id

  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.myfunc.invoke_arn
  integration_method = "POST"

  payload_format_version = "2.0"
}
resource "aws_apigatewayv2_route" "counter" {
  api_id = aws_apigatewayv2_api.http_api.id

  route_key = "GET /visitors"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}
resource "aws_apigatewayv2_stage" "default" {
  api_id = aws_apigatewayv2_api.http_api.id
  name   = "$default"

  auto_deploy = true
}
output "api_url" {
  value = "${aws_apigatewayv2_api.http_api.api_endpoint}/visitors"
}
