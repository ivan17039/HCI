# Next.js - Dynamic routes, data fetching

This assignment demonstrates the use of **Next.js** dynamic routes and server-side data retrieval for suite overview and details. <br>
Apartment data is stored locally in a JSON file, which simulates retrieving data from a REST API.

---

## 🎯 **Main Features**

1. **Dynamic routes**:
 - Dynamic routes for displaying individual apartments (`/apartments/[id]`) have been implemented.
 - Routes are generated based on data from local JSON.

2. **Retrieving data**:
 - Apartment information is retrieved directly from a locally imported `apartments.ts` JSON file.
 - The `ApartmentPage` component uses client-side rendering to find the apartment based on the dynamic `id` from the URL params.
 - The `apartments` data is imported from the (`data/apartments.ts`) file and used to find the correct apartment for display.

3. **Modular design**:
 - The project uses **components** for code reuse and a cleaner structure.
 - Sections such as gallery, content overview, and apartment details are separated into individual subcomponents.

---

## 📂  Project Structure

```plaintext
apartments/
│
├── _components/            # Components for displaying apartments (e.g., Navigation)
├── [id]/                   # Dynamic routes for individual apartments
│   └── page.tsx            # Page for displaying apartment details
├── amenities/              # Section for additional apartment amenities
│   └── page.tsx       
├── data/                   # Local JSON data about apartments
│   └── apartments.ts       # Data file with apartment info
│   └── galleryImages.ts    # Data file with all apartments pictures
├── gallery/                # Photo gallery of apartments
│   └── page.tsx        
├── overview/               # Section for apartment overview
│   └── page.tsx           
├── layout.tsx              # Layout component for apartments
└── page.tsx                # Entry page for displaying the list of apartments

