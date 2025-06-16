# Portfolio Website Project Draft

## Project Overview

Responsive portfolio website built with Vite + React + TypeScript, featuring dynamic routing, w/ API and database integration.

### Project Requirements

- USe React
- Use Typescript/Javascript
- Use HTML concepts
- Use CSS, have responsive design
- Code hosted on Github, website can be hosted anywhere

### Project Features

- Topic is about me, features I will have:
  - home page
  - bio
  - contact form
  - resume
  - photo gallery of hws
  - skills section

## Tech Stack

### Frontend

- Framework: Vite + React + TypeScript + React Router
- Styling: CSS

### Backend & Infrastructure

- Database: AWS DynamoDB
- API: AWS API Gateway + Lambda functions
- Hosting: AWS S3 (static hosting)
- CDN: Cloudflare
- IaC: Terraform for infrastructure management

### AWS Architecture

```
User -> Cloudflare CDN -> S3 Static Website <-> API Gateway <-> Lambda Functions <-> DynamoDB
```

## Site Structure & Routing

### Pages & Routes

- `/` - Home/Landing page with hero, skills preview, recent projects
- `/about` - Longer about me, education, experience timeline
- `/contact` - Contact form
- `/gallery` - Photo gallery of all homeworks
- `/resume` - Displays embedded PDF of resume

## Database Schema (DynamoDB)

### Table: `portfolio-analytics`
```typescript
interface PageView {
  id: string;           // Partition Key
  page: string;
  timestamp: number;
  uniqueVisitors: number;
  totalViews: number;
}
```

## API Endpoints (Lambda Functions)

### Contact Form

- POST `/api/contact` - Submit contact form with signature

### Analytics

- POST `/api/analytics/view` - Track page view
- GET `/api/analytics/stats` - Get view statistics

## Responsive Design Strategy

Probs going w/ desktop-first.

### Breakpoints

```css
@media (max-width 480px)   { /* smaller phones */ }
@media (max-width: 768px)  { /* larger phones or tablets */ }
@media (max-width: 1024px) { /* laptop screen or tablets */ }
```

## File Structure

```
portfolio-website/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Navigation.tsx
│   │   │   ├── Canvas/
│   │   │   │   ├── SkillsChart.tsx
│   │   │   │   └── SignaturePad.tsx
│   │   │   ├── Comments/
│   │   │   │   ├── CommentList.tsx
│   │   │   │   └── CommentForm.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Gallery.tsx
│   │   │   └── Contact.tsx
│   │   ├── hooks/
│   │   │   ├── useCanvas.ts
│   │   │   ├── useApi.ts
│   │   │   └── useAnalytics.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── styles/
│   │       ├── global.css
│   │       ├── components/
│   │       └── pages/
│   ├── public/
│   └── package.json
├── backend/
│   ├── lambda/
│   │   ├── comments/
│   │   ├── contact/
│   │   └── analytics/
│   └── package.json
├── infrastructure/
│   ├── terraform/
│   │   ├── main.tf
│   │   ├── dynamodb.tf
│   │   ├── lambda.tf
│   │   ├── api-gateway.tf
│   │   ├── s3.tf
│   │   └── variables.tf
└── README.md
```


## Deployment Strategy

- IaC w/ Terraform
