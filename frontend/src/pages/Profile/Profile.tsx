import { useState, useCallback } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const signupEmail = "user@neonwave.com";

  const [profile, setProfile] = useState({
    username: "NeonVoyager",
    favoriteCharacter: "Revy",
    bio: "Quantum enthusiast surfing the digital wave",
  });

  const [formData, setFormData] = useState({
    username: profile.username,
    favoriteCharacter: profile.favoriteCharacter,
    bio: profile.bio,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = useCallback((e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSaveChanges = useCallback(async () => {
    if (!formData.username.trim() || !formData.favoriteCharacter.trim()) return;

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setProfile(formData);
    setIsSaving(false);
    navigate("/");
  }, [formData, navigate]);

  // Refined color palette with purplish, pinkish, and cyanish tones
  const colors = {
    containerBg: "linear-gradient(145deg, rgba(15, 10, 30, 0.9) 0%, rgba(40, 20, 50, 0.85) 100%)",
    containerBorder: "rgba(147, 51, 234, 0.3)",
    inputBg: "rgba(25, 20, 45, 0.8)",
    inputBorder: "rgba(147, 51, 234, 0.4)",
    inputFocus: "rgba(236, 72, 153, 0.6)",
    primary: "linear-gradient(90deg, #7c3aed 0%, #ec4899 100%)",
    primaryHover: "linear-gradient(90deg, #6d28d9 0%, #db2777 100%)",
    textPrimary: "#f3e8ff",
    textSecondary: "rgba(216, 180, 254, 0.7)",
    cancelButton: "rgba(60, 45, 75, 0.6)",
    cancelHover: "rgba(90, 70, 105, 0.8)",
    avatarBg: "linear-gradient(135deg, #ec4899 0%, #22d3ee 100%)",
    glow: "0 0 12px rgba(147, 51, 234, 0.4)",
  };

  return (
    <div className="min-h-screen bg-[#0f0a1e] overflow-hidden relative text-white">
      {/* Subtle background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1),transparent_70%)] pointer-events-none" />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-xs p-6 rounded-2xl shadow-xl"
            style={{
              background: colors.containerBg,
              border: `1px solid ${colors.containerBorder}`,
              boxShadow: colors.glow,
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="relative z-10">
              <div className="flex flex-col items-center mb-6">
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 2,
                    transition: { 
                      type: "spring",
                      stiffness: 300,
                      damping: 10 
                    }
                  }}
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg cursor-pointer"
                  style={{
                    background: colors.avatarBg,
                    boxShadow: `${colors.glow}, inset 0 0 8px rgba(0, 0, 0, 0.5)`,
                  }}
                >
                  {profile.username.charAt(0)}
                </motion.div>

                <h1 className="text-2xl font-bold mt-3 tracking-wide" style={{ color: colors.textPrimary }}>
                  {profile.username}
                </h1>
                <p className="text-xs mt-1 font-mono" style={{ color: colors.textSecondary }}>
                  Edit your neon profile
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium uppercase tracking-widest mb-1 block" style={{ color: colors.textSecondary }}>
                    Email
                  </label>
                  <motion.div
                    whileHover={{ 
                      y: -1,
                      transition: { duration: 0.2 }
                    }}
                    className="mt-1 p-2.5 rounded-lg text-xs font-mono tracking-tight"
                    style={{
                      background: colors.inputBg,
                      border: `1px solid ${colors.inputBorder}`,
                      color: colors.textPrimary,
                      boxShadow: "inset 0 0 4px rgba(147, 51, 234, 0.2)",
                    }}
                  >
                    {signupEmail}
                  </motion.div>
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-widest mb-1 block" style={{ color: colors.textSecondary }}>
                    Username
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <Input
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter username"
                      className="w-full text-xs px-3 py-2 rounded-lg font-medium transition-all focus:ring-2"
                      style={{
                        background: colors.inputBg,
                        border: `1px solid ${colors.inputBorder}`,
                        color: colors.textPrimary,
                        boxShadow: "inset 0 0 4px rgba(147, 51, 234, 0.2)",
                        outline: "none",
                      }}
                    />
                  </motion.div>
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-widest mb-1 block" style={{ color: colors.textSecondary }}>
                    Favorite Character
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <Input
                      name="favoriteCharacter"
                      value={formData.favoriteCharacter}
                      onChange={handleInputChange}
                      placeholder="Your favorite character"
                      className="w-full text-xs px-3 py-2 rounded-lg font-medium transition-all focus:ring-2"
                      style={{
                        background: colors.inputBg,
                        border: `1px solid ${colors.inputBorder}`,
                        color: colors.textPrimary,
                        boxShadow: "inset 0 0 4px rgba(147, 51, 234, 0.2)",
                        outline: "none",
                      }}
                    />
                  </motion.div>
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-widest mb-1 block" style={{ color: colors.textSecondary }}>
                    Bio
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself..."
                      rows={3}
                      className="w-full text-xs p-3 rounded-lg font-medium resize-none transition-all focus:ring-2"
                      style={{
                        background: colors.inputBg,
                        border: `1px solid ${colors.inputBorder}`,
                        color: colors.textPrimary,
                        boxShadow: "inset 0 0 4px rgba(147, 51, 234, 0.2)",
                        outline: "none",
                      }}
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3">
                  <motion.div
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => navigate("/")}
                      variant="outline"
                      className="w-full text-xs font-medium rounded-lg h-10 transition-all"
                      style={{
                        background: colors.cancelButton,
                        border: `1px solid ${colors.inputBorder}`,
                        color: colors.textPrimary,
                      }}
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleSaveChanges}
                      className="w-full text-xs font-medium rounded-lg h-10 transition-all"
                      style={{
                        background: colors.primary,
                        color: colors.textPrimary,
                        boxShadow: colors.glow,
                      }}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8 8 8 0 010 16 8 8 0 01-8-8z" />
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;