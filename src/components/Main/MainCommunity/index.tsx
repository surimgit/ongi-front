import React, { useEffect, useState } from "react";
import fire from 'src/assets/images/fire.png'
import crown from 'src/assets/images/crown.png';
import comment from 'src/assets/images/comment.png';
import heart from 'src/assets/images/heart-pull.png';

import './style.css';
import { CommunityPost } from "src/types/interfaces";
import { useNavigate } from "react-router";
import { GetCommunityResponseDto } from "src/apis/dto/response/community";
import { getCommunityRequest, getCommunityUserRankingRequest, getHelperUserRankingRequest, getUserAccountRequest, getUserAddressRequest } from "src/apis";
import useCommentCountStore from "src/stores/comment-count.store";
import { ACCESS_TOKEN, COMMUNITY_BOARD_ABSOLUTE_PATH, COMMUNITY_VIEW_ABSOLUTE_PATH, OTHER_MYPAGE_VIEW_ABSOULTE_PATH } from "src/constants";
import GetUserRankDto from "src/apis/dto/response/main/get-user-rank.dto";
import { GetUserAccountResponseDto } from "src/apis/dto/response/user";
import { ResponseDto } from "src/apis/dto/response";
import { useCookies } from "react-cookie";


  export default function MainCommunity() {

    type County = [string, string] | null;

    // state: 불러올 게시글 상태 //
    const [imfomationPosts, setImpormationPosts] = useState<CommunityPost[]>([]); 
    const [hotPosts, setHotPosts] = useState<CommunityPost[]>([]); 
    const [allPosts, setAllposts] = useState<CommunityPost[]>([]); 
    const [regionPosts, setRegionPosts] = useState<CommunityPost[]>([]); 
    
    // state: 게시글 댓글 수 상태 //
    const { commentCountMap } = useCommentCountStore();

    // state: 유저 랭킹 상태 //
    const [communityRanks, setCommunityRanks] = useState<GetUserRankDto[]>([]);
    const [helperRanks, setHelperRanks] = useState<GetUserRankDto[]>([]);

    // state: navigator //
    const navigator = useNavigate();

    // state: 주소 상태 //
    const [addressState, setAddress] = useState<{ address: County }>({ address: null });    
    const county = addressState.address;
    
    // state: cookie 상태 //
    const [cookies] = useCookies();
    
    // variable: access token //
        const accessToken = cookies[ACCESS_TOKEN];

    // function: 주소 설정 //
    const setCountyFromAddress = (address: string | null) => {
        if (!address) return;
      
        const match = address.match(/^([가-힣]+)(?:특별시|광역시|도)?\s([가-힣]+(?:구|시|군))/);
      
        if (!match) return;
      
        const region = match[1]; 
        const county = match[2];
      
        setAddress(state => ({ ...state, address: [region, county] }));
    };

    // function: 주소 저장 //
    const getAddress = (responseBody: GetUserAccountResponseDto | ResponseDto | null) => {
        const address = (responseBody as GetUserAccountResponseDto)?.address ?? null;
        setCountyFromAddress(address);
    };    
    
    // function: 유저 정보 불러오기 //
    const fetchUserInfo = async () => {
        try {
          const response = await getUserAccountRequest(accessToken); // <- 여기는 실제 API에 맞게 수정
          if (!response || response.code !== 'SU') return;
          getAddress(response);
        } catch (error) {
          console.error('유저 정보 불러오기 실패', error);
        }
    };
      
    // event handler: 전체 더보기 클릭 이벤트 처리 //
    const onMoreAllClickHandler = () => {
        if (!county) {
            navigator(COMMUNITY_BOARD_ABSOLUTE_PATH('전체 글'));
          } else {
            const [region, district] = county;
            navigator(`/community?board=우리 동네 게시판&region=${region}&district=${district}`);
          }
          window.scrollTo({ top: 0, behavior: 'auto' });
    }
      
    // event handler: 정보 게시판 더보기 클릭 이벤트 처리 //
    const onMoreInfoClickHandler = () => {
        navigator(COMMUNITY_BOARD_ABSOLUTE_PATH('정보 게시판'));
        window.scrollTo({ top: 0, behavior: 'auto' });
    }
      
    // event handler: 인기 게시판 더보기 클릭 이벤트 처리 //
    const onMoreHotClickHandler = () => {
        navigator(COMMUNITY_BOARD_ABSOLUTE_PATH('인기 게시판'));
        window.scrollTo({ top: 0, behavior: 'auto' });
    }

    // effect: 컴포넌트 로드 시 불러올 함수 //
    useEffect(() => {
        getCommunityRequest('정보 게시판', null, null, null)
          .then((response) => {
            if (!response || response.code !== 'SU') return;
            const { posts } = response as GetCommunityResponseDto;
            setImpormationPosts(posts.slice(0, 5));
          });
    
        getCommunityRequest('인기 게시판', null, null, null)
          .then((response) => {
            if (!response || response.code !== 'SU') return;
            const { posts } = response as GetCommunityResponseDto;
            setHotPosts(posts.slice(0, 5));
          });
    
        getCommunityRequest('전체 글', null, null, null)
          .then((response) => {
            if (!response || response.code !== 'SU') return;
            const { posts } = response as GetCommunityResponseDto;
            setAllposts(posts.slice(0, 5));
          });

        getCommunityUserRankingRequest().then((response: GetUserRankDto[]) => {
        if (!response || !Array.isArray(response)) return;
        const validRanks = response.filter(user => user.code === 'SU');
        setCommunityRanks(validRanks);
        });

        getHelperUserRankingRequest().then((response: GetUserRankDto[]) => {
        if (!response || !Array.isArray(response)) return;
        const validRanks = response.filter(user => user.code === 'SU');
        setHelperRanks(validRanks);
        });
          
      }, []);

      // effect: 주소 설정 시 실행 //
      useEffect(() => {
        
        if (accessToken) fetchUserInfo();

        if (!county) return;
      
        const [region, district] = county;
      
        getCommunityRequest('우리 동네 게시판', null, region, district)
            .then((response) => {
                if (!response || response.code !== 'SU') return;
                const { posts } = response as GetCommunityResponseDto;
                setRegionPosts(posts.slice(0, 5));
        });

      }, [addressState]);
    
    
    return (
        <div id="main-community-wrapper">
            <div className="main-community-title">커뮤니티</div>
            <div className="grid-wrapper">
                <div className="grid information-container">                            
                    <div className="main-subtext mc">
                        <div className="main-subtitle mc">정보 게시판</div>
                        <div className="main-more" onClick={onMoreInfoClickHandler}>더보기{">"}</div>
                    </div>
                    {imfomationPosts.map((post, index) => (
                        <div className="post-box" key={index}
                        onClick={() => {
                            navigator(COMMUNITY_VIEW_ABSOLUTE_PATH(post.postSequence));
                            window.scrollTo({ top: 0, behavior: 'auto' });
                        }}>
                            <div className="title"><span>{post.title}</span></div>
                            <div className="subtext-box">
                                <div className="post-time">{post.postDate}</div>
                                <div className="like-count">
                                    <img src={heart} alt="likes" />{post.liked}
                                </div>
                                <div className="comment-count">
                                    <img src={comment} alt="comments" />{commentCountMap[post.postSequence]}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="grid hot-post-container">                            
                    <div className="main-subtext mc">
                        <div className="main-subtitle mc">인기글<img src={fire}/></div>
                        <div className="main-more" onClick={onMoreHotClickHandler}>더보기{">"}</div>
                    </div>
                    {hotPosts.map((post, index) => (
                        <div className="post-box" key={index}
                        onClick={() => {
                            navigator(COMMUNITY_VIEW_ABSOLUTE_PATH(post.postSequence));
                            window.scrollTo({ top: 0, behavior: 'auto' });
                        }}>
                            <div className="title"><span>{post.title}</span></div>
                            <div className="subtext-box">
                                <div className="post-time">{post.postDate}</div>
                                <div className="like-count">
                                    <img src={heart} alt="likes" />{post.liked}
                                </div>
                                <div className="comment-count">
                                    <img src={comment} alt="comments" />{commentCountMap[post.postSequence]}
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
                            {communityRanks.slice(0, 5).map((user, index) => (
                                <div className={`rank-box s${index + 1}`} key={index}>
                                {index + 1}. {user.nickname}
                                </div>
                            ))}
                        </div>
                        <div className="ranking-container">
                            <span className="ranking-title">도우미</span>
                            {helperRanks.slice(0, 5).map((user, index) => (
                                <div className={`rank-box h${index + 1}`} key={index} onClick={() => {navigator(OTHER_MYPAGE_VIEW_ABSOULTE_PATH(user.userId));}}>
                                {index + 1}. {user.nickname}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid local-post-container">                           
                    <div className="main-subtext mc">
                        <div className="main-subtitle mc">{county ? '우리 동네 게시판' : '전체글 게시판'}</div>
                        <div className="main-more" onClick={onMoreAllClickHandler}>더보기{">"}</div>
                    </div>
                    {(county ? regionPosts : allPosts).map((post, index) => (
                            <div className="post-box" key={index}
                            onClick={() => {
                                navigator(COMMUNITY_VIEW_ABSOLUTE_PATH(post.postSequence));
                                window.scrollTo({ top: 0, behavior: 'auto' });
                            }}>
                                <div className="title"><span>{post.title}</span></div>
                                <div className="subtext-box">
                                    <div className="post-time">{post.postDate}</div>
                                    <div className="like-count">
                                        <img src={heart} alt="likes" />{post.liked}
                                    </div>
                                    <div className="comment-count">
                                        <img src={comment} alt="comments" />{commentCountMap[post.postSequence]}
                                    </div>
                                </div>
                            </div>
                    ))}
                </div>
                
            </div>
        </div>
       
    );
}