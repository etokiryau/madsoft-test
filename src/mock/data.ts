import { ITest, EnumTaskType } from "../interfaces/test.interface"

export const data: ITest = {
    id: 1,
    timer: 70,
    tasks: [
        { id: 1, question: '1. Hello! How is it going?', type: EnumTaskType.SHORT, options: null },
        { id: 2, question: '2. Hello! How is it going?', type: EnumTaskType.SINGLE, options: [{ id: 12, value: 'Good' }, { id: 13, value: 'Fifty-fifty' }, { id: 14, value: 'Great' }] },
        { id: 3, question: '3. Hello! How is it going?', type: EnumTaskType.LONG, options: null },
        { id: 4, question: '4. Hello! How is it going?', type: EnumTaskType.MULTIPLE, options: [{ id: 12, value: 'Good' }, { id: 13, value: 'Fifty-fifty' }, { id: 14, value: 'Great' }] },
        { id: 5, question: '5. Hello! How is it going?', type: EnumTaskType.SHORT, options: null },
    ]
}
