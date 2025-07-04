# METCS601 Term Project

Term project for METCS601 where I built a responsive portfolio website built with Vite + React + TypeScript, using features learned in METCS601 such as dynamic routing, HTML5 APIs, CSS grids, etc.

[Link to project](https://termproject.jyylab.com).

## Tech Stack

### Frontend

- Framework: Vite + React
- Styling: CSS
- Language: Typescript

### API + Backend

- API Gateway
- Lambda (Python)
- DynamoDB

### Infrastructure

- Hosting: AWS S3 (static hosting)
- CDN: Cloudflare
- IaC: Terraform for infrastructure management

### Simple Architecture

- Viewing frontend

```
User -> Cloudflare CDN -> S3 -> Static Website
```

- Submitting form

```
Form -> API Gateway -> Lambda -> DynamoDB
```

## Pages/Routes

- `/` - Home/landing page with hero, my skills, recent projects/homework
- `/about` - Longer about me, education, experience timeline
- `/contact` - Contact form
- `/gallery` - Photo gallery of all homeworks
- `/resume` - Displays embedded PDF of resume

## Project Features

- React w/ Typescript
- Responsive design using CSS features like grid
- Fetches local time from API
- Posts contact form to backend through API
- Responsive image gallery to showcase previous homeworks
- Embedded PDF resume using HTML5 `iframe`
- React routing w/ 5 pages

## My Dev Setup

To setup frontend:

```bash
cd frontend
npm install
npm run dev
```

To setup infra, dump Cloudflare API key in hidden tfvars file

``` bash
cd infra/terraform
terraform init
terraform plan -var-file=terraform.tfvars
terraform apply -var-file=terraform.tfvars
```

Spin down infra w/ `terraform destroy -var-file=terraform.tfvars`

To build and sync changes to S3

``` bash
cd frontend
npm run build
aws s3 sync ./dist s3://termproject.jyylab.com --delete
```
