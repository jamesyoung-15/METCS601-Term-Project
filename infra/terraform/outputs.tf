output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.site_bucket.bucket
}

output "s3_website_endpoint" {
  description = "S3 website endpoint"
  value       = aws_s3_bucket_website_configuration.website.website_endpoint
}

output "api_gateway_url" {
  description = "URL of the API Gateway"
  value       = aws_apigatewayv2_stage.api_gateway_stage.invoke_url
}