# PeekNow
A modern, full-featured social media mobile application built with React Native (Expo). PeekNow lets users share ephemeral photo updates ("Peeks"), chat with friends, and toggle between light/dark themes—all wrapped in a clean, camera-first interface.
### ✨ Features
 * **📸 Camera & Photo Sharing:** Capture photos directly in-app using expo-camera. After taking a shot, preview it, save to your device gallery, or post it instantly to your feed.
 * **🏠 Feed:** Scroll through Peeks from friends and the community. Each post displays the user's avatar, name, and timestamp overlaid on the image.
 * **💬 Chat & Messaging:** View your chat list with unread indicators and green rings for new Peeks. Open individual chat rooms to send and receive messages with real-time typing support.
 * **🌓 Theme Toggle:** Switch seamlessly between light and dark modes. The entire UI—backgrounds, cards, text, and borders—adapts instantly.
 * **📱 Bottom Navigation:** Quick access to Feed, Chats, Camera, and Profile via a persistent tab bar.
 * **🔔 Smart Indicators:** Unread message badges and "new Peek" rings keep you informed at a glance.
### 🛠️ Tech Stack
 * **Framework:** React Native with Expo SDK ~54
 * **Navigation:** Custom tab-based navigation with full-screen camera overlay
 * **Camera:** expo-camera for photo capture
 * **Media:** expo-media-library for saving photos to device gallery
 * **Icons:** @expo/vector-icons (Ionicons)
 * **UI Components:** react-native-paper for enhanced components
 * **Theming:** Custom theme context with light/dark mode support
 * **Keyboard Handling:** react-native-keyboard-aware-scroll-view for smooth input management
### 📁 Project Structure
```text
peeknow/
├── App.js                # Main app entry – manages screens, themes, and state
├── index.js              # Expo entry point
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
├── constants/
│   └── colors.js         # Global light/dark theme colors
├── components/           # Reusable UI components
│   ├── BottomNav.js
│   ├── CameraBottomControls.js
│   ├── ChatInput.js
│   ├── MessageBubble.js
│   ├── PreviewControls.js
│   ├── SendButton.js
│   ├── StatusCard.js
│   └── TextInputBox.js
├── screens/              # Main app screens
│   ├── FeedScreen.js
│   ├── ChatsScreen.js
│   ├── ChatRoomScreen.js
│   ├── CameraScreen.js
│   └── ProfileScreen.js
└── assets/               # Images, icons, and splash screen assets

```
### 🚀 Getting Started
#### Prerequisites
 * Node.js (v16 or later)
 * npm or yarn
 * Expo CLI (npm install -g expo-cli)
 * iOS Simulator (Mac only) or Android Emulator
 * Physical device with Expo Go app (iOS/Android)
#### Installation
 1. **Clone the repository**
   ```bash
   git clone https://github.com/okureanthonytonny-commits/PeekNow.git
   cd PeekNow/peeknow
   ```

2. **Install dependencies**
   ```bash
npm install
```

 3. **Start the development server**
    ```bash
expo start
```

4. **Run on your device**
   * Scan the QR code with the Expo Go app (iOS/Android)
   * Press `i` for iOS Simulator or `a` for Android Emulator

#### Key Scripts

| Command | Description |
| :--- | :--- |
| `npm start` | Start Expo development server |
| `npm run android` | Launch on Android emulator/device |
| `npm run ios` | Launch on iOS simulator |
| `npm run web` | Launch in web browser |

---

### 🎨 Theming

PeekNow includes a built-in theme system with light and dark modes. Colors are centralized in `constants/colors.js`:

* **Light Mode:** Clean whites and soft grays with blue accents
* **Dark Mode:** Deep blacks and dark grays with the same accent color

The theme is passed via React state and consumed by all screens and components.

---

### 📸 Camera Workflow

1. User taps the camera icon in the bottom navigation.
2. Camera screen opens with flash toggle and front/back camera controls.
3. User captures a photo using the shutter button.
4. Preview screen appears with options to:
   * **Retake** – discard and go back to camera
   * **Save** – save image to device gallery (requests permission if needed)
   * **Post** – share the Peek to the feed
5. Posted Peeks appear at the top of the feed with user avatar and timestamp.

---

### 💬 Chat System

* **Chat List:** Displays all conversations with last message preview, timestamp, and unread indicators.
* **New Peek Indicator:** Green ring around avatars when someone has sent a new Peek.
* **Chat Room:** Individual thread view with message bubbles, input field, and theme support.
* **Smart Keyboard:** Input field automatically adjusts when keyboard appears.

---

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

### 🙏 Acknowledgments

* Built with Expo and React Native
* Icons by Ionicons
* Avatar images from Pravatar and placeholder images from Picsum

