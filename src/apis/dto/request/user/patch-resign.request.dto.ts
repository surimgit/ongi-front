// interface: patch resign request body DTO //
export default interface PatchResignRequestDto {
    userId: string;
    isAdmin: boolean;
    reason: string;
}