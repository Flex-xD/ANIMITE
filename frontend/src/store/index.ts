import {create } from "zustand";
import { authSlice, AuthState } from "./slices/authSlice";

export const useAppStore = create<AuthState>()((set , get , store) => ({
    ...authSlice(set , get , store),
}));