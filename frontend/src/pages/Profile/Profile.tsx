import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Progress } from "../../components/ui/progress";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const signupEmail = "user@gmail.com"; // Replace with actual auth logic

  const [profile, setProfile] = useState({
    username: "NeonVoyager",
    favoriteCharacter: "Revy",
  });

  const [formData, setFormData] = useState({
    username: profile.username,
    favoriteCharacter: profile.favoriteCharacter,
  });

  const [powerLevel] = useState(92);

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    if (formData.username.trim() && formData.favoriteCharacter.trim()) {
      setProfile(formData);
      navigate("/");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="min-h-screen bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] flex items-center justify-center px-4 py-12"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xl bg-[#121b27] rounded-2xl shadow-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#00ffea]/10 to-[#8a2be2]/10 blur-2xl animate-pulse"></div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-[#00ffea] to-[#8a2be2] shadow-lg shadow-[#00ffea]/30 animate-glow"
            ></motion.div>
            <h1 className="text-3xl font-bold text-[#b8e6ff] mt-4 neon-text">
              {profile.username}
            </h1>
            <p className="text-[#b8e6ff]/70 text-sm">Logged in with Gmail</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-[#b8e6ff]/80">Email</label>
              <div className="mt-1 p-3 bg-[#0f172a]/60 text-[#b8e6ff] border border-[#00ffea]/40 rounded-md text-sm">
                {signupEmail}
              </div>
            </div>

            <div>
              <label className="text-sm text-[#b8e6ff]/80">Username</label>
              <Input
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter username"
                className="mt-1 bg-[#0f172a]/60 border border-[#00ffea]/30 text-[#b8e6ff] placeholder:text-[#b8e6ff]/50 focus:border-[#00ffea] focus:ring-2 focus:ring-[#00ffea]/60 rounded-md text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-[#b8e6ff]/80">Favorite Anime Character</label>
              <Input
                name="favoriteCharacter"
                value={formData.favoriteCharacter}
                onChange={handleInputChange}
                placeholder="Enter favorite character"
                className="mt-1 bg-[#0f172a]/60 border border-[#00ffea]/30 text-[#b8e6ff] placeholder:text-[#b8e6ff]/50 focus:border-[#00ffea] focus:ring-2 focus:ring-[#00ffea]/60 rounded-md text-sm"
              />
            </div>

            <Button
              onClick={handleSaveChanges}
              className="w-full bg-gradient-to-r from-[#00ffea] to-[#8a2be2] text-[#0a0f1c] font-semibold rounded-md hover:from-[#33ffee] hover:to-[#9b3cff] text-sm py-3 mt-2 shadow-md shadow-[#00ffea]/30"
            >
              Save Changes
            </Button>

            <div className="mt-8">
              <p className="text-sm text-[#b8e6ff]/80 mb-2">Neon Power Level</p>
              <div className="relative">
                <Progress value={powerLevel} className="w-full h-3 bg-[#0f172a] border border-[#00ffea]/40 rounded-md" />
                <motion.div
                  className="absolute top-0 left-0 h-3 bg-gradient-to-r from-[#00ffea] to-[#8a2be2] rounded-md"
                  initial={{ width: 0 }}
                  animate={{ width: `${powerLevel}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <p className="text-right text-sm text-[#b8e6ff] mt-2">
                  {powerLevel} / 100
                </p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .neon-text {
            text-shadow: 0 0 6px rgba(0, 255, 234, 0.8), 0 0 12px rgba(138, 43, 226, 0.6);
          }
          @keyframes glow {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          .animate-glow {
            animation: glow 1.8s infinite ease-in-out;
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
