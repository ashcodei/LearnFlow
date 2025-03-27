
# University Learning Management System 

A modern, full-stack learning management system built with React, Express, and MongoDB. Features an AI-powered tutoring system and interactive course management.

![App Screenshot - Dashboard](https://docimg.replit.com/images/repls/repl-screenshot.png)

## 🚀 Features

- **Authentication & Authorization**
  - Secure login/signup system
  - Support for Google OAuth and Azure AD
  - Role-based access control (Students/Teachers)

- **Course Management**
  - Browse and enroll in courses
  - View course materials and assignments
  - Interactive course content delivery

- **AI-Powered Tutoring**
  - Real-time AI assistance
  - Personalized learning support
  - Chat-based interaction

- **Interactive Dashboard**
  - Course progress tracking
  - Upcoming assignments view
  - Calendar integration

- **Modern UI/UX**
  - Responsive design
  - Dark mode support
  - Accessible components

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Radix UI
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Authentication**: Passport.js
- **AI Integration**: OpenAI

## 🚦 Getting Started

1. Fork this template in Replit
2. Click the "Run" button to start the development server
3. The app will be available at the URL shown in the webview

## 💻 Development

To run the project locally in Replit:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start on port 5000.

## 🔐 Environment Variables

Required environment variables should be set in Replit's Secrets tab:

- `MONGODB_URI`: MongoDB connection string
- `SESSION_SECRET`: Secret for session management
- `OPENAI_API_KEY`: OpenAI API key for AI tutoring
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

## 📝 Project Structure

```
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared types and utilities
└── public/          # Static assets
```

## 🌐 Deployment

This project is configured for deployment on Replit. The deployment configuration is already set up in the `.replit` file.

To deploy:
1. Make your changes
2. Commit them
3. Go to the Deployment tab in Replit
4. Click "Deploy"

## 🤝 Contributing

Feel free to fork this template and make your own modifications. If you make something cool, consider sharing it with the Replit community!

## 📄 License

MIT License - feel free to use this project for your own learning and development!
