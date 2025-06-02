# Tobi AI Assistant

![Tobi AI Assistant Screenshot](https://d1fvq72qdoyrow.cloudfront.net/683dfbc1e52ac800113d5192/49e5299f-cddd-4160-bee9-186eb13db0dd---jj.png?Expires=1748979108&Key-Pair-Id=K30Q3TNPY13FGE&Signature=VC5Bq0ph-4QsrGvfq4-Nk86qvzk8sc-AE3czd1XfTyo5P8gfNxSIzrkNcQagIx8nZhOKFN6Qns9SHNzdUfQWOLTvcuLojUJtPl02gC2eD2e3iHZQ1Wzy15ClaMFVNxfpe5q2LhBj~aLvz6CKFiksWsL6OumrFIE2tRUraid2tnHadWqps-XRL9Vb-H09WszQ~dkyt4bkIXE1hDut~-HW-OmQ4jRTFUa~byZfm9mcHvJ2q8k6EY4OzbTd1t5zObe5dFuOM6hrYtwJDYEncwpb2b8cGD2UDzSfYcfzJWCqOlngRFrwwPVj5A0MmjQtjctDyinum-EBIHiVSUoBCAlzUA)


Tobi AI Assistant is an interactive AI chatbot built with Natural Language Processing (NLP) capabilities. Developed by Aluko Oluwatobi, this assistant is designed to provide information and engage in conversations about AI, software development, programming languages, and other technical topics.

## Features

*   **Interactive Chat Interface**: A clean and intuitive user interface for seamless conversations.
*   **Natural Language Processing (NLP)**: Understands and responds to user queries using custom NLP logic.
*   **Task-Specific Responses**: Provides tailored answers for greetings, developer information, AI concepts, NLP explanations, programming advice, and transformer models.
*   **Dynamic Dark Mode**: Toggle between light and dark themes for a comfortable viewing experience.
*   **Typing Indicator**: Shows when the AI is processing a response.
*   **Responsive Design**: Optimized for various screen sizes, from desktop to mobile.
*   **Message Read Status**: Indicates when AI messages have been "read" (simulated).

## Technologies Used

This project leverages a modern web development stack to deliver a fast, robust, and scalable application.

*   **Frontend**:
    *   [React](https://react.dev/): A JavaScript library for building user interfaces.
    *   [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.
    *   [Vite](https://vitejs.dev/): A fast build tool that provides an excellent development experience.
*   **Styling**:
    *   [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs.
*   **Icons**:
    *   [Lucide React](https://lucide.dev/): A collection of beautiful and customizable open-source icons.
*   **Code Quality**:
    *   [ESLint](https://eslint.org/): A static code analysis tool for identifying problematic patterns found in JavaScript code.
    *   [Prettier](https://prettier.io/): An opinionated code formatter.
*   **NLP Logic**:
    *   Custom implementation in `src/services/nlpService.ts` and `src/services/intents.ts` for pattern matching and response generation.

## Setup and Installation

Follow these steps to get the Tobi AI Assistant running on your local machine.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (Node Package Manager) or Yarn

### Steps

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Oluwat-dev/TobiAI_Assistant.git
    ```


2.  **Navigate to the project directory**:
    ```bash
    cd tobi-ai-assistant
    ```

3.  **Install dependencies**:
    ```bash
    npm install
    # or
    # yarn install
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    # or
    # yarn dev
    ```

    This will start the development server, usually at `http://localhost:5173`. Open your browser and navigate to this address to see the application in action.

5.  **Build for production (optional)**:
    ```bash
    npm run build
    # or
    # yarn build
    ```
    This command compiles the application into static files for deployment.

## Usage

Once the application is running, you can interact with the Tobi AI Assistant by typing your messages into the input field at the bottom of the chat interface and pressing Enter or clicking the send button.

Try asking questions about:
*   "What is AI?"
*   "Who developed you?"
*   "Explain NLP."
*   "What can you do?"
*   "Tell me about programming languages." and lots more...

## Project Structure
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # Reusable React components
│   │   ├── ChatInterface.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── MessageList.tsx
│   │   └── TypingIndicator.tsx
│   ├── services/           # Business logic and NLP services
│   │   ├── intents.ts      # Defines AI intents and responses
│   │   └── nlpService.ts   # Handles message processing and response generation
│   ├── types/              # TypeScript type definitions
│   │   └── Message.ts
│   ├── utils/              # Utility functions
│   │   └── dateUtils.ts
│   ├── App.tsx             # Main application component
│   ├── index.css           # Tailwind CSS imports
│   └── main.tsx            # Entry point for the React application
├── .eslintrc.js            # ESLint configuration
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration for Tailwind CSS
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts          # Vite build tool configuration



## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add new feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Contact

For any questions or inquiries, please reach out me:

*   **Aluko Oluwatobi**
    *   [GitHub Profile](https://github.com/Oluwat-dev) 
    *   [LinkedIn Profile](https://www.linkedin.com/in/aluko-oluwatobi/](https://www.linkedin.com/in/aluko-oluwatobi-a2536823a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)

