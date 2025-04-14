import { StateCreator } from "zustand";
import { IUser } from "../../constants/types";

export interface AuthState {
    userInfo:IUser | undefined | null 
    setUserInfo:(userInfo:any) => void 
    isAuthenticated:boolean 
    setIsAuthenticated:(isAuthenticated:boolean) => void
    isLoading:boolean
    setIsLoading:(isLoading:boolean) => void
}

export const authSlice:StateCreator<AuthState> = (set , get ,store) => ({
    userInfo:undefined ,
    setUserInfo : (userInfo:any) => set({userInfo}),
    isAuthenticated:false ,
    setIsAuthenticated:(isAuthenticated:boolean) => set({isAuthenticated}) ,
    isLoading:false,
    setIsLoading:(isLoading:boolean) => set({isLoading})
});