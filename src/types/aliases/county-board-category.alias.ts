export type CountyBoardCategory =
  | 'countyLife'
  | 'meeting'
  | 'countyEtc';

export const CountyBoardCategoryOptions: { value: CountyBoardCategory; label: string }[] = [
  { value: 'countyLife', label: '동네생활' },
  { value: 'meeting', label: '모임' },
  { value: 'countyEtc', label: '우리동네기타' },
];