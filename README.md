# ServicePro: Professional Services Management System

![ServicePro Logo](https://via.placeholder.com/1200x400?text=ServicePro)

## Overview

ServicePro is a comprehensive services management platform built with React, TypeScript, and Tailwind CSS. It's designed for businesses offering cleaning services, technical maintenance, and other professional services, providing an intuitive interface for customers to browse, book, and manage service appointments.

## 🌟 Features

- **Service Categories Management**: Browse and book services across multiple categories
- **Interactive Service Booking**: Easy-to-use interface for scheduling services
- **Shopping Cart System**: Add services to cart and proceed to checkout
- **Real-time Notifications**: Stay updated with service status changes
- **Face Authentication (Optional)**: Advanced user verification using face recognition
- **Live Chat Support**: Get assistance through the integrated chat system
- **Interactive Service Demos**: Explore service features through interactive demonstrations
- **Responsive Design**: Full functionality across desktop and mobile devices
- **Multi-language Support**: Interface available in multiple languages including Thai & English
- **User Authentication**: Secure login and account management

## 🛠️ Technologies

- **Front-end**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Face Recognition**: face-api.js (optional feature)
- **Package Manager**: npm/vite
- **Development Environment**: Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/service-pro.git
cd service-pro
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) To enable face authentication features:
```bash
sh install-face-api.sh
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📋 Project Structure

```
project/
├── public/             # Static files and assets
├── src/                # Source files
│   ├── components/     # React components
│   │   ├── face/       # Face authentication components
│   │   ├── chat/       # Chat support components
│   │   └── checkout/   # Checkout flow components
│   ├── context/        # React context definitions
│   ├── data/           # JSON data files
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── tailwind.config.js  # Tailwind CSS configuration
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

## 💡 Usage

### Service Browsing

Navigate through different service categories using the top navigation menu. Each service card displays key information including price, description, and available options.

### Booking a Service

1. Select a service category
2. Choose the specific service you need
3. Configure service options if applicable
4. Click "Add to Cart" 
5. Proceed to checkout when ready

### Face Authentication

The face authentication feature provides an additional layer of security for service bookings:

1. Click the "Face ID" button in the navigation bar
2. Allow camera access when prompted
3. Position your face within the frame
4. Wait for verification to complete

Note: First-time users need to register their face by accessing their profile settings.

### Chat Support

Need assistance? Use our integrated chat support:

1. Click the chat button in the bottom right corner
2. Type your query or select from suggested topics
3. Receive real-time assistance from our support team

## 📷 Screenshots

![Home Page](https://via.placeholder.com/800x450?text=Home+Page)
![Services Page](https://via.placeholder.com/800x450?text=Services+Page)
![Chat Support](https://via.placeholder.com/800x450?text=Chat+Support)
![Face Authentication](https://via.placeholder.com/800x450?text=Face+Authentication)

## 🧰 Advanced Configuration

### Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=your_api_url
VITE_FACE_API_MODEL_PATH=path_to_models
```

### Face API Models

If using the face authentication feature, download the required models:

```bash
mkdir -p public/models
# Download models from https://github.com/justadudewhohacks/face-api.js/tree/master/weights
# Place them in the public/models directory
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Face-api.js](https://github.com/justadudewhohacks/face-api.js/) for face recognition functionality
- [React](https://reactjs.org/) for the UI library
- [Vite](https://vitejs.dev/) for the build tool and development environment
