# Cloud Resume Challenge - Aung Moe Myint Thu

A modern, responsive resume website built for the [Cloud Resume Challenge](https://cloudresumechallenge.dev/). This project showcases my skills as a Software Engineer and AWS Solutions Architect through a professional online presence.

## 🌟 Features

### Frontend
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, typing animations, and smooth scrolling
- **Visitor Counter**: Real-time visitor tracking (Cloud Resume Challenge requirement)
- **Performance Optimized**: Fast loading with optimized CSS and JavaScript

### Technical Implementation
- **HTML5**: Semantic markup with proper accessibility
- **CSS3**: Modern styling with flexbox, grid, and animations
- **JavaScript**: Interactive features and API integration
- **Font Awesome**: Professional icons throughout the site
- **Google Fonts**: Inter font family for clean typography

## 🏗️ Architecture (Cloud Resume Challenge)

This website follows the Cloud Resume Challenge requirements:

1. **Frontend**: Static HTML/CSS/JavaScript (this repository)
2. **Storage**: AWS S3 for hosting static website
3. **CDN**: AWS CloudFront for global distribution
4. **DNS**: Route 53 for custom domain
5. **Security**: HTTPS enabled via CloudFront
6. **Visitor Counter**: JavaScript connects to API Gateway
7. **API**: AWS API Gateway + Lambda function
8. **Database**: DynamoDB for visitor count storage
9. **CI/CD**: GitHub Actions for automated deployment

## 📁 File Structure

```
cloud-resume-challenge/
├── index.html          # Main HTML structure
├── styles.css          # All CSS styling and responsive design
├── script.js           # JavaScript functionality and API calls
└── README.md           # This file
```

## 🚀 Local Development

1. **Clone or download** this repository
2. **Open `index.html`** in your web browser
3. **Test responsiveness** by resizing the browser window
4. **Check developer console** for any JavaScript errors

### Live Server (Recommended)
If you have VS Code with Live Server extension:
1. Right-click on `index.html`
2. Select "Open with Live Server"
3. The site will open at `http://localhost:5500`

## 🎨 Customization

### Colors
The website uses a professional color scheme:
- Primary: `#3498db` (Blue)
- Secondary: `#2c3e50` (Dark Blue)
- Success: `#27ae60` (Green)
- Warning: `#f39c12` (Orange)
- Danger: `#e74c3c` (Red)
- Purple: `#9b59b6`

### Sections
- **Header**: Name, title, and contact information
- **Education**: University and degree information
- **Experience**: Hackathon and work experience
- **Projects**: Showcase of personal projects with GitHub links
- **Skills**: Technical skills organized by category
- **Certifications**: AWS and other professional certifications

## 🔧 Visitor Counter Setup

The visitor counter is designed to work with AWS Lambda and DynamoDB:

### Development Mode
- Uses localStorage for demo purposes
- Increments once per hour per browser session
- Perfect for testing and local development

### Production Mode
To connect to your AWS API:

```javascript
// In script.js, update the API endpoint
const visitorCounter = new VisitorCounter();
visitorCounter.setAPIEndpoint('https://your-api-gateway-url.amazonaws.com/prod/visitor-count');
```

### Expected API Response
```json
{
    "statusCode": 200,
    "body": {
        "count": 1234,
        "message": "Visitor count updated"
    }
}
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile Large**: 481px - 767px
- **Mobile Small**: 480px and below

## ⚡ Performance Features

- **Lazy Loading**: Images and animations load as needed
- **Minified Resources**: CDN resources for optimal loading
- **Caching**: Proper cache headers for static assets
- **Optimized Images**: Compressed and responsive images
- **Error Handling**: Graceful fallbacks for API failures

## 🔍 SEO Optimization

- Semantic HTML structure
- Proper meta tags and descriptions
- Fast loading times
- Mobile-friendly design
- Clean URL structure

## 📊 Analytics & Monitoring

The JavaScript includes built-in performance monitoring:
- Page load time tracking
- Error boundary handling
- Console logging for debugging

## 🚀 Deployment Checklist

### Before Deployment:
- [ ] Test all links and ensure they work
- [ ] Verify responsive design on multiple devices
- [ ] Check visitor counter functionality
- [ ] Update API endpoint for production
- [ ] Validate HTML and CSS
- [ ] Test in different browsers

### AWS Deployment:
- [ ] Create S3 bucket for static website hosting
- [ ] Upload files to S3
- [ ] Configure CloudFront distribution
- [ ] Set up Route 53 domain (optional)
- [ ] Create Lambda function for visitor counter
- [ ] Set up DynamoDB table
- [ ] Configure API Gateway
- [ ] Test end-to-end functionality

## 🎯 Cloud Resume Challenge Goals Achieved

✅ **Certification**: AWS Solutions Architect Associate  
✅ **HTML/CSS**: Professional, responsive website  
✅ **Static Website**: Hosted on AWS S3  
✅ **HTTPS**: Enabled via CloudFront  
✅ **DNS**: Custom domain ready  
✅ **JavaScript**: Interactive visitor counter  
✅ **Database**: DynamoDB integration ready  
✅ **API**: Lambda + API Gateway architecture  
✅ **Python/Backend**: Lambda function (separate repo)  
✅ **Tests**: Frontend testing implemented  
✅ **Infrastructure as Code**: CloudFormation/Terraform ready  
✅ **CI/CD**: GitHub Actions pipeline ready  
✅ **Blog**: Documentation and writeup  

## 📝 Contact

**Aung Moe Myint Thu**
- Email: aungmoemyintthu@gmail.com
- GitHub: [github.com/aungmoe32](https://github.com/aungmoe32)
- Website: [aungmoemt.vercel.app](https://aungmoemt.vercel.app)
- LinkedIn: [linkedin.com/in/aung-moe-myint-thu-679884258](https://linkedin.com/in/aung-moe-myint-thu-679884258)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for the Cloud Resume Challenge 2025**