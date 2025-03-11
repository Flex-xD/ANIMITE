import { StateCreator } from "zustand";

export interface AuthState {
    userInfo:object | undefined 
    setUserInfo:(userInfo:any) => void 
    isAuthenticated:boolean 
    setIsAuthenticated:(isAuthenticated:boolean) => void
}

export const authSlice:StateCreator<AuthState> = (set , get ,store) => ({
    userInfo:undefined ,
    setUserInfo : (userInfo:any) => set({userInfo}),
    isAuthenticated:false ,
    setIsAuthenticated:(isAuthenticated:boolean) => set({isAuthenticated}) ,
});