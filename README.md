# My Personal Portfolio

Welcome to my personal portfolio website! This is a modern, responsive web application built with Vue.js that showcases my projects, skills, and professional experience.

## 🚀 About

This portfolio serves as a central hub to display my work and expertise in full-stack web development. It features a clean, modern design with smooth interactions and seamless navigation, enhanced with an intelligent AI chatbot powered by Claude.

## 🛠️ Tech Stack

- **Vue.js** (64.5%) - Progressive JavaScript framework for building the UI
- **JavaScript** (30.5%) - Core scripting language
- **TypeScript** (2%) - Type safety for improved code quality
- **CSS** (3%) - Styling and responsive design
- **Claude AI** - Intelligent conversational AI for the personal chatbot
- **Cloudflare** - Deployment and edge computing platform

## 📋 Features

- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Optimized for speed and smooth user experience
- 🎨 **Modern UI** - Clean, contemporary design with engaging interactions
- 📁 **Project Showcase** - Detailed project descriptions and demonstrations
- 💬 **Contact Section** - Easy way to get in touch
- 🤖 **AI Chatbot** - Personal AI assistant powered by Claude for real-time interactions

## 🤖 AI Chatbot Integration

This portfolio features an intelligent personal AI chatbot built with Claude API that enhances user engagement:

### How It Works
- **Claude API Integration** - Uses Claude tokens to power natural language conversations
- **Real-time Responses** - Provides instant, intelligent responses to visitor inquiries
- **Context-Aware** - Understands questions about your projects, skills, and experience
- **Seamless UX** - Integrated directly into the portfolio UI for smooth interactions

### Claude Configuration
- Authentication via Claude API tokens (stored securely in environment variables)
- Optimized prompt engineering for portfolio-specific assistance
- Token management for efficient API usage and cost optimization

## 🌐 Deployment on Cloudflare

The portfolio is deployed and hosted on **Cloudflare**, taking advantage of:

### Benefits
- **Global CDN** - Content delivered from edge servers worldwide for optimal performance
- **SSL/TLS Security** - Automatic HTTPS encryption for secure data transmission
- **DDoS Protection** - Built-in security against distributed denial-of-service attacks
- **Fast Load Times** - Edge caching and optimization for lightning-fast page loads
- **Serverless Functions** - Cloudflare Workers for backend operations and API integration

### Deployment Setup
1. Repository connected to Cloudflare Pages
2. Automatic builds and deployments on push to main branch
3. Environment variables configured for Claude API tokens
4. Custom domain routing through Cloudflare

## 🏃 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Claude API key (for AI chatbot functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rad-tech-spec/rad-tech-spec.github.io.git
cd rad-tech-spec.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create a .env file in the root directory
VITE_CLAUDE_API_KEY=your_claude_api_key_here
```

4. Start the development server:
```bash
npm run serve
```

5. Open your browser and navigate to `http://localhost:8080`

## 🏗️ Building for Production

```bash
npm run build
```

This generates an optimized production build in the `dist/` directory, ready for deployment to Cloudflare.

## 📁 Project Structure

```
src/
├── components/     # Vue components (including AI chatbot)
├── views/          # Page views
├── assets/         # Static assets (images, fonts)
├── services/       # API services (Claude integration)
└── App.vue         # Root component
```

## 🤝 Contributing

While this is a personal portfolio, suggestions and feedback are always welcome! Feel free to open an issue or reach out.

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

- **Email**: [eshghirad101@gmail.com]
- **LinkedIn**: [Rad Eshghi](www.linkedin.com/in/rad-eshghi)
- **GitHub**: [@Rad-tech-spec](https://github.com/Rad-tech-spec)

---

**Visit my portfolio**: [rad-tech-spec.github.io](https://rad-tech-spec.github.io)
