"use client";
import { CalendarDays, Plus, Sparkles, Shield } from "lucide-react";
import { FeaturePill } from "@/components/ui/feature-pill";

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg">
      <div className="absolute inset-0 opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-2xl bg-primary/20 border border-primary/30">
              <Sparkles className="h-12 w-12 text-primary" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-green-400 to-blue-400 bg-clip-text text-transparent">
              Smart Resource
            </span>
            <br />
            <span className="text-foreground">Booking System</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience intelligent scheduling with automatic conflict detection,
            buffer time management, and seamless resource coordination.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <FeaturePill
              icon={Shield}
              text="10-min Buffer Protection"
              variant="primary"
            />
            <FeaturePill
              icon={CalendarDays}
              text="Smart Conflict Detection"
              variant="green"
            />
            <FeaturePill icon={Plus} text="Real-time Updates" variant="blue" />
          </div>
        </div>
      </div>
    </div>
  );
}
