#!/usr/bin/env python3
"""
AWS Cloud Resume Challenge Architecture Diagram Generator
Creates a visual representation of the serverless resume website architecture
"""

from diagrams import Diagram, Cluster, Edge
from diagrams.aws.compute import Lambda
from diagrams.aws.database import Dynamodb
from diagrams.aws.network import APIGateway, CloudFront, Route53
from diagrams.aws.storage import S3
from diagrams.aws.security import CertificateManager
from diagrams.aws.devtools import Codebuild
from diagrams.onprem.client import Users
from diagrams.onprem.vcs import Github
from diagrams.programming.language import Javascript, Python
from diagrams.aws.management import Cloudwatch

# Configure diagram
graph_attr = {
    "fontsize": "16",
    "bgcolor": "white",
    "splines": "ortho"
}

node_attr = {
    "fontsize": "12"
}

with Diagram("AWS Cloud Resume Challenge Architecture", 
             filename="images/cloud-resume-architecture", 
             show=False, 
             direction="LR",
             graph_attr=graph_attr,
             node_attr=node_attr):
    
    # Users
    users = Users("Visitors")
    
    with Cluster("DNS & CDN"):
        route53 = Route53("Route 53\n(aungmoemt.site)")
        acm = CertificateManager("SSL Certificate\n(ACM)")
        cloudfront = CloudFront("CloudFront\nDistribution")
    
    with Cluster("Frontend"):
        s3_website = S3("S3 Bucket\n(Static Website)")
        html_css = Javascript("HTML/CSS/JS\n(Resume)")
    
    with Cluster("Backend API"):
        api_gw = APIGateway("API Gateway\n(HTTP API)")
        lambda_func = Lambda("Lambda Function\n(Python)")
        dynamodb = Dynamodb("DynamoDB\n(Visitor Count)")
    
    with Cluster("Infrastructure as Code"):
        terraform = Python("Terraform\n(Infrastructure)")
    
    with Cluster("CI/CD Pipeline"):
        github = Github("GitHub\nRepository")
        frontend_cicd = Codebuild("Frontend\nCI/CD")
        backend_cicd = Codebuild("Backend\nCI/CD")
    
    with Cluster("Monitoring"):
        cloudwatch = Cloudwatch("CloudWatch\nLogs")
    
    # User flow
    users >> Edge(label="HTTPS") >> route53
    route53 >> cloudfront
    cloudfront >> Edge(label="OAC") >> s3_website
    s3_website >> html_css
    
    # SSL
    acm >> Edge(style="dashed", label="TLS") >> cloudfront
    
    # API flow
    html_css >> Edge(label="Fetch API\n/visitors") >> api_gw
    api_gw >> Edge(label="Invoke") >> lambda_func
    lambda_func >> Edge(label="Get/Update\ncount") >> dynamodb
    
    # CI/CD flows
    github >> Edge(label="website/**\nchanges") >> frontend_cicd
    github >> Edge(label="infra/**\nchanges") >> backend_cicd
    
    frontend_cicd >> Edge(label="S3 Sync") >> s3_website
    backend_cicd >> Edge(label="Deploy") >> terraform
    
    terraform >> Edge(label="Provision") >> [api_gw, lambda_func, dynamodb]
    
    # Monitoring
    lambda_func >> Edge(style="dashed") >> cloudwatch

print("Architecture diagram generated successfully!")
print("Output: images/cloud-resume-architecture.png")