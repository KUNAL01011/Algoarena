
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface UpcomingRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  contestTitle: string;
}

const UpcomingRegisterModal = ({ isOpen, onClose, contestTitle }: UpcomingRegisterModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    reminder: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Successfully registered for contest!");
    onClose();
    setFormData({ name: "", email: "", password: "", reminder: false });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-craft-panel border-craft-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-craft-text-primary text-xl">Register for Contest</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-craft-text-primary mb-2">{contestTitle}</h3>
            <p className="text-sm text-craft-text-secondary">
              Secure your spot in this upcoming contest
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-craft-text-primary">Full Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-craft-bg border-craft-border text-craft-text-primary"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-craft-text-primary">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-craft-bg border-craft-border text-craft-text-primary"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-craft-text-primary">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="bg-craft-bg border-craft-border text-craft-text-primary"
                placeholder="Create a password"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-craft-bg rounded-lg border border-craft-border">
              <div>
                <Label htmlFor="reminder" className="text-craft-text-primary font-medium">
                  Email Reminder
                </Label>
                <p className="text-sm text-craft-text-secondary">
                  Get notified 30 minutes before contest starts
                </p>
              </div>
              <Switch
                id="reminder"
                checked={formData.reminder}
                onCheckedChange={(checked) => handleInputChange("reminder", checked)}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRegister}
              className="flex-1 bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
            >
              Register
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpcomingRegisterModal;