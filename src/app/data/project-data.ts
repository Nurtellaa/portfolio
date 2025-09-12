import { Project } from "../models/project.model";

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: 'Sproutly',
        description: 'Sproutly is a collaborative academic social network built with Django REST Framework and Ionic Angular. It allows users to share, rate, and save notes in various formats (text, image, document, video) from their mobile devices or web browsers.',
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
            'Ionic Angular mobile app with Capacitor for native Android deployment'
        ],
        contribution: 'This project was developed as part of the Final Degree Project for Multiplatform Application Development (DAM).',
        screenshots: [
            'assets/projects/sproutly1.png',
            'assets/projects/sproutly2.png'
        ],
        repoUrl: 'https://github.com/Nurtellaa/sproutly',
        status: 'in-progress'
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
            'assets/projects/taskflow1.png',
            'assets/projects/taskflow2.png'
        ],
        status: 'Working on it (soon available)'
    },
    {
        "id": 3,
        "title": "Helium",
        "description": "Helium is an innovative digital platform designed specifically for the distribution of indie video games in the Cantabria region. It combines modern technology with efficient business management to connect developers with players.",
        "technologies": [
            { "name": "Spring Boot", "iconUrl": "assets/icons/springboot.png", "experienceLevel": "advanced" },
            { "name": "JavaFX", "iconUrl": "assets/icons/javafx.png", "experienceLevel": "advanced" },
            { "name": "JWT", "iconUrl": "assets/icons/jwt.png", "experienceLevel": "advanced" },
            { "name": "MySQL", "iconUrl": "assets/icons/mysql.png", "experienceLevel": "intermediate" },
            { "name": "Hibernate", "iconUrl": "assets/icons/hibernate.png", "experienceLevel": "intermediate" },
            { "name": "Maven", "iconUrl": "assets/icons/maven.png", "experienceLevel": "intermediate" }
        ],
        "features": [
            "Secure JWT authentication system",
            "Download manager with pause/resume functionality",
            "Personal video game library",
            "Thematic collections system",
            "Developer panel for uploading games",
            "Alerts and notifications system",
            "Indie game catalog",
            "JavaFX user interface"
        ],
        "contribution": "Developed the complete JWT authentication system, implemented the download manager with EntityManager for data persistence, and designed the JavaFX user interface for library and collections management.",
        "screenshots": [
            "assets/projects/helium1.png",
            "assets/projects/helium2.png"
        ],
        "repoUrl": "https://github.com/Nurtellaa/helium",
        "status": "in-progress"
    }
];