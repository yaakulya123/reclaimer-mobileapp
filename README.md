# 🌳 Reclaimer
**Gamifying the Circular Economy.**

> **Hackathon 2026 Submission**  
> *Sustainable. Social. Rewarding.*

*Website Link:* https://yaakulya123.github.io/reclaimer-mobileapp/

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

## 🚀 Key Features

### 1. Zero-Friction Scan & Earn
*   **Computer Vision**: Computer vision detects recyclable items (Plastic, Aluminum, Glass) in real-time.
*   **Instant Valuation**: Users see the exact "Eco-Point" value of an item *before* they even drop it, removing ambiguity and gamifying the act of collection.

### 2. Hyper-Local Material Mapping
*   **Stream-Specific Discovery**: Most map apps just show "Recycling Centers". Reclaimer filters by specific streams—identifying which kiosks accept **E-Waste**, **Textiles**, or **Beverage Containers**. 
*   **Anti-Wishcycling**: By directing users to stream-specific bins, we reduce contamination rates caused by "wishcycling" (guessing where items go).

### 3. Dual-Metric Impact Wallet
*   **Beyond Currency**: Our wallet tracks two distinct metrics: **Financial Reward** (Points redeemable for goods) and **Environmental Debt Paid** (CO2 offset in kg). 
*   **Tangible Visualization**: We convert abstract carbon metrics into relatable stats (e.g., "Equivalent to planting 3 trees"), making the impact felt.

### 4. Interactive Knowledge Hub
*   **Gesture-Controlled Guide**: The scanner features a draggable, gesture-based bottom sheet that provides on-demand education.
*   **Dynamic Rules**: Real-time updates on what can be recycled, accessible with a simple swipe, ensuring users are always informed at the moment of action.

---

## 🛠️ Technical Stack
Built with a modern, scalable architecture to ensure a premium user experience.

### Frontend Framework
*   **React Native** `(v0.81.5)`: Core framework for cross-platform (iOS/Android) development.
*   **Expo** `(SDK 54)`: Managed workflow for rapid iteration and native module access.
*   **TypeScript** `(v5.9)`: Statically typed for robust, error-free code.

### UI & Animations
*   **Reanimated** `(v3.16)`: High-performance, declarative animations running on the UI thread (60fps).
*   **Lucide React Native**: Beautiful, consistent vector iconography.
*   **Custom Design System**: Implemented logically via reusable components.

### Core Services
*   **Expo Camera** `(v16.0)`: Real-time camera stream processing for the scanning interface.
*   **React Native Maps** `(v1.20)`: Google Maps integration for the Kiosk Finder feature.
*   **Expo Router** `(v4.0)`: File-based routing for seamless deep linking.

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
