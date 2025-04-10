import { useAppStore } from "../../store";
const isAuthenticated = useAppStore.getState().isAuthenticated;

export const tabs = ["HOME", "ANIME", "COMMUNITY", "ABOUT US" , "NEWS"];
export const buttons = [`${isAuthenticated ? "LOGOUT" : "CREATE ACCOUNT "}`];