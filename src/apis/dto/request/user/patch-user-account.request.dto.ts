// interface: patch user account request body DTO //

export default interface PatchUserAccountRequestDto {
  userPassword: string;
  address: string;
  detailAddress: string;
}