export interface TodoBase {
    title: string, 
    description? : string,
}

export interface Todo extends TodoBase{
    id: number,
    isClosed: boolean,
    closingTimestamp?: number,
}