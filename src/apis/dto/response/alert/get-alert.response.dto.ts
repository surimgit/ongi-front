import Alert from "src/types/interfaces/Alert.interface";
import ResponseDto from "../response.dto";

// interface: get alert response body DTO //
export default interface GetAlertResponseDto extends ResponseDto {
    alerts: Alert[];
}