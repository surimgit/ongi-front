// interface: post event request body DTO //
export default interface PostEventRequestDto {
    title: string,
    deadline: string,
    neededPoint: number,
    content: string,
    image: string | null
}