import React from 'react'
import "./style.css"

export default function GroupPurchaseMain() {
  return (
    <div id='group-main-wrapper'>
      <div className='main-container'>
        <div className='main-title'>
          <div className='main-title color'>공동구매</div>
          <div className='main-title normal'>게시판</div>
        </div>
        <div className='filter-container'>
            <div className='category-box'>
              <div className='title'>카테고리</div>
              <div className='category-content-list'></div>
            </div> 
            <div className='search-box'>
              <div className='title'>검색</div>
              <div className='search-content'></div>
            </div>
            <div className='sort-box'>
              <div className='title'>정렬방식</div>
              <div className='sort-content-list'>
                <div className='sort-content'>마감임박</div>
                <div className='sort-content'>인기</div>
              </div>
            </div>
        </div>
        <div className='product-list-container'>
          <div></div>
        </div>
      </div>
    </div>
  )
}
