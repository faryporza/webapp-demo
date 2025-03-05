#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")"

# Install all dependencies including react-router-dom
npm install

# Verify that react-router-dom was installed
echo "Checking installation of react-router-dom..."
if [ -d "node_modules/react-router-dom" ]; then
  echo "✅ react-router-dom has been installed successfully"
else
  echo "❌ react-router-dom installation failed. Trying a direct install..."
  npm install react-router-dom
fi

echo "Done! You can now start the application with 'npm run dev'"
