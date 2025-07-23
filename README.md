# Resource Booking System

A modern web application built with Next.js and TypeScript for managing resource bookings with intelligent conflict detection and a user-friendly interface.

## 🚀 Features

- **Resource Management**: Book various resources including projectors, cameras, microphones, and meeting pods
- **Conflict Detection**: Automatic detection of booking conflicts with 10-minute buffer zones
- **Time Validation**:
  - Minimum booking duration: 15 minutes
  - Maximum booking duration: 2 hours
  - Future-only bookings
- **Real-time Dashboard**: View all bookings with filtering and sorting capabilities
- **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI components
- **Custom Date/Time Picker**: Intuitive booking interface
- **Status Tracking**: Automatic status updates (upcoming, ongoing, past)

## 🛠 Tech Stack

- **Framework**: Next.js 15.4.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Date Handling**: date-fns, react-day-picker
- **Package Manager**: pnpm

## 📁 Project Structure

```
resource-booking-system-next/
├── app/                          # Next.js App Router
│   ├── api/                     # API routes
│   │   └── bookings/           # Booking API endpoints
│   │       ├── route.ts        # Main bookings API (GET, POST)
│   │       └── [id]/
│   │           └── route.ts    # Individual booking API (PUT, DELETE)
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
├── public/                      # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
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
   cd resource-booking-system-next
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

## 📋 Available Resources

The system supports booking the following resources:

- **4K Projector & Screen** - High-resolution presentation equipment
- **DSLR Camera Kit** - Professional photography equipment
- **Portable Microphone Set** - Audio recording equipment
- **Whiteboard & Markers Set** - Meeting and presentation tools
- **Drawing Tablet (Wacom)** - Digital design equipment
- **Meeting Pod** - Private meeting space

## 🔧 Key Components

### Booking System

- **Conflict Detection**: Prevents double-booking with intelligent overlap detection
- **Buffer Time**: 10-minute buffer zones between bookings
- **Validation**: Comprehensive time and duration validation
- **Status Tracking**: Automatic status updates based on current time

### UI Components

- **Custom DateTime Picker**: User-friendly date and time selection
- **Dashboard**: Real-time view of all bookings with filtering
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Accessibility**: Built with Radix UI for excellent accessibility support

### Data Management

- **In-Memory Store**: Simple booking storage for development
- **API Routes**: RESTful endpoints for booking operations
- **Type Safety**: Full TypeScript support throughout

## 🔄 API Endpoints

- `GET /api/bookings` - Retrieve all bookings
- `POST /api/bookings` - Create a new booking
- `PUT /api/bookings/[id]` - Update an existing booking
- `DELETE /api/bookings/[id]` - Delete a booking

## 🎨 Styling

The project uses a modern design system with:

- **Tailwind CSS** for utility-first styling
- **CSS Custom Properties** for theming
- **Gradient Backgrounds** for visual appeal
- **Consistent Spacing** and typography
- **Dark/Light Mode** support through CSS variables

## 🚦 Validation Rules

- **Start Time**: Must be in the future
- **End Time**: Must be after start time
- **Duration**: Minimum 15 minutes, maximum 2 hours
- **Conflicts**: Automatic detection with 10-minute buffer zones
- **Required Fields**: All booking fields are mandatory

## 🔮 Future Enhancements

- User authentication and authorization
- Email notifications for bookings
- Recurring bookings
- Resource availability calendar
- Booking history and analytics
- Database integration (PostgreSQL/MongoDB)
- Real-time updates with WebSockets

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using Next.js and TypeScript
