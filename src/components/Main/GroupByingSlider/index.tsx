import React, { useEffect, useState } from "react";
import './style.css';

import HotGroupBuyingData from "./HOT";
import NewGroupBuyingData from "./NEW";
import { useCookies } from "react-cookie";
import { Product } from "src/types/interfaces";
import { ACCESS_TOKEN, PRODUCT_ABSOLUTE_PATH, PRODUCT_VIEW_ABSOLUTE_PATH } from "src/constants";
import { GetProductResponseDto, ResponseDto } from "src/apis/dto/response";
import { responseMessage } from "src/utils";
import { getProductRequest } from "src/apis";
import { useNavigate } from "react-router";


export default function GroupBuyingSlider() {

    // state: cookie 상태 //
    const [cookies] = useCookies();
      
    // state: 상품 리스트 상태 //
    const [productList,setProductList] = useState<Product[]>([]);
    // state: 핫 게시물 리스트 상태 //
    const [hotList, setHotList] = useState<Product[]>([]);
    // state: 뉴 게시물 리스트 상태 //
    const [newList, setNewList] = useState<Product[]>([]);

    // variable: navigator //
    const navigator = useNavigate();

    // variable: access token //
    const accessToken = cookies[ACCESS_TOKEN];

    // function: get products response 처리 함수 //
    const getProductResponse = (responseBody: GetProductResponseDto | ResponseDto | null) => {
        const { isSuccess, message } = responseMessage(responseBody);
  
        if(!isSuccess) {
          alert(message);
          return;
        }
  
        const { products } = responseBody as GetProductResponseDto;
        
        setProductList(products);
    }

    // event handler: 상품 클릭 이벤트 핸들러 //
    const onProductClickHandler = (sequence:number) => {
        navigator(PRODUCT_VIEW_ABSOLUTE_PATH(sequence));
    }

    // event handler: 더보기 클릭 이벤트 핸들러 //
    const onMoreProductClickHandler = () => {
      navigator(PRODUCT_ABSOLUTE_PATH);
    }

    const handlers = {
        onProductClick: onProductClickHandler,
        onMoreClick: onMoreProductClickHandler
    };
  
    // effect: 상품 리스트 변경시 실행할 함수 //
    useEffect(() => {
    const hotList: Product[] = productList
                                    .filter((product:Product) => product.status !== 'CLOSE')
                                    .sort((a, b) => (b.boughtAmount / b.productQuantity) - (a.boughtAmount / a.productQuantity))
                                    .slice(0, 10);

    setHotList(hotList);

    const newList: Product[] = productList
                                    .filter((productList:Product) => productList.status !== 'CLOSE');
    setNewList(newList);
    },[productList])

    // effect: 컴포넌트 로드시 실행할 함수 //
        useEffect(() => {
        getProductRequest(accessToken).then(getProductResponse);    
    },[]);

    return (
        <div id="group-bying-container">
            <div className="gb-container-title">공동구매</div>
            <HotGroupBuyingData hotList={hotList} handlers={handlers}/>
            <NewGroupBuyingData newList={newList} handlers={handlers}/>
        </div>
    );
}
