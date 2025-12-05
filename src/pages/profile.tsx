import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, Mail, Phone, ShieldCheck, Edit3, Calendar, 
  MessageSquare, Clock, CheckCircle, XCircle, AlertCircle 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import API from "./api";

interface Appointment {
  id: number;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes?: string;
}

interface Message {
  id: number;
  subject: string;
  content: string;
  created_at: string;
  status: "pending" | "responded";
}

const Profile = () => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // -------------------------------------------
  // 1️⃣ LOAD PROFILE DATA FROM BACKEND
  // -------------------------------------------
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      
      try {
        // Fetch profile
        const profileRes = await API.get("/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setFormData({
          name: profileRes.data.name,
          email: profileRes.data.email,
          phone: profileRes.data.phone || "",
        });

        // Fetch appointments
        const appointmentsRes = await API.get("/appointments/my-appointments", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(appointmentsRes.data || []);

        // Fetch messages
        const messagesRes = await API.get("/messages/my-messages", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(messagesRes.data || []);

      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [toast]);

  // -------------------------------------------
  // 2️⃣ SAVE PROFILE CHANGES
  // -------------------------------------------
  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      await API.put("/profile", 
        {
          name: formData.name,
          phone: formData.phone,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast({
        title: "Success!",
        description: "Profile updated successfully",
      });
      setEditMode(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  // -------------------------------------------
  // 3️⃣ CANCEL APPOINTMENT
  // -------------------------------------------
  const handleCancelAppointment = async (appointmentId: number) => {
    const token = localStorage.getItem("token");

    try {
      await API.put(`/appointments/${appointmentId}/cancel`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAppointments(prev =>
        prev.map(apt =>
          apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt
        )
      );

      toast({
        title: "Cancelled",
        description: "Appointment cancelled successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel appointment",
        variant: "destructive",
      });
    }
  };

  // -------------------------------------------
  // 4️⃣ STATUS BADGE COMPONENT
  // -------------------------------------------
  const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock size={14} /> },
      confirmed: { color: "bg-green-100 text-green-800", icon: <CheckCircle size={14} /> },
      cancelled: { color: "bg-red-100 text-red-800", icon: <XCircle size={14} /> },
      completed: { color: "bg-blue-100 text-blue-800", icon: <CheckCircle size={14} /> },
      responded: { color: "bg-green-100 text-green-800", icon: <CheckCircle size={14} /> },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto max-w-6xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Your Profile
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account, bookings, and messages
          </p>
        </motion.div>

        {/* TABS */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white shadow-md rounded-lg">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User size={18} />
              Profile
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar size={18} />
              Appointments ({appointments.length})
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare size={18} />
              Messages ({messages.length})
            </TabsTrigger>
          </TabsList>

          {/* 📋 PROFILE TAB */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border border-blue-100 shadow-lg rounded-2xl bg-white">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-xl text-white">
                      <User size={48} />
                    </div>
                  </div>

                  <CardTitle className="text-2xl font-semibold text-blue-900">
                    {formData.name}
                  </CardTitle>

                  <p className="text-sm text-blue-700/70">RB Financial Consultancy User</p>
                </CardHeader>

                <CardContent className="space-y-6 mt-6">
                  {/* FORM */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* NAME */}
                    <div className="space-y-2">
                      <Label className="font-medium flex items-center gap-2">
                        <User size={16} />
                        Full Name
                      </Label>
                      <Input
                        disabled={!editMode}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>

                    {/* EMAIL (READ ONLY) */}
                    <div className="space-y-2">
                      <Label className="font-medium flex items-center gap-2">
                        <Mail size={16} />
                        Email
                      </Label>
                      <Input 
                        disabled 
                        value={formData.email}
                        className="bg-gray-50"
                      />
                    </div>

                    {/* PHONE */}
                    <div className="space-y-2">
                      <Label className="font-medium flex items-center gap-2">
                        <Phone size={16} />
                        Phone Number
                      </Label>
                      <Input
                        disabled={!editMode}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex justify-end gap-3 pt-4">
                    {!editMode ? (
                      <Button
                        onClick={() => setEditMode(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                      >
                        <Edit3 size={18} />
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={() => setEditMode(false)}
                          variant="outline"
                          className="border-blue-500 text-blue-600"
                        >
                          Cancel
                        </Button>

                        <Button
                          onClick={handleSave}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Save Changes
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* BADGES */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
              >
                {[
                  {
                    icon: <ShieldCheck className="w-6 h-6 text-blue-700" />,
                    label: "Verified User",
                  },
                  {
                    icon: <Mail className="w-6 h-6 text-blue-700" />,
                    label: "Email Verified",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl bg-white shadow-md border border-blue-100 flex items-center gap-4"
                  >
                    {item.icon}
                    <p className="font-medium text-blue-900">{item.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* 📅 APPOINTMENTS TAB */}
          <TabsContent value="appointments">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {appointments.length === 0 ? (
                <Card className="p-12 text-center bg-white">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Appointments Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You haven't booked any appointments yet. Visit our services page to get started!
                  </p>
                  <Button 
                    onClick={() => window.location.href = "/services"}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Browse Services
                  </Button>
                </Card>
              ) : (
                appointments.map((appointment) => (
                  <Card key={appointment.id} className="p-6 bg-white hover:shadow-lg transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {appointment.service}
                          </h3>
                          <StatusBadge status={appointment.status} />
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <Calendar size={16} className="text-blue-600" />
                            {new Date(appointment.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock size={16} className="text-blue-600" />
                            {appointment.time}
                          </p>
                          {appointment.notes && (
                            <p className="mt-2 text-gray-700">
                              <strong>Notes:</strong> {appointment.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      {appointment.status === "pending" && (
                        <Button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          variant="outline"
                          className="ml-4 border-red-500 text-red-600 hover:bg-red-50"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </motion.div>
          </TabsContent>

          {/* 💬 MESSAGES TAB */}
          <TabsContent value="messages">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {messages.length === 0 ? (
                <Card className="p-12 text-center bg-white">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Messages Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You haven't sent any messages yet. Contact us for inquiries!
                  </p>
                  <Button 
                    onClick={() => window.location.href = "/contact"}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Contact Us
                  </Button>
                </Card>
              ) : (
                messages.map((message) => (
                  <Card key={message.id} className="p-6 bg-white hover:shadow-lg transition">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {message.subject}
                      </h3>
                      <StatusBadge status={message.status} />
                    </div>
                    
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {message.content}
                    </p>
                    
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <Clock size={12} />
                      Sent on {new Date(message.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </Card>
                ))
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;