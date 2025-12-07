🌐 AI-Powered RFP Management System

A full-stack intelligent procurement platform that enables users to create, send, receive, and compare RFPs (Request for Proposals) using AI + automated email processing.

Built using React, Node.js, Express, MongoDB, LangChain, LangGraph, IMAP, Nodemailer, TailwindCSS.

Install Step:

 Frontend :Packages installed: React Vite TailwindCSS React Router Icons

  Backend: Includes:
npm i express dotenv cors mongodb @langchain @langchain/langgraph nodemailer mailparser @langchain/cors imap

Required Installations:
- Node.js (v18+)
- Git
- MongoDB (Local or Atlas)
- Gmail account (with App Password)
- Enable IMAP in Gmail
- Google GenAI API Key

🔥 Key Features
✅ 1. AI-Powered RFP Creation

Convert natural language input into structured RFP JSON using LangChain & GenAI.

✅ 2. Vendor Management

Add/edit vendors and choose vendors for an RFP.

✅ 3. Automated Email Sending (Nodemailer)

RFP emails are sent with unique IDs to track replies.

✅ 4. Email Receiving (IMAP + Cron Job)

Backend continuously checks inbox and fetches new vendor replies.

✅ 5. AI-Based Proposal Parsing

Extracts pricing, delivery, warranty, payment terms, etc. from messy vendor emails.

✅ 6. Proposal Comparison Dashboard

Side-by-side comparison of vendor proposals.

✅ 7. AI Recommendation Engine

Suggests the best vendor based on cost, delivery, warranty, and completeness.

🧠 End-to-End System Workflow

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


🏛️ System Architecture
User → Frontend (React + Tailwind) 
     → Backend (Node.js + Express)
     → Database (MongoDB)
     → Email Send (Nodemailer SMTP)
     → Email Receive (IMAP listener + Cron)
     → AI Parsing (LangChain + LangGraph + Google GenAI)


✔️ 1. Clone the Repository
git clone <https://github.com/AshharRaza/AI-powered-RFP-Management-System/>

💡 Decisions & Assumptions

Email-based vendor communication

RFP-ID included in the subject for reply identification

Cron job used for polling inbox

Single-user system (as per assignment)

Vendor reply formats vary, handled via AI

🔮 Future Improvements

Multi-user authentication

Role-based access control

Real-time Webhook-based email receiving

Advanced OCR for scanned PDFs

Vendor scoring engine

Export proposal to PDF

🚀 Conclusion

This project demonstrates a complete, production-style implementation of an AI-powered RFP management system.
It showcases real-world problem solving using modern full-stack technologies, AI workflows, and automated email handling.

Through this project, I focused on:

Clean architecture

Scalable API design

Thoughtful AI integration

User-centric interface

Real-world automation patterns

This system can be extended further to support multi-user environments, real-time notifications, and enterprise-level features.

📌 Author

Ashhar Siddiqui
Full Stack Developer | AI Enthusiast
