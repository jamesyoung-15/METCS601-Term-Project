# API Gateway
resource "aws_apigatewayv2_api" "api_gateway" {
  name          = "cs601-api-gateway"
  protocol_type = "HTTP"
  cors_configuration {
    allow_methods = ["POST"]
    allow_origins = ["*"]
    allow_headers = ["*"]
  }
  tags = {
    "application"       = "cs601"
    "terraform_managed" = "true"
  }
}

# API Gateway Stage
resource "aws_apigatewayv2_stage" "api_gateway_stage" {
  api_id      = aws_apigatewayv2_api.api_gateway.id
  name        = "dev"
  auto_deploy = true
  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.cloudwatch_api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}


# API Gateway Route
resource "aws_apigatewayv2_route" "api_gateway_route" {
  api_id    = aws_apigatewayv2_api.api_gateway.id
  route_key = "POST /upload"
  target    = "integrations/${aws_apigatewayv2_integration.api_integration_upload.id}"
}

# CloudWatch Log Group for API Gateway
resource "aws_cloudwatch_log_group" "cloudwatch_api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.api_gateway.name}"

  retention_in_days = 3
  tags = {
    "application"       = "cs601"
    "terraform_managed" = "true"
  }
}

# API Gateway Integration Lambda
resource "aws_apigatewayv2_integration" "api_integration_upload" {
  api_id = aws_apigatewayv2_api.api_gateway.id

  integration_uri    = aws_lambda_function.upload_contact.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}