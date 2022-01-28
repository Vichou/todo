export interface Todo {
    id: number,
    title: string,
    description?: string,
    isClosed: boolean,
    closingTimestamp?: number,
}

export interface TodoBase {
    title: string, 
    description? : string,
}