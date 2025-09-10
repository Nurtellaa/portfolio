import { Project } from "../models/project.model";

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: 'Sproutly',
        description: 'Micro-content social network for sharing posts with multimedia.',
        technologies: [
  { name: 'Angular', iconUrl: 'assets/icons/angular.png', experienceLevel: 'advanced' },
  { name: 'Django', iconUrl: 'assets/icons/django.png', experienceLevel: 'intermediate' },
  { name: 'PostgreSQL', iconUrl: 'assets/icons/postgresql.png', experienceLevel: 'intermediate' },
  { name: 'Docker', iconUrl: 'assets/icons/docker.png', experienceLevel: 'beginner' }
],
        features: [
            'JWT authentication with refresh tokens',
            'Feed of posts with images, videos, and documents',
            'Followers system and real-time notifications',
            'Chat with WebSocket + database persistence'
        ],
        contribution: 'Designed the frontend architecture in Angular and implemented the API with Django Channels.',
        screenshots: [
            '/assets/projects/sproutly1.png',
            '/assets/projects/sproutly2.png'
        ],
        demoUrl: 'https://sproutly-demo.vercel.app',
        repoUrl: 'https://github.com/usuario/sproutly',
        status: 'active'
    },
    {
        id: 2,
        title: 'TaskFlow',
        description: 'A collaborative task management platform for teams.',
technologies: [
  { name: 'Angular', iconUrl: 'assets/icons/angular.png', experienceLevel: 'advanced' },
  { name: 'Django', iconUrl: 'assets/icons/django.png', experienceLevel: 'intermediate' },
  { name: 'PostgreSQL', iconUrl: 'assets/icons/postgresql.png', experienceLevel: 'intermediate' },
  { name: 'Docker', iconUrl: 'assets/icons/docker.png', experienceLevel: 'beginner' }
],        features: [
            'Real-time task updates and notifications',
            'Drag-and-drop Kanban board',
            'User roles and permissions',
            'Integration with Google Calendar'
        ],
        contribution: 'Developed the backend API and integrated real-time features using Socket.IO.',
        screenshots: [
            '/assets/projects/taskflow1.png',
            '/assets/projects/taskflow2.png'
        ],
        demoUrl: 'https://taskflow-demo.vercel.app',
        repoUrl: 'https://github.com/usuario/taskflow',
        status: 'active'
    },
    {
        id: 3,
        title: 'ChatVerse',
        description: 'E-commerce platform focused on eco-friendly products.',
technologies: [
  { name: 'Angular', iconUrl: 'assets/icons/angular.png', experienceLevel: 'advanced' },
  { name: 'Django', iconUrl: 'assets/icons/django.png', experienceLevel: 'intermediate' },
  { name: 'PostgreSQL', iconUrl: 'assets/icons/postgresql.png', experienceLevel: 'intermediate' },
  { name: 'Docker', iconUrl: 'assets/icons/docker.png', experienceLevel: 'beginner' }
],        features: [
            'Product catalog with filtering and search',
            'Secure payments with Stripe',
            'User reviews and ratings',
            'Admin dashboard for inventory management'
        ],
        contribution: 'Implemented the payment system and developed the admin dashboard.',
        screenshots: [
            '/assets/projects/chatverse1.png',
            '/assets/projects/chatverse2.png'
        ],
        demoUrl: 'https://ecoshop-demo.vercel.app',
        repoUrl: 'https://github.com/usuario/ecoshop',
        status: 'in-progress'
    }
];