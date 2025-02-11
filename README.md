#### email-writer
### Smart Email Assistant Project using Spring Boot and Spring AI

## AI Email Reply Chrome Extension

This project is a Chrome extension that integrates with a Spring Boot backend and a React-based UI to generate AI-powered email replies in Gmail. The extension adds an "AI Reply" button with a tone selection dropdown in the Gmail compose window, allowing users to generate context-aware responses in various tones.

# Features

AI-Powered Replies: Automatically generate professional, casual, friendly, or formal replies.

Tone Selection: Choose from multiple tones to match your communication style.

Seamless Gmail Integration: The extension detects Gmail's compose window and injects the AI Reply button for ease of use.

# Tech Stack

Frontend (Extension): JavaScript for content scripts to interact with Gmail's DOM.

Backend: Spring Boot API for processing and generating AI responses.

UI: React-based web interface for additional customization and settings.

# Prerequisites

- Google Chrome

- Node.js and npm

- Java 11+

- Maven (for Spring Boot)

# Installation

1. Clone the Repository
```
   git clone https://github.com/your-repo/ai-email-reply-extension.git
   cd ai-email-reply-extension
```
2. Backend Setup (Spring Boot)

   Navigate to the backend directory:
```
   cd backend

   Build and run the Spring Boot application:

   ./mvnw spring-boot:run
```
   The API will be available at http://localhost:8080/api/email/generate.

3. Frontend Setup (React)

   Navigate to the frontend directory:
```
   cd frontend
```
   Install dependencies and start the development server:
```
   npm install
   npm start
```
   The UI will be available at http://localhost:3000.

4. Chrome Extension Setup

- Navigate to the extension directory.

- Open Google Chrome and go to chrome://extensions/.
        
- Enable Developer Mode (toggle at the top-right corner).
        
- Click Load unpacked and select the extension folder.
        
- The AI Reply button should now appear in your Gmail compose window.



# Acknowledgments

- OpenAI for AI models.

- Google for Gmail API and integration guidance.

- EmbarkX YouTube Channel for tutorials and guidance on building Chrome extensions.
