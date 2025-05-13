export default interface UserEvent {
    eventSequence: number;
    title: string;
    content: string;
    image: string | null;
    deadline: string;
    neededPoint: number;
}