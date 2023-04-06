# Code Together

## Getting Started
To run the project locally, you'll need to have Node.js and npm installed. Once you have those installed, you can follow these steps:

Clone this repository to your local machine using git clone https://github.com/your-username/code-together.git.
Navigate to the project directory and run npm install to install the project's dependencies.
Start the development server with npm run dev.
Navigate to http://localhost:3000 in your web browser to see the app running.

## Project Structure
This project is built with Next.js and PrismatDB. The project structure is as follows:

```
.
├── data
│   └── questions.json
├── pages
│   ├── api
│   │   └── questions.ts
│   ├── index.tsx
│   └── room
│       ├── [id].tsx
│       └── index.tsx
├── public
│   └── favicon.ico
├── styles
│   ├── globals.css
│   └── Home.module.css
├── tsconfig.json
├── README.md
├── package.json
└── package-lock.json
```

The data directory contains a JSON file with sample questions data.
The pages directory contains Next.js pages, including the home page (index.tsx), room pages (room/[id].tsx), and an API route for getting questions data (api/questions.ts).
The public directory contains static assets like images and favicon.
The styles directory contains global CSS styles and module-specific styles.
The tsconfig.json file contains the TypeScript configuration for the project.
README.md is this file you're reading right now.
package.json and package-lock.json contain information about the project's dependencies and scripts.

# Contributing
Contributions to this project are welcome! If you notice a bug or would like to add a feature, feel free to open a pull request or issue on this repository.

# License
This project is licensed under the MIT License. Feel free to use and modify this project for your own purposes.
