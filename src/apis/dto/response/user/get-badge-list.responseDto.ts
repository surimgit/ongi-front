import ResponseDto from "../response.dto";
import { Badge } from "src/types/interfaces";

export default interface GetBadgeListResponseDto extends ResponseDto {
  badges: Badge[];
}