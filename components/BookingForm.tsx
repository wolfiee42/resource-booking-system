"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function BookingForm() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="card-gradient shadow-2xl">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/20 border border-primary/30">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
            Reserve Your Resource
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Book shared resources with intelligent conflict detection and
            10-minute buffer protection
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
