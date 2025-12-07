<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AI-Powered RFP Management System</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; background: #f9fafb; color: #111; padding: 20px;">

  <h1>🌐 AI-Powered RFP Management System</h1>

  <p>
    A full-stack intelligent procurement platform that enables users to create, send, receive,
    and compare RFPs (Request for Proposals) using AI and automated email processing.
  </p>

  <p>
    <strong>Tech Stack:</strong> React, Node.js, Express, MongoDB, LangChain, LangGraph, IMAP,
    Nodemailer, TailwindCSS
  </p>

  <hr />

  <h2>⚙️ Installation Steps</h2>

  <h3>Frontend</h3>
  <p>Packages installed:</p>
  <ul>
    <li>React</li>
    <li>Vite</li>
    <li>TailwindCSS</li>
    <li>React Router</li>
    <li>Icons</li>
  </ul>

  <h3>Backend</h3>
  <p>Includes:</p>
  <pre style="background: #eee; padding: 10px;">
npm install express dotenv cors mongodb @langchain/core 
@langchain/langgraph nodemailer mailparser imap
  </pre>

  <h2>🛠️ Required Installations</h2>
  <ul>
    <li>Node.js (v18+)</li>
    <li>Git</li>
    <li>MongoDB (Local or Atlas)</li>
    <li>Gmail account with App Password</li>
    <li>IMAP enabled in Gmail</li>
    <li>Google GenAI API Key</li>
  </ul>

  <h2>🔥 Key Features</h2>
  <ul>
    <li><strong>AI-Powered RFP Creation:</strong> Converts natural language into structured RFP JSON.</li>
    <li><strong>Vendor Management:</strong> Add and manage vendors.</li>
    <li><strong>Automated Email Sending:</strong> Sends RFP emails with unique tracking IDs.</li>
    <li><strong>Email Receiving:</strong> Reads vendor replies via IMAP + Cron.</li>
    <li><strong>AI-Based Proposal Parsing:</strong> Extracts pricing and terms from emails.</li>
    <li><strong>Proposal Comparison Dashboard:</strong> Side-by-side vendor comparison.</li>
    <li><strong>AI Recommendation Engine:</strong> Suggests best vendor.</li>
  </ul>

  <h2>🧠 End-to-End Workflow</h2>
  <pre style="background: #eee; padding: 10px;">
User
  |
  v
Create RFP (Frontend - React)
  |
  v
Send RFP to Vendors (Backend - Express + Nodemailer)
  |
  v
Vendor Receives Email
  |
  v
Vendor Replies via Email
  |
  v
Backend Reads Inbox (IMAP + Cron Job)
  |
  v
AI Extracts Proposal Data (LangChain + LangGraph)
  |
  v
Store Data (MongoDB)
  |
  v
Compare Proposals (Dashboard - React)
  |
  v
AI Recommendation
  |
  v
Final Vendor Selection by User
  </pre>

  <h2>🏛️ System Architecture</h2>
  <pre style="background: #eee; padding: 10px;">
User → Frontend (React + Tailwind)
     → Backend (Node.js + Express)
     → Database (MongoDB)
     → Email Send (Nodemailer SMTP)
     → Email Receive (IMAP Listener + Cron)
     → AI Parsing (LangChain + LangGraph + Google GenAI)
  </pre>

  <h2>📦 Clone the Repository</h2>
  <pre style="background: #eee; padding: 10px;">
git clone https://github.com/AshharRaza/AI-powered-RFP-Management-System/
  </pre>

  <h2>💡 Decisions & Assumptions</h2>
  <ul>
    <li>Email-based vendor communication</li>
    <li>RFP ID included in subject for reply tracking</li>
    <li>Cron job used for polling inbox</li>
    <li>Single-user system (as per assignment)</li>
    <li>Vendor reply formats handled using AI</li>
  </ul>

  <h2>🔮 Future Improvements</h2>
  <ul>
    <li>Multi-user authentication</li>
    <li>Role-based access control</li>
    <li>Real-time webhook-based email receiving</li>
    <li>Advanced OCR for scanned PDFs</li>
    <li>Vendor scoring engine</li>
    <li>Export proposals to PDF</li>
  </ul>

  <h2>🚀 Conclusion</h2>
  <p>
    This project demonstrates a complete, production-style AI-powered RFP management system.
    It showcases real-world problem solving using modern full-stack technologies, AI workflows,
    and automated email handling.
  </p>

  <p>Focus areas:</p>
  <ul>
    <li>Clean architecture</li>
    <li>Scalable API design</li>
    <li>Thoughtful AI integration</li>
    <li>User-centric interface</li>
    <li>Real-world automation patterns</li>
  </ul>

  <h2>📌 Author</h2>
  <p>
    <strong>Ashhar Siddiqui</strong><br />
    Full Stack Developer | AI Enthusiast
  </p>

</body>
</html>
