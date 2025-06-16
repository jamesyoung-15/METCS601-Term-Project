data "cloudflare_zones" "domain" {
  filter {
    name = var.domain_name
  }
}

resource "cloudflare_record" "site_cname" {
  zone_id = data.cloudflare_zones.domain.zones[0].id
  name    = "${var.subdomain}.${var.domain_name}"
  content   = aws_s3_bucket_website_configuration.website.website_endpoint
  type    = "CNAME"

  ttl     = 1
  proxied = true
}