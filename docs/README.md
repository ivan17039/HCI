# 🏡 Apartment Rental Web Application

# 📖 Project Overview

This is a **Next.js-based apartment rental web application** that allows users to explore available apartments, check availability, make reservations, and leave reviews. The project ensures a fully responsive and interactive experience.
This report summarizes the development process and features of a responsive apartment rental website landing page, created as part of a multi-part assignment. The project involved creating low and high-fidelity prototypes, coding a fully responsive page, and implementing dynamic functionality based on user login.The project ensures a fully responsive and interactive experience. The development was completed in multiple stages:

# 📂 Assignment Overview

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

# 🚀 Features

- **Apartment Listings:** View different apartments with amenities, gallery, and pricing details.
- **Availability Check:** Users can see booked dates and available periods.
- **Reservation System:** Secure booking with form validation and backend checks.
- **Guest Experience:** Users can share reviews and photos from their stay.
- **Contact Us Page:** Interactive map and contact form with validation.
- **Responsive Navigation:** Mobile-friendly menu with hamburger toggle.
- **Database Integration:** Persistent user authentication and reservation management.
- **CMS Integration:** Guest reviews and photos managed via Contentful CMS.
- **API Endpoints:** Dynamic backend operations for availability checks, login, and reservations.

# 🛠️ Technologies Used

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

Here's the content formatted in Markdown (.md) format with the items under each heading indented and numbered:

# 🎨 Basic Design Principles

Throughout our project, we applied several basic design principles to enhance user experience and interface design:

1. Maintained a uniform color scheme, typography, and button styles across all pages.

2. Used size and color emphasis for important elements like headings and call-to-action buttons.
3. Ensured readability through distinct text and background contrasts.
4. Structured layout with clear alignment of form elements, buttons, and text.
5. Grouped related elements together, such as labels with their input fields.

# 🧠 Norman's 7 Strategies

We incorporated Donald Norman's 7 principles of design in the following ways:

1. Discoverability: Navigation elements and form inputs are easily visible and labeled.

2. Feedback: Buttons provide hover states to indicate interactivity.
3. Conceptual Model: Layout follows common web conventions, making it intuitive.
4. Affordances: Buttons appear clickable, and input fields are clearly editable.
5. Signifiers: Labels and placeholders guide users through form fields.
6. Mappings: Logical ordering of form fields aligns with users' expectations.
7. Constraints: Required fields prevent errors and guide users towards successful input.

# 🔍 Heuristic Evaluation

Applying Nielsen's heuristics, we evaluated our design as follows:

1. Visibility of System Status: The active page is highlighted in the navigation.

2. Match Between System and Real World: Uses familiar terms like "Book Now" and "Reservations".
3. User Control and Freedom: Users can navigate freely and modify their bookings.
4. Consistency and Standards: Maintains consistent UI patterns across pages.
5. Error Prevention: Input validation helps prevent user errors.
6. Recognition Rather Than Recall: Labels and placeholders reduce cognitive load.
7. Flexibility and Efficiency of Use: Navigation provides quick access to key sections.
8. Aesthetic and Minimalist Design: Focuses on clarity and simplicity.
9. Help Users Recognize, Diagnose, and Recover from Errors: Clear error messages guide users.
10. Help and Documentation: Key sections provide guidance on using the site.

You're right, and I understand now that you want the bullet points indented further to the right. Here's the corrected version with the bullet points indented:

Ah, I see now. You want the sub-points to be numbered instead of using bullet points, and you want them indented. Here's the corrected version that matches your example:

# 🔎 C.R.A.P. Principles

We applied the C.R.A.P. (Contrast, Repetition, Alignment, Proximity) principles as follows:

**1. Contrast:**

- Used distinct text/background colors.
- Applied different font weights for headings.

**2. Repetition:**

- Consistent button styles across pages.
- Maintained a uniform layout structure.

**3. Alignment:**

- Left-aligned form labels and input fields.
- Centered form containers for clarity.

**4. Proximity:**

- Grouped related elements closely.
- Navigation items kept together in the header.

# ⚡ Analyze the application's performance

[PageSpeed Insights](https://pagespeed.web.dev/analysis/https-hci-zj6c-vercel-app/7g1o244vlx?form_factor=desktop)

# 📝 Future Improvements

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

# 🏆 Conclusion 🎉

This project successfully delivered a fully functional and responsive landing page with integrated backend functionality. The use of various technologies and a focus on the booking process resulted in a robust and user-friendly application. The architecture is scalable and adaptable for future expansion, including server-side data fetching and additional features.
