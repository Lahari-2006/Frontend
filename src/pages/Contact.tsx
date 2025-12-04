import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { servicesData } from "@/data/servicesData";
import API from "./api";

const Contact = () => {
  const { toast } = useToast();

  // Get logged-in user email
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const loggedInEmail = storedUser?.email || "";

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // Email validation (strong)
  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/
      );
  };

  // Phone validation (10 digits only)
  const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone);

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Name validation
    if (!/^[A-Za-z ]{3,}$/.test(formData.name.trim())) {
      toast({
        title: "Invalid Name",
        description: "Please enter your full name (letters only).",
        variant: "destructive",
      });
      return;
    }

    // Email validation must match logged-in user
    if (formData.email.trim().toLowerCase() !== loggedInEmail.toLowerCase()) {
      toast({
        title: "Email Mismatch",
        description: "Use the same email you used during login.",
        variant: "destructive",
      });
      return;
    }

    // Strong email format validation
    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Phone validation
    if (!validatePhone(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Phone number must be 10 digits.",
        variant: "destructive",
      });
      return;
    }

    // Check service + message
    if (!formData.service || !formData.message.trim()) {
      toast({
        title: "Missing Details",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);

      await API.post("/messages", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.service,
        content: formData.message,
      });

      toast({
        title: "Message Sent!",
        description: "Thank you! Our team will contact you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.detail ??
          "Unable to send the message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-24 bg-white">
      <div className="container mx-auto px-6">

        {/* PAGE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We're here to assist you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 max-w-7xl mx-auto">

          {/* LEFT SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-10"
          >
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Reach Us At
              </h2>
              <p className="text-gray-600">
                We're available Monday–Saturday. Contact us anytime.
              </p>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="p-4 rounded-xl bg-blue-50 text-blue-600 shadow-sm">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600">rbfinancialconsultancy.otp@gmail.com</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="p-4 rounded-xl bg-blue-50 text-blue-600 shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Office Address</h3>
                <p className="text-gray-600">Vijayawada, Andhra Pradesh – 520008</p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">
                Why Choose RB Financial?
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✓ Accurate & timely compliance</li>
                <li>✓ Transparent & reliable service</li>
                <li>✓ High customer satisfaction</li>
                <li>✓ End-to-end business support</li>
              </ul>
            </div>
          </motion.div>

          {/* RIGHT SECTION — FORM */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-10 rounded-2xl shadow-xl border border-blue-100"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name*</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address*</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number*</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="10-digit phone number"
                  required
                />
              </div>

              {/* Service */}
              <div className="space-y-2">
                <Label>Service*</Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) =>
                    setFormData({ ...formData, service: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>

                  <SelectContent>
                    {servicesData.map((category) => (
                      <SelectItem key={category.id} value={category.title}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message*</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  placeholder="Tell us about your requirements..."
                  required
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                disabled={submitting}
              >
                <Send className="w-4 h-4 mr-2" />
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
