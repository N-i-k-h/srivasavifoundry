# Sri Vasavi Foundry - Admin Portal & CMS User Guide

This user guide describes how to access the administration portal, manage dynamic content across the portal using the CMS dashboard, and run the project locally.

---

## 🔑 Admin Login Credentials

To log into the administrator portal, use the following credentials:

* **Admin Email**: `admin@vasavi.com`
* **Admin Password**: `vasavifoundry123`

---

## 🚪 How to Access the Admin Portal

The Admin Portal uses a hidden shortcut built directly into the header to prevent unauthorized discovery:

1. Open the website in your browser.
2. Locate the **Sri Vasavi Foundry logo and text** at the top-left of the navigation header.
3. **Click the logo/text 10 times consecutively** within 3 seconds.
4. You will be automatically redirected to the **Admin Central login screen**.
5. Enter the email and password listed above and click **Sign In**.

---

## 🛠️ Managing Content (CMS Dashboard)

Once logged in, the admin panel sidebar offers the following management options:

### 1. Hero Banners
* **Description**: Edit the sliding banner headers on the main page.
* **Fields**: Main Title text, secondary description, and background image upload.

### 2. Clients Scroller
* **Description**: Manage testimonials and company logos sliding in the client showcase.
* **Fields**: Company Name, client quote, and logo graphic upload.

### 3. CEO Profile
* **Description**: Update the CEO quote statement and portrait picture on the About Us page.
* **Fields**: CEO quote text and photo upload.

### 4. Team Profile
* **Description**: Manage cards for key foundry engineers and staff.
* **Fields**: Name, role title, phone number, and profile photo upload.

### 5. Products Catalog
* **Description**: Update the detailed specifications, categories, and alloy mixes for components in the products list.
* **Fields**: Component name, categories, description, metallurgy alloy mix, weight range, hardness, application, and detail specs list.

### 6. Certifications Gallery
* **Description**: Add official certifications and registrations visible on the Certifications page.
* **Fields**: Certificate title and image document upload.

---

## ⚙️ Running and Building the App Locally

To launch the project locally on your machine, navigate to the project directory and run the following terminal commands:

### Prerequisites
Make sure dependencies are installed in both directories:
```bash
# In the root directory (Frontend)
npm install

# In the server directory (Backend)
cd server
npm install
cd ..
```

### Launch Development Servers
Run the frontend and backend servers concurrently:
```bash
# In the root directory (launches frontend at http://localhost:5173)
npm run dev

# In a separate terminal inside the 'server' directory (launches backend API at http://localhost:7010)
npm start
```

### Build for Production
To bundle the frontend for production deployment:
```bash
npm run build
```
The compiled files will output in the `/dist` folder.
