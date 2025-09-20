# EmpowerYouth: Generative AI for Youth Mental Wellness

EmpowerYouth is an AI-powered, confidential, and empathetic mental wellness application designed to support and guide youth in India. It provides a safe and accessible space for young adults to explore their feelings, learn coping mechanisms, and access resources without the fear of judgment or stigma.

## The Challenge

Mental health remains a significant societal taboo in India, creating a formidable barrier for young adults and students seeking support. Amidst intense academic and social pressures, these individuals often lack a confidential, accessible, and non-judgmental outlet to address their mental health concerns. The existing landscape of professional mental healthcare is often out of reach due to high costs, limited availability, and the pervasive social stigma associated with seeking help.

## Our Solution

EmpowerYouth leverages Google's generative AI to offer a suite of tools that are culturally aware and designed to meet the specific needs of Indian youth. The application serves as a supportive companion, promoting emotional well-being and providing actionable tools to build mental resilience.

## Key Features

-   **AI-Powered Empathetic Chat**: A core feature of the app is a confidential AI assistant, available 24/7. It's designed to be an empathetic listener, providing a safe space for users to express themselves. The AI is trained to be culturally sensitive and can guide users to relevant in-app tools and exercises.
-   **Cognitive Behavioral Therapy (CBT) Exercises**: A collection of interactive, evidence-based tools to help users manage their thoughts and feelings.
    -   **Cognitive Reframing**: Helps users identify and challenge negative thought patterns, offering more balanced perspectives.
    -   **Mindful Breathing**: A guided animation to help users calm down during moments of stress or anxiety.
    -   **AI-Generated Journaling Prompts**: Provides thoughtful, AI-generated prompts to encourage self-reflection and emotional exploration.
    -   **Gratitude Practice**: A simple tool to help users focus on the positive aspects of their life by logging things they are grateful for.
-   **Mood Tracking**: Allows users to log their daily mood, helping them recognize patterns and understand their emotional landscape over time through a visual chart.
-   **Personal Safety Plan**: A private and secure space for users to create a personalized plan to keep them safe during moments of crisis. This data is stored locally on the user's device for maximum privacy.
-   **Emergency Resources**: A curated list of verified helplines and support organizations in India that users can contact for immediate help.
-   **Privacy by Design**: The platform is built with user privacy as a top priority. Features include anonymous profiles and end-to-end encryption for all conversations.

## Technology Stack

-   **Frontend**: [Next.js](https://nextjs.org/) (with App Router) & [React](https://reactjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
-   **Generative AI**: Google's [Gemini](https://deepmind.google/technologies/gemini/) models via [Genkit](https://firebase.google.com/docs/genkit)
-   **Deployment**: [Firebase App Hosting](https://firebase.google.com/docs/hosting)

## Getting Started

To run this project locally, you will need to have Node.js and npm installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/empoweryouth.git
    cd empoweryouth
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.

---

This project aims to be a meaningful step towards destigmatizing mental health conversations and providing accessible support to the youth of India.
