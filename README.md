# Stitchtly BarScanner 📱

Welcome to **Stitchtly BarScanner**, an intuitive and powerful React Native app designed for seamless Bluetooth device connections and efficient Bar code scanning. Built using [Expo](https://expo.dev), our app provides a smooth user experience, from connecting to devices to scanning barcodes effortlessly.

### Mobile App for Android

If you'd like to download the mobile app, you can do so here, and it's ready to use (for now, only Android is supported):

- [Stitchtly BarScanner Android App](https://expo.dev/accounts/jorgechvz98/projects/stitchtly-barscanner/builds/683545fb-a67b-443d-9975-231ca283102e)

## Features

- **Effortless Bluetooth Connection**: Connect to your ESP32 devices with ease and maintain a persistent connection across app sessions.
- **Smart Bar Code Scanning**: Quickly and efficiently scan Bar codes to send data to your connected devices.
- **Persistent Authentication**: Users stay logged in and connected, even after exiting the app, ensuring a streamlined experience.

---

## Getting Started

To set up and run Stitchtly-BarScanner, follow these steps:

### 1. Prerequisites

Make sure you have [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com) installed on your machine.

### 2. Install Dependencies

Navigate to your project directory and run:

```bash
npm install
```

### 3. Launch the App

Navigate to your project directory and run:

```bash
npx expo start
```

From here, you can choose how to run your app:

- [Development Build](https://docs.expo.dev/develop/development-builds/introduction/): Ideal for comprehensive testing and development.
- [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/): Test your app on a simulated Android device.
- [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/): Test your app on a simulated iOS device.
- [Expo Go](https://expo.dev/go): A convenient way to preview your app using the Expo Go app.

---

## App Workflow

1. **Start Screen:** The app opens with a "Let’s Start" screen, introducing the user to Stitchtly-BarScanner.
2. **Login:** If the user is not logged in, they are directed to the login page. Successful login ensures they remain authenticated, even after restarting the app.
3. **Bluetooth Connection:** A dialog appears for the user to connect to an ESP32 device. Once connected, the connection remains active across sessions.
4. **Bar Code Scanning:** Upon successful connection, the user is redirected to the Bar code scanner to scan and send data to the device.
5. **Persistent Sessions:** Both the login and Bluetooth connection states are preserved, ensuring a seamless user experience every time.

---

## Persistence and State Management

We use AsyncStorage to persist user authentication and Bluetooth connection status, ensuring a continuous and uninterrupted workflow.

- **Authentication**: Users remain logged in, eliminating the need to re-enter credentials on app restart.
- **Bluetooth Connection**: If a device is connected, the app remembers the connection and avoids showing the connection dialog unnecessarily.

---

## Code Structure

- **/app:** Contains all the primary screens, including the start, layout, login, device connection, and Bar scanner.
- **/components:** Modular and reusable components such as DeviceConnectionModal.
- **/hooks:** Custom hooks for managing Bluetooth connections using react-native-ble-plx.
- **/context:** State management using React Context API.
- **/utils:** Utility functions, including data encoding and storage helpers.

---

## Learn More About Stitchtly-BarScanner

To understand how to optimize and extend the functionality of your app, check out these resources:

- **Expo Documentation:** Comprehensive guides to enhance your Expo project.
- **Expo Camera:** Learn more about the camera component in Expo.
- **React Native BLE Documentation:** Learn more about managing Bluetooth Low Energy (BLE) connections.
- **AsyncStorage Documentation:** Explore how to manage persistent storage in React Native.

---

## Web App

We create a web app using React, Tailwind Css and NestJS, if you'd like to try it out. Check out [Stitchtly BarScanner Web App](https://github.com/jorgechvz/textile-warehouse) for more details.

### License

This project is licensed under the MIT License.