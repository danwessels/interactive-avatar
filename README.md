# Interactive Avatar - Lil' Buddy

An interactive React application featuring an animated avatar with mocked functionality that includes live chat and customizable settings. Built with a modern glassmorphism style, and a focus and on accessibility and mobile responsiveness.

## ✨ Features

### Avatar Animations

The avatar features the following visual states that reflect its current activity.

- **Idle State**: Gentle floating animation with a sleeping face that shows when the avatar is minimised and not in use.
- **Listening State**: Gentle floating animation with smiling face which indicates that the avatar is awake (not longer minimised) but is not actively engaged in conversation.
- **Thinking State**: Bouncing animation reminiscent of a loader that indicates the avatar has just received a prompt from the user and is thinking.
- **Speaking State**: Animated 'talking' mouth indicates that the avatar is done thinking and is responding to your latest message.

## 🎯 Keyboard Navigation

The following keyboard shortcuts are supported.

| Key           | Action                                        |
| ------------- | --------------------------------------------- |
| `C`           | Open Chat                                     |
| `S`           | Open Settings                                 |
| `0`           | Return to Idle                                |
| `Escape`      | Close current view (or return to awake state) |
| `Enter`       | Send chat message                             |
| `Shift+Enter` | New line in chat (multi-line message)         |
| `Tab`         | Navigate between interactive elements         |

## 🛠 Tech Stack

This project is built with:

- React 18
- TypeScript
- Tailwind CSS

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```
