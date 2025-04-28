import { create } from "zustand";

// interface: 로그인 유저 정보 상태 구조 //
interface SignInUserStore {
    userId: string;
    nickname: string;
    admin: boolean;
    profileImage: string | null;

    setUserId: (userId: string) => void;
    setNickname: (nickname: string) => void;
    setAdmin: (admin: boolean) => void;
    setProfileImage: (profileImage: string | null) => void;

    resetSignInUser: () => void;
}

// function: 로그인 유저 정보 스토어 //
const useStore = create<SignInUserStore>(set => ({
    userId: '',
    nickname: '',
    admin: false,
    profileImage: null,

    setUserId: (userId: string) => set(state => ({ ...state, userId })),
    setNickname: (nickname: string) => set(state => ({ ... state, nickname })),
    setAdmin: (admin: boolean) => set(state => ({ ...state, admin })),
    setProfileImage: (profileImage: string | null) => set(state => ({ ...state, profileImage })),

    resetSignInUser: () => set(state => ({ 
        ...state, 
        userId: '',
        nickname: '',
        admin: false,
        profileImage: null,
    }))
}));

export default useStore;