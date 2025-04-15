export type InfoBoardCategory =
  | 'study'
  | 'beauty'
  | 'travel'
  | 'media'
  | 'exercise'
  | 'living'
  | 'invest'
  | 'fashion'
  | 'hotdeal'
  | 'infoEtc';

export const InfoBoardCategoryOptions: { value: InfoBoardCategory; label: string }[] = [
    { value: 'study', label: '공부' },
    { value: 'beauty', label: '미용' },
    { value: 'travel', label: '여행' },
    { value: 'media', label: '영화/드라마' },
    { value: 'exercise', label: '운동' },
    { value: 'living', label: '자취꿀팁' },
    { value: 'invest', label: '재테크' },
    { value: 'fashion', label: '패션' },
    { value: 'hotdeal', label: '핫딜' },
    { value: 'infoEtc', label: '정보기타' },
  ];