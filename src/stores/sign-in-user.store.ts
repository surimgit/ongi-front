import { stat } from "fs";
import { create } from "zustand";

// interface: 로그인 유저 정보 상태 구조 //
interface SignInUserStore {
    userId: string;
    nickname: string;
    profileImage: string | null;
    isAdmin: boolean;

    setUserId: (userId: string) => void;
    setNickname: (nickname: string) => void;
    setProfileImage: (profileImage: string | null) => void;
    setIsAdmin: (isAdmin: boolean) => void;

    resetSignInUser: () => void;
}

// function: 로그인 유저 정보 스토어 //
const useStore = create<SignInUserStore>(set => ({
    userId: '',
    nickname: '',
    profileImage: null,
    isAdmin: false,

    setUserId: (userId: string) => set(state => ({ ...state, userId })),
    setNickname: (nickname: string) => set(state => ({ ... state, nickname })),
    setProfileImage: (profileImage: string | null) => set(state => ({ ...state, profileImage })),
    setIsAdmin: (isAdmin: boolean) => set(state => ({...state, isAdmin})),

    resetSignInUser: () => set(state => ({ 
        ...state, 
        userId: '',
        nickname: '',
        profileImage: null,
        isAdmin: false
    }))
}));

export default useStore;