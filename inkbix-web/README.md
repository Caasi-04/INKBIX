# InkBIX Sublimation Services

Welcome to the InkBIX project! This application is designed for a company specializing in sublimation of shirts, mugs, thermoses, glasses, and jewelry. Below you will find information on how to set up and run the project, as well as an overview of its structure and features.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the InkBIX project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/inkbix-web.git
   ```
2. Navigate to the project directory:
   ```
   cd inkbix-web
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To run the application in development mode, use the following command:
```
npm run dev
```
This will start the Vite development server, and you can view the application in your browser at `http://localhost:3000`.

## Project Structure

The project is organized as follows:

```
inkbix-web
├── src
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── assets
│   │   └── fonts
│   ├── components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   └── CartPreview.jsx
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Cart.jsx
│   │   └── Checkout.jsx
│   ├── context
│   │   └── CartContext.jsx
│   ├── hooks
│   │   └── useCart.js
│   ├── services
│   │   └── api.js
│   └── styles
│       ├── variables.css
│       └── components.css
├── public
│   └── index.html
├── tests
│   ├── App.test.jsx
│   └── pages
│       └── Products.test.jsx
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

## Features

- **Home Page**: A welcoming page with a featured image and slogan.
- **Products Page**: Displays a list of sublimation products with filtering options.
- **Product Detail Page**: Provides detailed information about each product.
- **About Page**: Shares the company's mission, vision, and team information.
- **Contact Page**: Allows users to send messages through a contact form.
- **Cart Functionality**: Users can view and manage their cart items.
- **Checkout Process**: A streamlined process for completing purchases.

## Contributing

We welcome contributions to the InkBIX project! If you have suggestions or improvements, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.