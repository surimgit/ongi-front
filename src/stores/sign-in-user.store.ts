import { stat } from "fs";
import County from "src/types/aliases/community-county.alias";
import { create } from "zustand";

// interface: 로그인 유저 정보 상태 구조 //
interface SignInUserStore {
    userId: string;
    nickname: string;
    county: County | null;
    profileImage: string | null;
    isAdmin: boolean;

    setUserId: (userId: string) => void;
    setNickname: (nickname: string) => void;
    setCounty: (county: County | null) => void;
    setCountyFromAddress: (address: string | null) => void;
    setProfileImage: (profileImage: string | null) => void;
    setIsAdmin: (isAdmin: boolean) => void;

    resetSignInUser: () => void;
}

// function: 로그인 유저 정보 스토어 //
const useStore = create<SignInUserStore>(set => ({
    userId: '',
    nickname: '',
    county: null,
    profileImage: null,
    isAdmin: false,

    setUserId: (userId: string) => set(state => ({ ...state, userId })),
    setNickname: (nickname: string) => set(state => ({ ... state, nickname })),
    setCounty: (county: County | null) => set((state) => ({ ...state, county })), 
    setCountyFromAddress: (address: string | null) => {
        if (!address) return;
        console.log(address);
        const match = address.match(/([가-힣]+구)/);
        const county = match ? match[1] as County : null;
        set((state) => ({ ...state, county}));
        console.log(county);
    },
    setProfileImage: (profileImage: string | null) => set(state => ({ ...state, profileImage })),
    setIsAdmin: (isAdmin: boolean) => set(state => ({...state, isAdmin})),

    resetSignInUser: () => set(state => ({ 
        ...state, 
        userId: '',
        nickname: '',
        county: null,
        profileImage: null,
        isAdmin: false
    }))
}));

export default useStore;