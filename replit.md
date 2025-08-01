# Akin's Portfolio Application

## Overview

This is a modern portfolio website built with pure HTML, CSS, and JavaScript, enhanced with a Node.js backend for development. The application showcases Akin's software development projects and includes interactive features like a working music player, 3D text animations, and smooth scroll effects. The site features professional gradient buttons and dynamic visual effects while maintaining performance and accessibility.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Core Technologies**: HTML5, CSS3, Vanilla JavaScript
- **Styling Approach**: Custom CSS with utility classes and animations
- **Fonts**: Google Fonts (Inter & Space Grotesk)
- **Asset Management**: Direct file references for images and audio
- **Deployment**: Static file hosting compatible (GitHub Pages ready)

### No Backend Required
- **Static Site**: Pure client-side implementation
- **Contact Form**: mailto: links for email communication
- **Asset Storage**: Local file storage in attached_assets directory
- **No Database**: All content hardcoded in HTML for simplicity

### Key Features Implementation
- **3D Welcome Text**: Dynamic scroll-based transforms with perspective and shadows
- **Music Player**: Enhanced HTML5 audio with proper loading and error handling
- **Scroll Effects**: Intersection Observer API for performance-optimized reveals
- **Professional Buttons**: Gradient styling without underlines for clean appearance
- **Responsive Design**: CSS Grid and Flexbox with media queries

## Key Components

### Client-Side Components
1. **Portfolio Showcase**: Interactive project cards with technology badges and gradient buttons
2. **Music Player**: Enhanced audio playback with robust loading and error handling
3. **3D Welcome Text**: Dynamic scroll-based text effects with perspective transforms
4. **Scroll Effects**: Intersection Observer-based reveal animations
5. **Responsive Design**: Mobile-first approach with adaptive layouts

### Recent Changes (July 31, 2025)
- ✓ Fixed music player functionality with improved audio loading and error handling
- ✓ Removed 3D floating cube from header, replaced with clean portfolio branding
- ✓ Added dynamic 3D scroll effects to "Welcome" text with perspective and shadows
- ✓ Redesigned all buttons with professional gradient styling
- ✓ Removed underlines from all links for cleaner appearance
- ✓ Enhanced user experience with better visual feedback and interactions

### Server-Side Components
1. **Express Server**: RESTful API structure with middleware
2. **Storage Interface**: Abstracted data layer with CRUD operations
3. **Development Tools**: Vite integration for hot reloading
4. **Request Logging**: Comprehensive request/response logging

### Shared Components
1. **Schema Definitions**: Centralized TypeScript types and Zod schemas
2. **Database Models**: Drizzle schema for user management
3. **Type Safety**: End-to-end type safety between client and server

## Data Flow

### Development Flow
1. Client requests → Vite middleware → React application
2. API requests → Express server → Storage interface → In-memory storage
3. Static assets served through Vite's asset handling

### Production Flow
1. Client requests → Served static files from dist/public
2. API requests → Express server → Database via Drizzle ORM
3. Session management through PostgreSQL session store

### State Management
1. Client state managed through React hooks and context
2. Server state managed through TanStack Query
3. Form state handled with React Hook Form and Zod validation

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing
- **react-hook-form**: Form management
- **zod**: Schema validation

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives (20+ components)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Production bundling
- **drizzle-kit**: Database schema management

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: NODE_ENV=development with tsx and Vite HMR
- **Production**: NODE_ENV=production with built static files
- **Database**: DATABASE_URL environment variable required

### Hosting Requirements
- Node.js runtime for Express server
- PostgreSQL database (configured for Neon)
- Static file serving capability
- Environment variable support

### Key Scripts
- `dev`: Start development server with hot reloading
- `build`: Build both frontend and backend for production
- `start`: Run production server
- `db:push`: Apply database schema changes