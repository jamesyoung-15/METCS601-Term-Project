# Portfolio Website Project Draft

## Project Overview

Responsive portfolio website built with Vite + React + TypeScript, using features learned in METCS601 such as dynamic routing, HTML5 APIs, CSS grids, etc.

### Project Requirements

- USe React
- Use Typescript/Javascript
- Use HTML concepts
- Use CSS, have responsive design
- Code hosted on Github, website can be hosted anywhere

### Project Features

- Topic is about me, features I will have:
  - bio
  - contact form
  - send contact form to DB through API
  - resume
  - photo gallery of hws
  - skills section
  - fetch my local time from API

## Tech Stack

### Frontend

- Framework: Vite + React + TypeScript + React Router
- Styling: CSS

### Infrastructure

- Hosting: AWS S3 (static hosting)
- CDN: Cloudflare
- IaC: Terraform for infrastructure management

### Architecture

- Visiting Site

```
User -> Cloudflare CDN -> S3 -> Static Website
```

- Sending form

```
Form -> API Gateway -> Lambda -> DynamoDB
```

## Site Structure & Routing

### Pages & Routes

- `/` - Home/Landing page with hero, skills preview, recent projects
- `/about` - Longer about me, education, experience timeline
- `/contact` - Contact form
- `/gallery` - Photo gallery of all homeworks
- `/resume` - Displays embedded PDF of resume

## Responsive Design Strategy

Probs going w/ desktop-first.

### Breakpoints

```css
@media (max-width 480px)   { /* smaller phones */ }
@media (max-width: 768px)  { /* larger phones or tablets */ }
@media (max-width: 1024px) { /* laptop screen or tablets */ }
```

## Project Directory Structure

```
├── frontend
│   ├── dist
│   │   ├── assets
│   │   │   ├── index-CSN3aFGo.js
│   │   │   └── index-CX0pfqWO.css
│   │   ├── data
│   │   │   └── projects.json
│   │   ├── images
│   │   │   ├── logos
│   │   │   └── projects
│   │   ├── index.html
│   │   ├── resume
│   │   │   └── resume.pdf
│   │   └── vite.svg
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── data
│   │   │   └── projects.json
│   │   ├── images
│   │   │   ├── logos
│   │   │   └── projects
│   │   ├── resume
│   │   │   └── resume.pdf
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── api
│   │   │   └── timeApi.ts
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── components
│   │   │   ├── CallToAction
│   │   │   │   ├── CallToAction.css
│   │   │   │   └── CallToAction.tsx
│   │   │   ├── DisplayTime
│   │   │   │   ├── DisplayTime.css
│   │   │   │   └── DisplayTime.tsx
│   │   │   ├── Footer
│   │   │   │   ├── Footer.css
│   │   │   │   └── Footer.tsx
│   │   │   └── Header
│   │   │       ├── Header.css
│   │   │       └── Header.tsx
│   │   ├── hooks
│   │   │   └── useTime.ts
│   │   ├── main.tsx
│   │   ├── pages
│   │   │   ├── About
│   │   │   │   ├── About.css
│   │   │   │   └── About.tsx
│   │   │   ├── Contact
│   │   │   │   ├── Contact.css
│   │   │   │   └── Contact.tsx
│   │   │   ├── Gallery
│   │   │   │   ├── Gallery.css
│   │   │   │   └── Gallery.tsx
│   │   │   ├── Home
│   │   │   │   ├── Home.css
│   │   │   │   └── Home.tsx
│   │   │   └── Resume
│   │   │       ├── Resume.css
│   │   │       └── Resume.tsx
│   │   ├── types
│   │   │   └── index.ts
│   │   └── vite-env.d.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── infra
│   ├── s3-sync.sh
│   └── terraform
│       ├── cloudflare.tf
│       ├── main.tf
│       ├── outputs.tf
│       ├── s3.tf
│       ├── terraform.tfstate
│       ├── terraform.tfstate.backup
│       ├── terraform.tfvars
│       └── variables.tf
├── metcs601_termproject_instructions.pdf
├── planning
│   └── Plan.md
└── README.md
```

## Deployment Strategy

- IaC w/ Terraform
- Bash scripts

## API + Backend

For sending contacts form, will use API Gateway + Lambda + DynamoDB as backend, front-end will send a simple post request with JSON format.

### DynamoDB Schema For Contact Forms

| Field | Type | Description |

|-------|------|-------------|

| `id` | String | UUID primary key (Partition Key) |

| `name` | String | Contact's name |

| `email` | String | Contact's email address |

| `subject` | String | Optional subject line |

| `message` | String | Message content |

| `timestamp` | Number | Unix timestamp when submitted |
| `responded` | Boolean  |  Whether I have responded or not (automatically set to false) |
