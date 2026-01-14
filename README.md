# AWS Cloud Resume Challenge

A serverless resume website with visitor counter built on AWS. This project demonstrates cloud architecture, Infrastructure as Code, and CI/CD practices. [aungmoemt.site](https://aungmoemt.site)

![Cloud Resume Architecture](images/cloud-resume-architecture.png)

## Architecture

- **Frontend**: Static website on S3 with CloudFront
- **Backend**: Lambda function with DynamoDB
- **API**: API Gateway for visitor counter
- **Infrastructure**: Terraform for provisioning
- **CI/CD**: GitHub Actions for deployment

## Project Structure

```
├── infra/                  # Terraform code
│   ├── lambda/             # Python Lambda function
│   └── *.tf               # Infrastructure definitions
└── website/                # Static website files
```

## Features

- Responsive resume website
- Real-time visitor counter
- HTTPS with custom domain
- Automated testing and deployment
- Serverless architecture

## Deployment

The project uses GitHub Actions for CI/CD:

- **Backend**: Deploys infrastructure on `infra/**` changes
- **Frontend**: Syncs website on `website/**` changes

## Blog

Read the complete implementation guide: [AWS Cloud Resume Challenge](https://aungmoemt.vercel.app/blog/aws-cloud-resume-challenge)
