
data "aws_iam_policy_document" "access_visitors_table_policy_doc" {
  statement {
    effect = "Allow"
    actions = [
      "dynamodb:PutItem",
      "dynamodb:GetItem",
      "dynamodb:UpdateItem"
    ]
    resources = [aws_dynamodb_table.resume-visitors.arn]
  }
}

resource "aws_iam_policy" "access_visitors_table_policy" {
  name        = "AccessVisitorsTablePolicy"
  description = "Allows access to the resume-visitors DynamoDB table"
  policy      = data.aws_iam_policy_document.access_visitors_table_policy_doc.json
}


data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"
      # The ARN of the entity that is allowed to assume this role 
      identifiers = ["lambda.amazonaws.com"]

    }
  }
}

resource "aws_iam_role" "iam_role_for_lambda" {
  name               = "iam-role-for-lambda"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json

}
resource "aws_iam_role_policy_attachment" "attach_iam_policy_to_iam_role" {
  role       = aws_iam_role.iam_role_for_lambda.name
  policy_arn = aws_iam_policy.access_visitors_table_policy.arn

}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.iam_role_for_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/${aws_lambda_function.myfunc.function_name}"
  retention_in_days = 7 # optional
}

# lambda permission for apigateway to invoke the lambda function
resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowHttpApiInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.myfunc.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*/visitors"
}

