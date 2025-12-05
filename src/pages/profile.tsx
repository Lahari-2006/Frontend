import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, Edit3, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import API from "./api";

const Profile = () => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // --------------------------------------------------
  // LOAD PROFILE DATA ONLY
  // --------------------------------------------------
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");

      try {
        const profileRes = await API.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData({
          name: profileRes.data.name,
          email: profileRes.data.email,
          phone: profileRes.data.phone || "",
        });

      } catch (error) {
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

  // --------------------------------------------------
  // SAVE CHANGES
  // --------------------------------------------------
  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      await API.put(
        "/profile",
        {
          name: formData.name,
          phone: formData.phone,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast({
        title: "Success!",
        description: "Profile updated successfully",
      });
      setEditMode(false);
    } catch {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
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
      <div className="container mx-auto max-w-4xl">
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
            Manage your personal information
          </p>
        </motion.div>

        {/* PROFILE CARD ONLY (NO TABS ANYMORE) */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="space-y-2">
                  <Label className="font-medium flex items-center gap-2">
                    <Mail size={16} />
                    Email
                  </Label>
                  <Input disabled value={formData.email} className="bg-gray-50" />
                </div>

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

          {/* VERIFICATION BADGES */}
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
      </div>
    </div>
  );
};

export default Profile;
