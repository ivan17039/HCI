# 🏡 Apartment Rental Web Application

## 📖 Project Overview

This is a **Next.js-based apartment rental web application** that allows users to explore available apartments, check availability, make reservations, and leave reviews. The project ensures a fully responsive and interactive experience.
This report summarizes the development process and features of a responsive apartment rental website landing page, created as part of a multi-part assignment. The project involved creating low and high-fidelity prototypes, coding a fully responsive page, and implementing dynamic functionality based on user login.The project ensures a fully responsive and interactive experience. The development was completed in multiple stages:

## 📂 Assignment Overview

**1. Figma Essentials:** Initial design phase focusing on creating wireframes and visual designs using Figma, establishing the foundation for the project's visual language and user interface elements.

- Link to Assignment 1: [**Figma essentials**](/assignments/Figma-essentials/)

**2. User Personas and Information Architecture:** Development of detailed user personas and information architecture, including:

- Link to Assignment 2: [**User personas and information architecture**](/assignments/User%20personas%20and%20information%20architecture/)

  - Creating detailed user personas to understand different user needs and behaviors
  - Mapping user journeys and interaction flows
  - Establishing content hierarchy and navigation structure
  - Defining key user scenarios and requirements

**3. Next.js - Deploying Application:** Successfully deployed the application on Vercel's platform using Next.js, ensuring:

- Link to Assignment 3: [**Next.js - Deploying Application**](https://hci-zj6c.vercel.app/)
  - Optimal performance and scalability
  - Automated deployment pipeline
  - Production-ready environment configuration

**4. Low/High-Fidelity Prototype:** Created iterative prototypes:

- Link to Assignment 4: [**Low/High-fidelity prototype**](/assignments/Low&High-fidelity%20prototype/)
  - Low-fidelity prototypes focusing on layout and functionality
  - High-fidelity prototypes incorporating visual design and interactions
  - Direct code implementation for rapid testing and iteration
  - User feedback integration and refinement

**5. Dynamic Routes and Data Fetching:** Implemented dynamic functionality:

- Link to Assignment 5: [**Dynamic routes, data fetching**](/assignments/Dynamic%20routes,%20data%20fetching/)
  - Setting up dynamic routing for apartment listings and user profiles
  - Integrating data fetching mechanisms for apartment information
  - Implementing API routes for backend functionality
  - Creating a flexible content management system

**6. Full Responsive Page Coding:** Final implementation phase including:

- Link to Assignment 6: [**Full Responsive Page Coding**](/assignments/Full%20Responsive%20Page%20Coding/)

  - Responsive design across all device sizes
  - Mobile-first navigation with hamburger menu
  - Dynamic content based on user authentication
  - Integration of all previous components into a cohesive whole

## 🚀 Features

- **Apartment Listings:** View different apartments with amenities, gallery, and pricing details.
- **Availability Check:** Users can see booked dates and available periods.
- **Reservation System:** Secure booking with form validation and backend checks.
- **Guest Experience:** Users can share reviews and photos from their stay.
- **Contact Us Page:** Interactive map and contact form with validation.
- **Responsive Navigation:** Mobile-friendly menu with hamburger toggle.
- **Database Integration:** Persistent user authentication and reservation management.
- **CMS Integration:** Guest reviews and photos managed via Contentful CMS.
- **API Endpoints:** Dynamic backend operations for availability checks, login, and reservations.

## 🛠️ Technologies Used

**Frontend:**

- HTML: Structure and content.
- CSS: Styling and responsive design.
- JavaScript: Interactivity and dynamic functionality.
- Next.js App Router: Frontend framework.
- Tailwind CSS: Utility-first CSS framework.
- Shadcn/UI: React component library.
- Lucide React Icons: Icon set.

**Backend:**

- Drizzle ORM: Database interaction.
- Contentful CMS: Content management for guest reviews and photos.
- Node.js with API routes: Backend logic and API endpoints.

**Database:** PostgreSQL with schema migrations using Drizzle ORM

**Authentication:** JWT-based authentication for secure booking

**Map Integration:** Leaflet.js for interactive maps

**Deployment:** Hosted on **Vercel** for fast and reliable performance

## 🔍 Key API Endpoints

- `/pages/api/availability.ts`: Retrieves apartment availability data.
- `/pages/api/check-availability.ts`: Checks real-time availability for selected dates.
- `/pages/api/login.ts`: Handles user login authentication.
- `/pages/api/register.ts`: Handles user registration.
- `/pages/api/reservations.ts`: Manages user reservations (creation, retrieval, updates).

- `/pages/api/reservations/[id].ts` – Fetches or updates a specific reservation. Users can:

  - `GET` – Retrieve details of a specific reservation.

  - `PUT` – Update reservation details, provided it is not confirmed.

## 🔍 Analyze the application's performance ⚡

[PageSpeed Insights](https://pagespeed.web.dev/analysis/https-hci-zj6c-vercel-app/7g1o244vlx?form_factor=desktop)

## 📝 Future Improvements

- [ ] Online Payment Integration

  - Implement Stripe or PayPal to allow users to pay directly when booking.
  - Secure transactions with 3D Secure Authentication.

- [ ] Calendar Synchronization

  - Sync apartment availability with Google Calendar or Airbnb API.

- [ ] Multi-Language Support 🌍

  - Add i18n (Internationalization) for multiple languages (e.g., English, Croatian, German).

- [ ] Push Notifications & Emails 📩

  - Send email confirmations after booking.
  - Implement push notifications for booking reminders.

## 🏆 Conclusion 🎉

This project successfully delivered a fully functional and responsive landing page with integrated backend functionality. The use of various technologies and a focus on the booking process resulted in a robust and user-friendly application. The architecture is scalable and adaptable for future expansion, including server-side data fetching and additional features.
