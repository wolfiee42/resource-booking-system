"use client";

import { ChangeEvent, useState } from "react";
import { RESOURCES, TBooking } from "@/types/booking";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Loader2,
  MapPin,
  Sparkles,
  User,
} from "lucide-react";
import { CustomDateTimePicker } from "./custom-datetime-picker/custom-datetime-picker";
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";

export default function BookingForm() {
  const [formData, setFormData] = useState<TBooking>({
    resource: "",
    requestedBy: "",
    startTime: "",
    endTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);
  };

  const handleInputChange = (field: string, value: string) => {
    if (error) setError("");
    if (success) setSuccess("");

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const minDateTime = new Date();
  console.log(formData);

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

        <CardContent className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Resource and User Info */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Label
                  htmlFor="resource"
                  className="flex items-center gap-2 text-base font-medium"
                >
                  <MapPin className="h-5 w-5 text-primary" />
                  Resource
                </Label>
                <Select
                  value={formData.resource}
                  onValueChange={(value) =>
                    handleInputChange("resource", value)
                  }
                >
                  <SelectTrigger className="h-12 bg-background/50 border-border/50 hover:bg-background/80 transition-colors">
                    <SelectValue placeholder="Choose your resource" />
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 border-border/50">
                    {RESOURCES.map((resource) => (
                      <SelectItem
                        key={resource}
                        value={resource}
                        className="hover:bg-primary/10"
                      >
                        {resource}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="requestedBy"
                  className="flex items-center gap-2 text-base font-medium"
                >
                  <User className="h-5 w-5 text-primary" />
                  Requested By
                </Label>
                <Input
                  id="requestedBy"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.requestedBy}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("requestedBy", e.target.value)
                  }
                  className="h-12 bg-background/50 border-border/50 hover:bg-background/80 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Date and Time Selection */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Schedule Details</h3>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <CustomDateTimePicker
                  label="Start Time"
                  placeholder="Select start date and time"
                  value={formData.startTime}
                  onChange={(value) => handleInputChange("startTime", value)}
                  minDate={minDateTime}
                />
                <CustomDateTimePicker
                  label="End Time"
                  value={formData.endTime}
                  onChange={(value) => handleInputChange("endTime", value)}
                  minDate={minDateTime}
                  placeholder="Select end date and time"
                />
              </div>
            </div>

            {/* Alerts */}
            {error && (
              <Alert
                variant="destructive"
                className="bg-destructive/10 border-destructive/20"
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-primary/10 border-primary/20 text-primary">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Creating Your Booking...
                </>
              ) : (
                <>
                  <Sparkles className="mr-3 h-5 w-5" />
                  Create Booking
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
