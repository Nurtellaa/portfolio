export interface Project {
    id: number;                   // Unique identifier
    title: string;                // Project name
    description: string;          // Brief project summary
    technologies: Tecnologies[];       // List of technologies used
    features: string[];           // List of main features
    contribution: string;         // Your contribution / technical challenges
    screenshots?: string[];       // URLs to images or screenshots
    demoUrl?: string;             // Live demo URL
    repoUrl?: string;             // Repository URL (GitHub, etc.)
    blogUrl?: string;             // Optional article or explanation
    status: string; // Project status
}
export interface Tecnologies {
    name: string;                 // Technology name (e.g., Angular, Node.js)
    iconUrl?: string;             // Optional URL to an icon or logo
    experienceLevel?: 'beginner' | 'intermediate' | 'advanced'; // Optional experience level
}