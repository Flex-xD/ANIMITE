// components/ProfilePage.tsx
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Progress } from "../../components/ui/progress";
import { Badge } from "../../components/ui/badge";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const [username, setUsername] = useState("CyberShinobi");
  const [newUsername, setNewUsername] = useState("");
  const [email] = useState("shinobi@animite.net");
  const [favoriteCharacter] = useState("Spike Spiegel");
  const [powerLevel] = useState(85); // Out of 100
  const [badges] = useState(["Neon Runner", "Cyber Samurai", "Anime Oracle"]);

  const handleUsernameSave = () => {
    if (newUsername.trim()) {
      setUsername(newUsername.trim());
      setNewUsername("");
    }
  };

  // Theme Colors from Provided Code
  const colors = {
    bgDark: "bg-[#150028]",
    bgGradient: "bg-gradient-to-br from-[#0d001a] via-[#1a0033] to-[#2a004d]",
    borderNeon: "border-[#6b00ff]/30",
    textNeon: "text-[#d4bfff]",
    accentPurple: "bg-[#6b00ff]",
    accentPink: "bg-[#ff00cc]",
    glowPurple: "shadow-[#6b00ff]/40",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`flex items-center justify-center min-h-screen ${colors.bgGradient} text-white overflow-hidden`}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`relative w-[420px] ${colors.bgDark}/95 backdrop-blur-xl ${colors.borderNeon} rounded-xl p-8 shadow-2xl ${colors.glowPurple} transform hover:scale-[1.02] transition-all duration-500`}
      >
        {/* Subtle Glowing Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#6b00ff]/10 to-[#ff00cc]/10 opacity-50 blur-3xl animate-pulse" />

        {/* Profile Header */}
        <div className="relative z-10 text-center mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative inline-block"
          >
            <div className={`w-24 h-24 ${colors.accentPurple} rounded-full mx-auto opacity-80 animate-pulse`} />
            <div className="absolute inset-0 bg-[#0d001a] rounded-full m-1" />
          </motion.div>
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`text-3xl font-bold ${colors.textNeon} mt-4 tracking-wider neon-text`}
          >
            {username}
          </motion.h1>
          <p className="text-sm text-[#d4bfff]/50">Member since 2077</p>
        </div>

        {/* Edit Username Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className={`w-full mb-4 bg-[#2a004d]/50 ${colors.borderNeon} ${colors.textNeon} rounded-full hover:bg-[#6b00ff]/20 hover:${colors.glowPurple} transition-all duration-300`}
              >
                Edit Username
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className={`${colors.bgDark} ${colors.borderNeon} text-white rounded-2xl`}>
            <DialogHeader>
              <DialogTitle className={colors.textNeon}>Change Username</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter new username"
                className={`${colors.bgDark}/70 ${colors.borderNeon} ${colors.textNeon} placeholder:text-[#d4bfff]/50 focus:border-[#6b00ff] focus:ring-2 focus:ring-[#6b00ff]/50 rounded-md transition-all duration-300`}
              />
              <Button
                onClick={handleUsernameSave}
                className={`w-full bg-gradient-to-r from-[#6b00ff] to-[#ff00cc] text-white rounded-md hover:from-[#7b00ff] hover:to-[#ff33cc] hover:${colors.glowPurple} transition-all duration-300`}
              >
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-6 relative z-10"
        >
          <div className={`bg-[#21003d]/70 ${colors.borderNeon} rounded-md p-4`}>
            <p className="text-sm text-[#d4bfff]/80">Email</p>
            <p className="text-lg">{email}</p>
          </div>
          <div className={`bg-[#21003d]/70 ${colors.borderNeon} rounded-md p-4`}>
            <p className="text-sm text-[#d4bfff]/80">Favorite Anime Character</p>
            <p className="text-lg">{favoriteCharacter}</p>
          </div>
        </motion.div>

        {/* Anime Power Level */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
          className="mt-6 relative z-10"
        >
          <p className="text-sm text-[#d4bfff]/80 mb-2">Anime Power Level</p>
          <div className="relative">
            <Progress
              value={powerLevel}
              className={`w-full h-3 ${colors.bgDark}/50 ${colors.borderNeon}`}
            />
            <motion.div
              className={`absolute inset-0 h-3 bg-gradient-to-r from-[#6b00ff] to-[#ff00cc] opacity-80`}
              initial={{ width: 0 }}
              animate={{ width: `${powerLevel}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <p className={`text-right text-sm ${colors.textNeon} mt-1`}>{powerLevel} / 100</p>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-6 relative z-10"
        >
          <p className="text-sm text-[#d4bfff]/80 mb-2">Badges</p>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <motion.div
                key={badge}
                whileHover={{ scale: 1.05 }} // Simplified to just scale, no rotation
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  className={`${colors.bgDark}/50 ${colors.textNeon} ${colors.borderNeon} rounded-md hover:bg-[#6b00ff]/20 ${colors.glowPurple} transition-all duration-300`}
                >
                  {badge}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Tailwind Animation Styles */}
      <style>{`
        .neon-text {
          text-shadow: 0 0 5px rgba(107, 0, 255, 0.8), 0 0 10px rgba(255, 0, 204, 0.6);
        }
      `}</style>
    </motion.div>
  );
};

export default ProfilePage;