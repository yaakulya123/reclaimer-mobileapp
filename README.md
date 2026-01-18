# 🌳 Reclaimer
**Gamifying the Circular Economy.**

> **Hackathon 2026 Submission**  
> *Sustainable. Social. Rewarding.*

<!-- Placeholder for Demo Video -->
<div align="center">
  <a href="https://youtu.be/placeholder">
    <img src="https://img.youtube.com/vi/placeholder/0.jpg" alt="Watch the Demo" style="border-radius: 15px; width: 100%; max-width: 600px; shadow: 0 4px 8px rgba(0,0,0,0.2);">
  </a>
  <p><i>📺 Watch our 2-minute demo video</i></p>
</div>

---

## 🌎 The Mission: Why This Matters
We are facing a global waste crisis. The statistics are alarming:
*   **62 Million Tonnes** of e-waste are generated annually, with only **22.3%** properly recycled ([UN Global E-waste Monitor](https://ewastemonitor.info/)).
*   **91% of plastic** ever produced has not been recycled ([National Geographic / OECD](https://www.oecd.org/en/topics/plastic-pollution.html)).
*   By 2050, there could be **more plastic in the ocean than fish** by weight ([Ellen MacArthur Foundation](https://www.ellenmacarthurfoundation.org/)).

The core problem isn't just infrastructure—it's **participation**. Recycling is often confusing, inconvenient, and unrewarding for the average person. 

**Reclaimer** solves this by minimizing friction and maximizing motivation. We combine **AI-powered scanning**, **real-time impact tracking**, and **financial incentives** to turn recycling into a seamless, rewarding daily habit.

---

## 📸 App Gallery

<div align="center"> 
  <table>
    <tr>
      <td align="center"><img src="screenshots/IMG_1340.jpg" width="250" alt="Process Flow"/><br/><i>Secure Authentication</i></td>
      <td align="center"><img src="screenshots/IMG_1341.jpg" width="250" alt="Dashboard"/><br/><i>Home & Impact Summary</i></td>
      <td align="center"><img src="screenshots/IMG_1342.jpg" width="250" alt="Map View"/><br/><i>Nearby Kiosks</i></td>
    </tr>
    <tr>
      <td align="center"><img src="screenshots/IMG_1343.jpg" width="250" alt="Scanner"/><br/><i>Smart AI Scanner</i></td>
      <td align="center"><img src="screenshots/IMG_1344.jpg" width="250" alt="Scanning"/><br/><i>Live Object Detection</i></td>
      <td align="center"><img src="screenshots/IMG_1346.jpg" width="250" alt="Success"/><br/><i>Deposit Confirmation</i></td>
    </tr>
    <tr>
      <td align="center"><img src="screenshots/IMG_1347.jpg" width="250" alt="Wallet"/><br/><i>Points & Rewards</i></td>
      <td align="center"><img src="screenshots/IMG_1348.jpg" width="250" alt="Leaderboard"/><br/><i>Community Rankings</i></td>
      <td align="center"><img src="screenshots/IMG_1352.jpg" width="250" alt="Profile"/><br/><i>User Profile & Stats</i></td>
    </tr>
  </table>
</div>

---

## 📱 Core Features

### 1. Smart Vision Scanning
*   **AI Recognition**: Instantly detects Plastic (PET), Aluminum, and Glass using `expo-camera`.
*   **Live Valuation**: Shows real-time point value for every item before you deposit.

### 2. Gamified Ecosystem
*   **Leaderboards**: Compete with friends and your local community.
*   **Impact Dashboard**: Visualize your CO₂ offset in real-world terms (e.g., "Car miles saved").

### 3. Rewards Wallet
*   **Eco-Points**: Accumulate points for every gram of recycled material.
*   **Redemption**: Exchange points for store discounts or donate to charity.

---

## 🛠️ Technical Stack
Built with a modern, scalable architecture to ensure a premium user experience.

### Frontend Framework
*   **React Native**: Core framework for cross-platform (iOS/Android) development.
*   **Expo (SDK 54)**: Managed workflow for rapid iteration and native module access.
*   **TypeScript**: Statically typed for robust, error-free code.

### UI & Animations
*   **Reanimated 3**: High-performance, declarative animations running on the UI thread (60fps).
*   **Lucide React Native**: Beautiful, consistent vector iconography.
*   **Custom Design System**: Implemented logically via reusable components in `headers/` and `components/`.

### Core Services
*   **Expo Camera**: Real-time camera stream processing for the scanning interface.
*   **React Native Maps**: Google Maps integration for the Kiosk Finder feature.
*   **Expo Router**: File-based routing for seamless deep linking and navigation stacks.
*   **Location Services**: `expo-location` for real-time user positioning and geofencing.

---

## 💡 Challenges & Accomplishments

### The "Camera Overlay" Hurdle
One of our biggest technical challenges was layering the UI over the camera stream smoothly. React Native's `CameraView` initially blocked our custom overlays (mask, text, guides). We solved this by implementing `StyleSheet.absoluteFill` with precise z-indexing, allowing us to create a transparent "cutout" effect for the scanning frame while keeping the rest of the UI interactive.

### Accomplishments We're Proud Of
*   **Interactive Bottom Sheet**: Building a custom draggable bottom sheet from scratch using `PanResponder` and `Animated` API to ensure a native-like feel without heavy external libraries.
*   **Performance**: Achieving 60fps animations even while the camera is active and processing inputs.

---

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/yaakulya123/reclaimer-mobileapp.git
   cd reclaimer-mobileapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npx expo start
   ```

4. **Run on Device**: Scan the QR code with **Expo Go** (Android) or the Camera app (iOS).

---

## 📂 Project Structure
A quick look at the top-level directory structure:

```
reclaimer-mobileapp/
├── app/                    # Expo Router file-based navigation
│   ├── (tabs)/             # Main tab navigator (Scan, Map, Wallet, etc.)
│   ├── _layout.tsx         # Root layout configuration
│   └── modal.tsx           # Global modals
├── components/             # Reusable UI components
│   ├── Themed.tsx          # Theme-aware primitives (Text, View)
│   └── ...
├── constants/              # App-wide constants (Colors, Layout)
├── screenshots/            # App showcase images
├── assets/                 # Static assets (fonts, icons)
├── package.json            # Dependencies and scripts
└── README.md               # Documentation
```

---

## 👥 The Team
**Yaakulya Sabbani** | **Rehnuma Taskin** | **Yiyang Xu**

---
*Built with 💚 for the Hackathon.*
