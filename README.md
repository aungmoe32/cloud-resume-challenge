# AWS Cloud Resume Challenge

A serverless resume website with visitor counter built on AWS. This project demonstrates cloud architecture, Infrastructure as Code, and CI/CD practices.

![Cloud Resume Architecture](images/cloud-resume-architecture.png)

## Architecture

- **Frontend**: Static website on S3 with CloudFront
- **Backend**: Lambda function with DynamoDB  
- **API**: API Gateway for visitor counter
- **Infrastructure**: Terraform for provisioning
- **CI/CD**: GitHub Actions for deployment

## Project Structure

```
├── blog/                    # Project documentation
│   ├── blog-part-1.md      # Part 1: Foundation setup
│   ├── blog-part-2.md      # Part 2: Backend implementation  
│   ├── blog-part-3.md      # Part 3: CI/CD deployment
│   └── whatIdo.txt         # Implementation checklist
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

The blog folder contains detailed documentation:
- Part 1: Setting up foundation (HTML, CSS, S3, CloudFront, HTTPS)
- Part 2: Backend implementation (Lambda, DynamoDB, API Gateway)
- Part 3: CI/CD pipeline and deployment automation

## Contact

**Aung Moe Myint Thu**
- Email: aungmoemyintthu@gmail.com
- GitHub: [aungmoe32](https://github.com/aungmoe32)
- Website: [aungmoemt.vercel.app](https://aungmoemt.vercel.app)