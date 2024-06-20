export const enum EnumTaskType {
    SINGLE = 'single',
    MULTIPLE = 'multiple',
    SHORT = 'short',
    LONG = 'long',
}

interface ITask {
    id: number
    type: EnumTaskType
    question: string
    options: { id: number, value: string }[] | null
}

export interface ITest {
    id: number
    timer: number
    tasks: ITask[]
}
