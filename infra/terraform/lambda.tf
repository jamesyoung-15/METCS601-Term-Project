data "archive_file" "archive_upload_lambda" {
  type        = "zip"
  source_dir  = "../../lambda"
  output_path = "${path.module}/lambda.zip"
}

# Lambda function to upload image to S3
resource "aws_lambda_function" "upload_contact" {
  filename      = "lambda.zip"
  function_name = "cs601_upload_contact"
  role          = aws_iam_role.lambda_role.arn
  handler       = "upload_contact.lambda_handler"

  runtime     = "python3.12"
  timeout     = 30
  memory_size = 512
  publish = true

  environment {
    variables = {
      DYNAMODB_TABLE = "${aws_dynamodb_table.contacts.name}"
    }
  }

  depends_on = [aws_cloudwatch_log_group.cloudwatch_upload_lambda, aws_iam_role_policy_attachment.iam_lambda]
}

resource "aws_cloudwatch_log_group" "cloudwatch_upload_lambda" {
  name = "/aws/lambda/cs601_upload_contact"

  retention_in_days = 3
}

