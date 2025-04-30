import { create } from "zustand";
import { persist } from "zustand/middleware";

// interface: 댓글 갯수 저장 스토어 속성 //
interface CommentCountStore {
    commentCountMap: { [postSequence: number | string ]: number};
    setCommentCount: (postSequence: number | string, count: number) => void;
}

// component: 댓글 갯수 저장 컴포넌트 //
const useCommentCountStore = create<CommentCountStore>()(
    persist(
        (set) => ({
            commentCountMap: {},
            setCommentCount: (postSequence, count) => 
                set((state) => ({
                    commentCountMap: {
                        ...state.commentCountMap,
                        [postSequence]: count,
                    },
                })),
        }),
        {
            name: "comment-count-storage",
        }
    )
);

export default useCommentCountStore;