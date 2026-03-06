# Techzu Social: Mini Social Feed App

A full-stack, high-performance social media application built with the **MERN** stack and **React Native (Expo)**. This project implements real-time notifications, secure session management, and a premium "Obsidian Bento" design system.

## 🚀 Live Deliverables

- **Android APK (Download):** [[Download App]](https://drive.google.com/file/d/1iPoqbdeCD9ZMIzL7V4yMnHGI_wdCd_4J/view?usp=sharing)
- **Live Backend API:** [[Live Backend Url](https://techzu-social-app.onrender.com/)]/api/v1
- **API Documentation:** [[Api Docs](https://techzu-social-app.onrender.com/)]/api-docs
- **GitHub Repository:** [[Github Repo](https://github.com/Mdabdullah3/techzu-social-app)]

---

## 🛠️ Technical Ecosystem

### Backend Architecture (Node.js & Express)

Built with an **Enterprise-Grade Modular Structure** for maximum maintainability.

- **API Versioning:** All endpoints are hosted under `/api/v1` to support future scalability.
- **Security Logic:** Implemented a **Dual-Token System** (Short-lived Access JWT & Long-lived Refresh JWT) with database persistence for secure mobile sessions.
- **Infrastructure:** Powered by **MongoDB Atlas** with optimized indexing for username filtering and **Winston** for persistent logging.
- **Validation Layer:** Decoupled request validation using `express-validator` to ensure data integrity before reaching the controllers.
- **Documentation:** Fully interactive **Swagger/OpenAPI 3.0** documentation.

### Mobile Architecture (React Native & Expo)

Designed for a smooth, native-feeling user experience on both **handsets and tablets**.

- **State Management:** Utilized **Zustand** for a lightweight, high-performance global state (Auth, Feed, UI).
- **Network Layer:** Custom **Axios Interceptor** logic to handle automatic token refreshing and global error catching.
- **UI System:** Custom-built **Atomic Design System** using standard React Native Stylesheets for 100% stability across Windows/Mac/Linux build environments.
- **Real-time Engine:** Integrated **Firebase Cloud Messaging (FCM)** for instant push notifications on social interactions.
- **Interactive UX:** Custom-built **Animated ActionSheet** using the native `Animated` API for high-fidelity "Threads-style" comments and options.

---

## 📱 Key Features

- **Identity:** Secure Register/Login flow with automatic session persistence via `Expo SecureStore`.
- **Feed:** High-performance scrollable list featuring **Optimistic UI Updates** for instant Like/Unlike feedback.
- **Search Logic:** Real-time newsfeed filtering by username via backend Regex optimization.
- **Social Engagement:** Threaded comment system and native sharing integration.
- **Post Management:** Fully secure CRUD operations (Create, Edit, Delete) with server-side ownership verification.
- **Haptic Engine:** Integrated `expo-haptics` for tactile feedback on primary actions, creating a premium "physical" feel.

---

## 📱 Implementation Considerations (Critical Notes)

### 1. Dependency Management (`--legacy-peer-deps`)

This project utilizes the latest **React 19** and **Expo 55** ecosystem. Due to the very recent release of these versions, several third-party libraries have not yet updated their peer dependency metadata.

- **Solution:** I have utilized the `--legacy-peer-deps` flag and `overrides` in `package.json` to ensure a consistent dependency tree while the ecosystem matures. This is a deliberate architectural decision to leverage the latest performance improvements of React 19.

### 2. Push Notification Environment Guards

Per **Expo SDK 53+** specifications, remote FCM notifications are no longer supported directly within the "Expo Go" sandbox app.

- **Solution:** I have implemented **Environment Guards** using `expo-constants`. The notification registration logic is designed to run silently in development (Expo Go) to prevent UI crashes, while being fully functional in the **Standalone APK build**.

### 3. Backend "Cold Start" (Render Free Tier)

The backend is hosted on Render's Free Tier.

- **Note:** If the app has been inactive, the server may require **30-60 seconds** to "wake up" during the initial login or registration request. Subsequent requests will be near-instant.

---

## 🏗️ Folder Structure Breakdown

```text
/backend
  ├── /config         # Database, Firebase, and Logger configurations
  ├── /controllers    # Business logic for all API endpoints
  ├── /docs           # Swagger JSDoc definitions (Modular Docs)
  ├── /middleware     # Auth guards, Error handling, and Async wrappers
  ├── /models         # Mongoose Schemas (User, Post)
  ├── /services       # Dedicated Notification & Token services
  ├── /validations    # Input validation schemas
  └── server.js       # Entry point with DNS-override for high availability

/mobile
  ├── /app            # Expo Router (File-based navigation)
  ├── /components     # Atomic UI components and common layouts
  ├── /constants      # Design tokens (Colors, Theme, SIZES)
  ├── /services       # API Client (Axios Interceptors)
  ├── /store          # Zustand Global Stores
  └── /utils          # Push notification registration and helper logic
```

## 📝 Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Mdabdullah3/techzu-social-app.git
cd techzu-social-app

**Backend**

1. `cd backend`
2.`npm install`
3. Create a `.env ` file in the backend folder. You can copy the values from `.env.local` configuration or use the template below:
3. `npm run dev`

**Mobile**

1. `cd mobile`
2.`npm install --legacy-peer-deps`
3. `npx expo start`


### Built with ❤️ for the Techzu Ichicode Technical Assessment.
