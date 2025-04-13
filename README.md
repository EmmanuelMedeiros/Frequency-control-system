# 📱 Frequency Control Mobile System

## 📌 About the Project

A mobile frequency control system designed to replace traditional time books. This application is **reliable**, **user-friendly**, and **informative**, providing employees and administrators with a complete toolset for managing work attendance digitally.

---

## ✨ Main Features

- 🔐 **Authentication System:**  
  Two roles available — `admin` and `employee`.  
  - **Employees** can save check-ins, view their overtime, missing hours, and attendance faults.  
  - **Admins** have extended control and access to management features.

- 🔑 **JWT Authorization:**  
  All API endpoints require JWT-based authentication, ensuring secure and restricted access to application features.

- 📸 **Native Camera Integration:**  
  Employees must select their profile and take a photo using the device’s camera.  
  The photo is saved as a base64 string in the database along with the user's ID and timestamp.

- 📊 **Detailed User Reports:**  
  Generate `.xlsx` reports for a selected period, listing:
  - All attendance logs
  - Timestamps
  - Days and users

- 🗓️ **Daily User Reports:**  
  View a specific user's attendance for a selected day, including:
  - Time of check-ins
  - Captured photos

- ⚙️ **Custom Work Configuration:**  
  Admins can configure each employee's:
  - Workload
  - Work time
  - Days off  
  Tailored to fit diverse employment schedules.

---

## 📖 Description

This application acts as a digital **workforce attendance tracking system**. It helps organizations ensure punctuality, transparency, and automation in attendance logging. Employees authenticate via secure JWT tokens, take photos during check-ins, and rely on an intuitive mobile interface built with modern tools.

Data integrity is maintained with photo-verification and role-based permissions. Admins benefit from powerful reporting features, including Excel exportation and custom filters.

The system provides a strong foundation for any business looking to modernize its attendance management using **mobile-first**, **secure**, and **scalable** technologies.

---

## 🧪 Technologies Used

### 🔧 Back End
- **Node.js**
- **Express.js**
- **TypeScript / JavaScript**
- **JWT (JSON Web Token)** for secure authentication

### 📱 Front End
- **React Native**
- **Expo** for native mobile features
- **Camera System** for photo-based check-ins
- **Local Storage & Cache System**

### 🗃️ Database
- **PostgreSQL**

---
