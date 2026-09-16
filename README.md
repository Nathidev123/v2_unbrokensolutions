## Live Project

**Live Website:** https://www.unbrokensolutions.co.za/

The production website is live and was developed for **Unbroken Solutions**, a logistics client. It includes the customer-facing service pages and integrated quotation workflow for courier and freight enquiries.

**Status:** 🟢 Live in production

# Unbroken Solutions — Logistics Quotation Platform

A full-stack logistics quotation platform **developed for a logistics client, Unbroken Solutions**.

The application was designed around the client's real-world workflow for handling courier and freight enquiries, collecting shipment information, calculating courier quotations, generating quotation PDFs, and delivering them to customers by email.

The platform supports **Courier & Express, Road Freight, Air Freight, and Sea Freight** enquiries through a guided multi-step quotation process.

This project involved taking the client's business requirements and translating them into a deployed production application, covering frontend development, backend API development, database management, third-party integrations, email infrastructure, DNS configuration, responsive design, and cloud deployment.

---

## Client Project

**Client:** Unbroken Solutions
**Industry:** Logistics & Freight
**Project Type:** Full-Stack Web Application / Client Project
**Role:** Full-Stack Developer

This application was developed specifically for a logistics client rather than as a tutorial or purely conceptual portfolio project.

The objective was to create a professional customer-facing platform that would simplify the process of submitting shipping enquiries while providing the business with a structured backend workflow for processing quotations.

The project required translating the client's logistics requirements into functional software while also handling the infrastructure required to deploy and operate the application in production.

### Client Workflow

```text
Customer
   │
   ▼
Unbroken Solutions Website
   │
   ▼
Shipping Service Selection
   │
   ├── Courier & Express
   ├── Road Freight
   ├── Air Freight
   └── Sea Freight
   │
   ▼
Multi-Step Quotation Form
   │
   ▼
Backend Processing
   │
   ├── Validation
   ├── Distance Calculation
   ├── Quote Calculation
   ├── Database Storage
   └── PDF Generation
   │
   ▼
Email Delivery
   │
   ▼
Customer receives quotation
```

---

# Project Overview

Unbroken Solutions is a full-stack logistics website and quotation platform built to support the client's customer enquiry and quotation process.

The customer-facing application provides information about the client's logistics services and guides customers through a structured quotation process.

The backend processes submitted shipment information, performs validation, calculates courier distances and quotations where applicable, stores order information, generates quotation documents, and handles email delivery.

The application was developed with a focus on creating a professional customer experience while keeping business logic and sensitive integrations on the server side.

---

# My Responsibilities

As the developer on the project, I was responsible for implementation across the application stack.

### Frontend

* Designed and developed the customer-facing React application
* Built responsive layouts for desktop, tablet, and mobile
* Developed the multi-step quotation form
* Implemented React Context for shared form state
* Implemented client-side validation and error states
* Built loading states and submission feedback
* Developed service sections and customer-facing content
* Integrated React Router for application navigation
* Implemented airport and seaport search interfaces

### Backend

* Built REST API endpoints using Express
* Implemented controllers and routes
* Developed MongoDB/Mongoose data models
* Implemented server-side validation
* Developed courier quotation calculations
* Integrated external APIs
* Implemented PDF quotation generation
* Implemented transactional email delivery
* Handled backend error responses and external API failures

### Infrastructure & Deployment

* Configured production environment variables
* Deployed the React frontend to Vercel
* Deployed the Express backend to Render
* Configured the client's custom domain
* Configured DNS records
* Configured email authentication using DKIM and DMARC
* Configured transactional email through Resend
* Debugged production deployment and integration issues

---

# Features

## Shipping Services

The platform provides four primary logistics services:

* **Courier & Express**
* **Road Freight**
* **Air Freight**
* **Sea Freight**

Each service has different requirements, so the quotation form dynamically collects the information relevant to the selected service.

---

## Multi-Step Quotation Form

