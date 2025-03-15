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
  const [powerLevel] = useState(85);
  const [badges] = useState(["Neon Runner", "Cyber Samurai", "Anime Oracle"]);

  const handleUsernameSave = () => {
    if (newUsername.trim()) {
      setUsername(newUsername.trim());
      setNewUsername("");
    }
  };

  const colors = {
    bgDark: "bg-[#150028]",
    bgGradient: "bg-gradient-to-br from-[#0d001a] via-[#1a0033] to-[#2a004d]",
    borderNeon: "border-[#6b00ff]/40",
    textNeon: "text-[#d4bfff]",
    accentPurple: "bg-[#6b00ff]",
    accentPink: "bg-[#ff00cc]",
    glowPurple: "shadow-[#6b00ff]/50",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`flex items-center justify-center min-h-screen ${colors.bgGradient} text-white overflow-hidden`}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`relative w-[360px] ${colors.bgDark}/95 backdrop-blur-xl ${colors.borderNeon} rounded-2xl p-6 shadow-xl ${colors.glowPurple} transform hover:scale-[1.015] transition-all duration-500`}
      >
        {/* Subtle Glowing Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#6b00ff]/15 to-[#ff00cc]/15 opacity-40 blur-2xl animate-pulse" />

        {/* Profile Header */}
        <div className="relative z-10 text-center mb-5">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative inline-block"
          >
            <div className={`w-20 h-20 ${colors.accentPurple} rounded-full mx-auto opacity-75 animate-glow`} />
            <div className="absolute inset-0 bg-[#0d001a] rounded-full m-[3px]" />
          </motion.div>
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className={`text-2xl font-bold ${colors.textNeon} mt-3 tracking-wide neon-text`}
          >
            {username}
          </motion.h1>
          <p className="text-xs text-[#d4bfff]/60">Member since 2077</p>
        </div>

        {/* Edit Username Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className={`w-full mb-4 bg-[#2a004d]/60 ${colors.borderNeon} ${colors.textNeon} rounded-full hover:bg-[#6b00ff]/25 hover:${colors.glowPurple} text-sm py-1 transition-all duration-300`}
              >
                Edit Username
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className={`${colors.bgDark} ${colors.borderNeon} text-white rounded-xl`}>
            <DialogHeader>
              <DialogTitle className={`${colors.textNeon} text-lg`}>Change Username</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="New username"
                className={`${colors.bgDark}/80 ${colors.borderNeon} ${colors.textNeon} placeholder:text-[#d4bfff]/60 focus:border-[#6b00ff] focus:ring-1 focus:ring-[#6b00ff]/60 rounded-md text-sm transition-all duration-300`}
              />
              <Button
                onClick={handleUsernameSave}
                className={`w-full bg-gradient-to-r from-[#6b00ff] to-[#ff00cc] text-white rounded-md hover:from-[#7b00ff] hover:to-[#ff33cc] hover:${colors.glowPurple} text-sm py-1 transition-all duration-300`}
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
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4 relative z-10"
        >
          <div className={`bg-[#21003d]/80 ${colors.borderNeon} rounded-md p-3`}>
            <p className="text-xs text-[#d4bfff]/80">Email</p>
            <p className="text-sm">{email}</p>
          </div>
          <div className={`bg-[#21003d]/80 ${colors.borderNeon} rounded-md p-3`}>
            <p className="text-xs text-[#d4bfff]/80">Favorite Anime Character</p>
            <p className="text-sm">{favoriteCharacter}</p>
          </div>
        </motion.div>

        {/* Anime Power Level */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.4, duration: 1, ease: "easeInOut" }}
          className="mt-5 relative z-10"
        >
          <p className="text-xs text-[#d4bfff]/80 mb-1">Anime Power Level</p>
          <div className="relative">
            <Progress
              value={powerLevel}
              className={`w-full h-2 ${colors.bgDark}/60 ${colors.borderNeon}`}
            />
            <motion.div
              className={`absolute inset-0 h-2 bg-gradient-to-r from-[#6b00ff] to-[#ff00cc] opacity-85 rounded-sm`}
              initial={{ width: 0 }}
              animate={{ width: `${powerLevel}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <p className={`text-right text-xs ${colors.textNeon} mt-1`}>{powerLevel} / 100</p>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-5 relative z-10"
        >
          <p className="text-xs text-[#d4bfff]/80 mb-1">Badges</p>
          <div className="flex flex-wrap gap-1.5">
            {badges.map((badge) => (
              <motion.div
                key={badge}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  className={`${colors.bgDark}/60 ${colors.textNeon} ${colors.borderNeon} rounded-md hover:bg-[#6b00ff]/25 ${colors.glowPurple} text-xs py-0.5 px-2 transition-all duration-300`}
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
          text-shadow: 0 0 4px rgba(107, 0, 255, 0.7), 0 0 8px rgba(255, 0, 204, 0.5);
        }
        @keyframes glow {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 0.9; }
        }
        .animate-glow {
          animation: glow 2s infinite ease-in-out;
        }
      `}</style>
    </motion.div>
  );
};

export default ProfilePage;