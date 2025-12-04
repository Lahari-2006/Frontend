import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, ShieldCheck, Edit3 } from "lucide-react";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // -------------------------------------------
  // 1️⃣ LOAD PROFILE DATA FROM BACKEND
  // -------------------------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone || "",
        });
      });
  }, []);

  // -------------------------------------------
  // 2️⃣ SAVE PROFILE CHANGES
  // -------------------------------------------
  const handleSave = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8000/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
      }),
    });

    if (res.ok) {
      alert("Profile updated successfully");
      setEditMode(false);
    } else {
      alert("Failed to update profile");
    }
  };

  // -------------------------------------------
  // 3️⃣ CHANGE PASSWORD
  // -------------------------------------------
  const changePassword = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8000/profile/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    if (res.ok) {
      alert("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } else {
      alert("Current password is incorrect");
    }
  };

  return (
    <div className="min-h-screen py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
            Your Profile
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your account details and preferences
          </p>
        </motion.div>

        {/* PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border border-blue-100 shadow-lg rounded-2xl bg-white/80 backdrop-blur-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div
                  className="
                    w-28 h-28 rounded-full 
                    bg-gradient-to-br from-blue-600 to-blue-400 
                    flex items-center justify-center shadow-xl
                    text-white
                  "
                >
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
                  <Label className="font-medium">Full Name</Label>
                  <Input
                    disabled={!editMode}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                {/* EMAIL (READ ONLY) */}
                <div className="space-y-2">
                  <Label className="font-medium">Email</Label>
                  <Input disabled value={formData.email} />
                </div>

                {/* PHONE */}
                <div className="space-y-2">
                  <Label className="font-medium">Phone Number</Label>
                  <Input
                    disabled={!editMode}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
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
        </motion.div>

        

        {/* BADGES */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
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
      </div>
    </div>
  );
};

export default Profile;