The quotation process is divided into multiple steps to make the customer experience easier to navigate than a single large form.

The application collects information including:

* Company details
* Customer contact information
* Pickup address
* Recipient information
* Delivery address
* Service type
* Shipment weight
* Package dimensions
* Delivery speed
* Declared value
* Cargo information
* Container information where applicable
* Airport information for air freight
* Seaport information for sea freight
* Privacy consent

Form data is maintained across the different form steps using **React Context**.

---

# Courier Distance Calculation

Courier quotations use the **Google Routes API** to calculate the distance between pickup and delivery addresses.

The frontend sends the addresses to the backend:

```text
POST /api/order/distance
```

The backend communicates with the Google Routes API and returns the relevant distance and duration information.

The resulting distance is then included in the order data submitted to the quotation endpoint.

Keeping the external API interaction behind the backend also prevents the frontend from directly handling the API implementation and associated credentials.

---

# Quote Calculation

Courier quotations are calculated on the backend.

The calculation takes factors such as:

* Shipment weight
* Delivery distance
* Delivery speed

into consideration.

The application uses distance thresholds for the base delivery charge and applies an additional per-kilometre charge for longer journeys.

Delivery speed also affects the final quotation.

The general calculation flow is:

```text
Shipment Weight
       │
       ▼
Weight Charge
       │
       ▼
Distance
       │
       ▼
Distance Charge
       │
       ▼
Delivery Speed
       │
       ▼
Final Quotation
```

The quotation logic is handled server-side so that the pricing rules are not dependent on frontend code.

---

# Airport Search

Air freight enquiries include airport search functionality to help customers identify relevant airports.

The application integrates with the **FreeAirportDB API** to retrieve airport results based on user searches.

Search results are displayed dynamically as the customer enters a destination.

---

# Seaport Search

Sea freight enquiries use a backend proxy for seaport searches.

The frontend communicates with:

```text
GET /api/seaports
```

The backend then communicates with the external seaport API.

This keeps the external API credentials on the server rather than exposing them through the React application.

The search functionality also uses debouncing and duplicate-search prevention to reduce unnecessary API requests.

---

# Database

The backend uses **MongoDB with Mongoose** to store quotation/order information.

Mongoose schemas provide structure and validation for the data being persisted.

The backend also performs additional validation for incoming requests.

Validation covers areas such as:

* Required fields
* Phone numbers
* Service-specific fields
* Shipment information
* Conditional form requirements
* Invalid input

This provides server-side validation independently of the frontend.

---

# PDF Quotations

Successful quotation requests can be converted into PDF documents using **jsPDF**.

The generated PDF contains relevant quotation and shipment information and is attached to the customer's email.

PDF generation takes place on the backend, allowing the document to be created as part of the quotation processing workflow.

---

# Email Delivery

Quotation emails are sent using **Resend**.

The email workflow includes:

* Customer recipient
* Company CC
* Custom sender domain
* Quotation subject
* Generated PDF attachment
* Company branding
* Reply-to configuration

The application uses the client's custom domain for transactional email:

```text
quotes@unbrokensolutions.co.za
```

The domain was configured with the required DNS authentication records, including DKIM and DMARC.

---

# Error Handling

The application handles errors at both the frontend and backend levels.

## Frontend

The frontend provides user feedback for situations including:

* Missing required fields
* Invalid phone numbers
* Missing privacy consent
* Failed API requests
* Failed airport/seaport searches
* Failed quotation submissions

Custom UI notifications are used rather than relying exclusively on browser alerts.

## Backend

The backend handles:

* Invalid requests
* Validation failures
* Database errors
* External API failures
* Email failures
* Rate-limit responses
* Unexpected server errors

HTTP status codes are used to communicate different categories of failure.

```text
400 → Invalid request / validation problem
429 → External API rate limit
500 → Server-side failure
```

---

# Loading States

The application includes dedicated loading states for operations that may take longer to complete.

These include:

* Airport searches
* Seaport searches
* Distance calculation
* Quotation submission
* Email/PDF processing

