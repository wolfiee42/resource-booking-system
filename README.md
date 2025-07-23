# Resource Booking System

A modern web application built with Next.js and TypeScript for managing resource bookings with intelligent conflict detection and a user-friendly interface.

## 🚀 Features

- **Conflict Detection**: Automatic detection of booking conflicts with 10-minute buffer zones
- **Time Validation**:
  - Minimum booking duration: 15 minutes
  - Maximum booking duration: 2 hours
  - Future-only bookings
- **Real-time Dashboard**: View all bookings with filtering capabilities
- **Responsive Design**: Modern UI built with Tailwind CSS and ShadCN

## 🛠 Tech Stack

- **Framework**: Next.js 15.4.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Package Manager**: pnpm

## 📁 Project Structure

```
resource-booking-system-next/
├── app/                          # Next.js App Router
│   ├── api/                     # API routes
│   │   └── bookings/           # Booking API endpoints
│   │       ├── route.ts        # Main bookings API (GET, POST)
│   │       └── [id]/
│   │           └── route.ts    # Individual booking API (DELETE)
│   ├── favicon.ico
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout component
│   └── page.tsx                # Home page
│
├── components/                   # React components
│   ├── BookingDashboard/        # Dashboard-related components
│   │   ├── BookingCard.tsx     # Individual booking card
│   │   ├── BookingDashboard.tsx # Main dashboard component
│   │   ├── BookingFilters.tsx  # Filtering controls
│   │   ├── BookingsList.tsx    # List of bookings
│   │   ├── context.tsx         # Dashboard context
│   │   ├── index.tsx           # Dashboard barrel export
│   │   ├── LoadingState.tsx    # Loading skeleton
│   │   ├── StatsCards.tsx      # Statistics cards
│   │   └── types.ts            # Dashboard types
│   │
│   ├── custom-datetime-picker/  # Custom date/time picker
│   │   ├── context.tsx         # Picker context
│   │   ├── custom-datetime-picker.tsx # Main picker component
│   │   ├── index.tsx           # Picker barrel export
│   │   ├── types.ts            # Picker types
│   │   └── view.tsx            # Picker view component
│   │
│   ├── ui/                     # Reusable UI components
│   │   ├── alert.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── feature-pill.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── popover.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   └── tabs.tsx
│   │
│   ├── BookingDashboard.tsx     # Legacy dashboard component
│   ├── BookingForm.tsx          # Booking creation form
│   └── custom-datetime-picker.tsx # Legacy picker component
│
├── lib/                         # Utility libraries
│   ├── booking-store.ts         # In-memory booking storage
│   ├── booking-utils.ts         # Booking validation and utilities
│   └── utils.ts                 # General utilities
│
├── types/                       # TypeScript type definitions
│   └── booking.ts               # Booking-related types
│
├── components.json              # Shadcn/ui configuration
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── pnpm-lock.yaml             # Lock file
├── postcss.config.js          # PostCSS configuration
├── postcss.config.mjs         # PostCSS ES module config
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd resource-booking-system
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint


### Data Management

- **In-Memory Store**: Simple booking storage for development
- **API Routes**: RESTful endpoints for booking operations
- **Type Safety**: Full TypeScript support throughout

## 🔄 API Endpoints

- `GET /api/bookings` - Retrieve all bookings
- `POST /api/bookings` - Create a new booking
- `DELETE /api/bookings/[id]` - Delete a booking

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using Next.js and TypeScript
