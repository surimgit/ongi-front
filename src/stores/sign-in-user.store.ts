import { create } from "zustand";

// interface: 로그인 유저 정보 상태 구조 //
interface SignInUserStore {
    userId: string;
    nickname: string;
    profileImage: string | null;

    setUserId: (userId: string) => void;
    setNickname: (nickname: string) => void;
    setProfileImage: (profileImage: string | null) => void;

    resetSignInUser: () => void;
}

// function: 로그인 유저 정보 스토어 //
const useStore = create<SignInUserStore>(set => ({
    userId: '',
    nickname: '',
    profileImage: null,

    setUserId: (userId: string) => set(state => ({ ...state, userId })),
    setNickname: (name: string) => set(state => ({ ... state, name })),
    setProfileImage: (profileImage: string | null) => set(state => ({ ...state, profileImage })),

    resetSignInUser: () => set(state => ({ 
        ...state, 
        userId: '',
        nickname: '',
        profileImage: null,
    }))
}));

export default useStore;