Quotation submission uses a full-screen loading overlay to prevent the customer from interacting with the form while the request is being processed.

---

# Responsive Design

The application was designed to provide a consistent experience across:

* Desktop
* Tablet
* Mobile

The responsive implementation includes:

* Mobile navigation
* Stacked quotation forms
* Responsive service sections
* Mobile-specific hero layouts
* Responsive imagery
* Vertical process steps
* Responsive CTA sections
* Mobile-specific spacing and typography

The visual identity was developed around the client's logistics brand, using a professional blue colour palette and editorial-style layouts.

---

# Technology Stack

## Frontend

* **React**
* **React Router**
* **React Context API**
* **React Icons**
* **CSS**
* **Create React App**
* **EmailJS**

## Backend

* **Node.js**
* **Express**
* **MongoDB**
* **Mongoose**
* **Axios**
* **jsPDF**
* **Resend**
* **dotenv**
* **CORS**

## External Services

* **Google Routes API**
* **FreeAirportDB**
* **OAnor Seaports API**
* **Resend**
* **Vercel**
* **Render**
* **GoDaddy**

---

# Architecture

```text
                         ┌───────────────────┐
                         │      Customer     │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │  React Frontend   │
                         │                   │
                         │  React Router     │
                         │  Context API      │
                         │  Form Components  │
                         └─────────┬─────────┘
                                   │
                              HTTP Requests
                                   │
                                   ▼
                         ┌───────────────────┐
                         │  Express Backend  │
                         │                   │
                         │  Routes           │
                         │  Controllers      │
                         │  Validation       │
                         │  Quote Logic      │
                         └──────┬───────┬────┘
                                │       │
                   ┌────────────┘       └────────────┐
                   ▼                                 ▼
          ┌─────────────────┐               ┌─────────────────┐
          │     MongoDB     │               │  External APIs  │
          │                 │               │                 │
          │ Orders / Quotes │               │ Google Routes   │
          └─────────────────┘               │ Airports        │
                                            │ Seaports        │
                                            └─────────────────┘
                                │
                                ▼
                         ┌───────────────────┐
                         │  PDF Generation   │
                         │      jsPDF        │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │      Resend       │
                         │   Email Delivery  │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │     Customer      │
                         │ Quotation + PDF   │
                         └───────────────────┘
```

---

# Project Structure

```text
v2unbrokensolutions/
│
├── backend/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   │   ├── emailService.js
│   │   ├── pdfService.js
│   │   └── quoteService.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── pages/
    │   ├── App.js
    │   └── index.js
    │
    ├── package.json
    └── .env
```

---

# Environment Variables

Sensitive credentials are stored using environment variables and are not committed to the repository.

## Backend

```env
MONGO_URI=your_mongodb_connection_string

GOOGLE_ROUTES_API_KEY=your_google_api_key

OANOR_API_KEY=your_oanor_api_key

RESEND_API_KEY=your_resend_api_key

COMPANY_EMAIL=company@example.com
```

## Frontend

```env
REACT_APP_API_URL=https://your-backend-url.com
```

The `.env` files are excluded from Git using `.gitignore`.

---

# Deployment

The application is deployed as separate frontend and backend services.

## Frontend — Vercel

The React application is deployed through Vercel.

```text
Framework: Create React App
Root Directory: frontend
Build Command: npm run build
Output Directory: build
```

## Backend — Render

The Express API is deployed through Render.

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

The frontend communicates with the deployed backend using the `REACT_APP_API_URL` environment variable.

---

# Domain & Email Infrastructure

The client's production domain is:

```text
unbrokensolutions.co.za
```

The domain is connected to the deployed frontend and also configured for transactional email.

Email infrastructure includes:

* Custom sending domain
* DKIM authentication
* DMARC configuration
* Resend transactional email
* PDF email attachments

This allowed the application to move beyond local development into a production deployment with authenticated business email delivery.

---

# Security Considerations

The application follows several basic security practices:

