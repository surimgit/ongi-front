import React from "react";
import fire from 'src/assets/images/fire.png'
import crown from 'src/assets/images/crown.png';
import comment from 'src/assets/images/comment.png';
import heart from 'src/assets/images/heart-pull.png';

import './style.css';

export default function MainCommunity() {

    const imfomationPosts = [
        { id: 1, title: "2025 4월 이달의 할인 정보!!", time: "04/08 15:01", likes: 1, comments: 0 },
        { id: 2, title: "봄맞이 대청소 꿀팁 모음", time: "04/09 09:30", likes: 5, comments: 2 },
        { id: 3, title: "반려동물 간식 할인중!", time: "04/10 11:15", likes: 3, comments: 4 },
        { id: 4, title: "오늘만 이 가격!", time: "04/11 14:20", likes: 12, comments: 6 },
        { id: 5, title: "이벤트 참여하고 포인트 받자 긴제목예시 긴제목예시 긴제목예시 긴제목예시 긴제목예시", time: "04/12 17:45", likes: 0, comments: 1 },
    ];

    const hotPosts = [
        { id: 1, title: "2025 4월 이달의 할인 정보!!", time: "04/08 15:01", likes: 555, comments: 123 },
        { id: 2, title: "봄맞이 대청소 꿀팁 모음", time: "04/09 09:30", likes: 5, comments: 2 },
        { id: 3, title: "반려동물 간식 할인중!", time: "04/10 11:15", likes: 3, comments: 4 },
        { id: 4, title: "오늘만 이 가격!", time: "04/11 14:20", likes: 12, comments: 6 },
        { id: 5, title: "이벤트 참여하고 포인트 받자", time: "04/12 17:45", likes: 0, comments: 1 },
    ];

    const localPosts = [
        { id: 1, title: "부산 맛집 추천", time: "04/08 15:01", likes: 1, comments: 0 },
        { id: 2, title: "봄맞이 대청소 꿀팁 모음", time: "04/09 09:30", likes: 5, comments: 2 },
        { id: 3, title: "반려동물 간식 할인중!", time: "04/10 11:15", likes: 3, comments: 4 },
        { id: 4, title: "오늘만 이 가격!", time: "04/11 14:20", likes: 12, comments: 6 },
        { id: 5, title: "이벤트 참여하고 포인트 받자", time: "04/12 17:45", likes: 0, comments: 1 },
    ];

    
    
    return (
        <div id="main-community-wrapper">
            <div className="main-community-title">커뮤니티</div>
            <div className="grid-wrapper">
                <div className="grid information-container">                            
                    <div className="main-subtext mc">
                        <div className="main-subtitle mc">정보 게시판</div>
                        <div className="main-more">더보기{">"}</div>
                    </div>
                    {imfomationPosts.map((post) => (
                        <div className="post-box" key={post.id}>
                            <div className="title"><span>{post.title}</span></div>
                            <div className="subtext-box">
                                <div className="post-time">{post.time}</div>
                                <div className="like-count">
                                    <img src={heart} alt="likes" />{post.likes}
                                </div>
                                <div className="comment-count">
                                    <img src={comment} alt="comments" />{post.comments}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="grid hot-post-container">                            
                    <div className="main-subtext mc">
                        <div className="main-subtitle mc">인기글<img src={fire}/></div>
                        <div className="main-more">더보기{">"}</div>
                    </div>
                    {hotPosts.map((post) => (
                        <div className="post-box" key={post.id}>
                            <div className="title"><span>{post.title}</span></div>
                            <div className="subtext-box">
                                <div className="post-time">{post.time}</div>
                                <div className="like-count">
                                    <img src={heart} alt="likes" />{post.likes}
                                </div>
                                <div className="comment-count">
                                    <img src={comment} alt="comments" />{post.comments}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid member-container">
                    <div className="main-community-title s2">지난 주의 인기 멤버<img src={crown}/></div>
                    <div className="ranking-wrapper">
                        <div className="ranking-container">
                            <span className="ranking-title">커뮤니티</span>
                            <div className="rank-box s1">1. user12341234</div>
                            <div className="rank-box s2">2. user12341234</div>
                            <div className="rank-box s3">3. user12341234</div>
                            <div className="rank-box s4">4. user12341234</div>
                            <div className="rank-box s5">5. user12341234</div>
                        </div>
                        <div className="ranking-container">
                            <span className="ranking-title">도우미</span>
                            <div className="rank-box h1">1. user12341234</div>
                            <div className="rank-box h2">2. user12341234</div>
                            <div className="rank-box h3">3. user12341234</div>
                            <div className="rank-box h4">4. user12341234</div>
                            <div className="rank-box h5">5. user12341234</div>
                        </div>
                    </div>
                </div>

                <div className="grid local-post-container">                           
                    <div className="main-subtext mc">
                        <div className="main-subtitle mc">부산시 강서구</div>
                        <div className="main-more">더보기{">"}</div>
                    </div>
                    {localPosts.map((post) => (
                            <div className="post-box" key={post.id}>
                                <div className="title"><span>{post.title}</span></div>
                                <div className="subtext-box">
                                    <div className="post-time">{post.time}</div>
                                    <div className="like-count">
                                        <img src={heart} alt="likes" />{post.likes}
                                    </div>
                                    <div className="comment-count">
                                        <img src={comment} alt="comments" />{post.comments}
                                    </div>
                                </div>
                            </div>
                    ))}
                </div>
                
            </div>
        </div>
       
    );
}