# To-Do List App

A simple React Native mobile app for managing to-do tasks, built with Expo.

## Features

### Must-Have
- ✅ Add a new task
- ✅ View the list of tasks
- ✅ Delete a task
- ✅ Persist tasks using AsyncStorage (tasks remain after app restart)

### Optional (Implemented)
- ✅ Mark tasks as completed (with checkbox)
- ✅ Edit existing tasks (with edit button)
- ✅ Separate completed vs pending tasks (dedicated tabs for All, Pending, Completed)
- ✅ Navigation for multiple screens (bottom tab navigation)
- ✅ Enhanced UI design with modern styling, shadows, and color-coded priorities
- ✅ Task priorities (High/Medium/Low) with visual indicators

### Optional (Not Implemented)
- None - all bonus features implemented!

## Setup Instructions

1. Make sure you have Node.js installed (version 14 or higher).
2. Install Expo CLI globally: `npm install -g @expo/cli`
3. Clone or download this repository.
4. Navigate to the project directory: `cd TodoApp`
5. Install dependencies: `npm install`
6. Start the development server: `npm start`
7. Use the Expo Go app on your phone to scan the QR code, or run on an emulator/simulator.

## Screenshots

(Since I can't take actual screenshots, here's a description: The app has a title "To-Do List", an input field with "Add" button, and a list of tasks with checkboxes and delete buttons. Completed tasks are crossed out.)

## Technical Details

- Built with React Native and Expo
- Uses AsyncStorage for local persistence
- State management with React hooks (useState, useEffect)
- Styled with React Native StyleSheet

## Project Structure

- `App.js`: Main component with all functionality
- `package.json`: Dependencies and scripts
- `assets/`: Static assets