# configs
variable "aws_region" {
  description = "AWS region to deploy resources."
  type        = string
  default     = "us-east-1"
}

variable "aws_profile" {
  description = "AWS profile to use for deployment."
  type        = string
  default     = "Dev"
}

# Cloudflare variables
variable "cloudflare_api_token" {
  description = "Cloudflare API token for managing DNS"
  type        = string
  default     = ""
}

# Domain and subdomain
variable "domain_name" {
  description = "Domain name for the website (optional)"
  type        = string
  default     = "jyylab.com"
}

variable "subdomain" {
  description = "Subdomain for the website"
  type        = string
  default     = "termproject"
}

variable "cors_allowed_origins" {
  description = "Allowed origins for CORS"
  type        = list(string)
  default     = ["*"]
}