* API keys are stored in environment variables
* `.env` files are excluded from Git
* External API credentials are kept on the backend where possible
* Backend validation is performed independently of frontend validation
* Customer input is validated before processing
* CORS is configured for frontend/backend communication
* Email credentials are not exposed to the client
* Sensitive configuration is stored through deployment environment variables

---

# Production Challenges & Solutions

One of the most valuable aspects of this project was dealing with problems that only became apparent once the application was integrated with real services and deployed.

## SMTP Connection Problems

The original email implementation used Gmail SMTP through Nodemailer.

The deployed backend experienced SMTP connection timeouts when attempting to establish the connection.

The email architecture was subsequently migrated to **Resend**, replacing the SMTP-based approach with an HTTP API.

This provided a more deployment-friendly transactional email workflow.

---

## External API Rate Limiting

The seaport API returned:

```text
429 Too Many Requests
```

during development.

The issue highlighted the importance of treating third-party APIs as rate-limited resources.

The search functionality was improved using:

* Debouncing
* Duplicate-search prevention
* Backend proxying
* Error handling

---

## Production Environment Configuration

The frontend and backend operate as separate deployed services.

The frontend API URL is configured using:

```env
REACT_APP_API_URL
```

This avoids hardcoding the production backend URL throughout the application and allows the frontend to communicate with the appropriate backend environment.

---

## DNS Configuration

The project required configuring DNS records across the client's domain registrar and the deployment/email providers.

This included:

* Custom domain configuration
* Vercel DNS configuration
* Resend domain verification
* DKIM
* DMARC
* Email sending configuration

This provided practical experience with infrastructure outside the application code itself.

---

# Development Lessons

This project provided experience with the complete lifecycle of a client-facing web application.

Key areas included:

* Translating business requirements into software
* Designing a multi-step React application
* Managing shared state with Context API
* Building REST APIs with Express
* Structuring routes and controllers
* MongoDB/Mongoose data modelling
* Server-side validation
* Backend business logic
* Third-party API integration
* API rate limiting
* Debouncing
* Error handling
* PDF generation
* Transactional email
* Environment configuration
* DNS configuration
* Domain authentication
* Cloud deployment
* Production debugging
* Responsive UI development

A major part of the project involved debugging issues across multiple layers of the stack rather than only writing application code.

---

# Running Locally

## Clone the Repository

```bash
git clone https://github.com/Nathidev123/v2_unbrokensolutions.git

cd v2_unbrokensolutions
```

## Backend

```bash
cd backend

npm install

npm start
```

## Frontend

Open another terminal:

```bash
cd frontend

npm install

npm start
```

Configure the frontend environment variable:

```env
REACT_APP_API_URL=
```

The application can then communicate with the appropriate backend environment.

---

# Production

| Component         | Platform / Service      |
| ----------------- | ----------------------- |
| Frontend          | Vercel                  |
| Backend           | Render                  |
| Database          | MongoDB                 |
| Email             | Resend                  |
| Domain            | unbrokensolutions.co.za |
| Route Calculation | Google Routes API       |
| Airport Search    | FreeAirportDB           |
| Seaport Search    | OAnor                   |

---

# Project Status

The application has been deployed as a production logistics platform for **Unbroken Solutions**.

The system provides the client's customers with a professional online presence and a structured quotation workflow covering courier and freight services.

Future improvements could include:

* Expanded quotation rules
* Additional logistics integrations
* Improved API caching
* Analytics
* Additional automation
* Further optimisation of external API usage

---

# Author

**Nathi Tshabalala**

Systems Development — NQF Level 6

GitHub:
https://github.com/Nathidev123/v2_unbrokensolutions

---

## Client Project Note

This repository represents a real-world client project developed for **Unbroken Solutions**, a logistics business.

The project involved more than frontend implementation and included backend development, database integration, external APIs, transactional email, PDF generation, production deployment, DNS configuration, and ongoing debugging of real integration and infrastructure issues.
