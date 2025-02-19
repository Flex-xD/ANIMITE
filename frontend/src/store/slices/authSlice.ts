import { StateCreator } from "zustand";

export interface AuthState {
    userInfo:object | undefined 
    setUserInfo:(userInfo:any) => void
}

export const authSlice:StateCreator<AuthState> = (set , get ,store) => ({
    userInfo:undefined ,
    setUserInfo : (userInfo:any) => set({userInfo}),
});