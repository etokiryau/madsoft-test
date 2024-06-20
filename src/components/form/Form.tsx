import type { FC } from 'react';
import { useFormik } from 'formik';
import styles from './form.module.scss'

import { EnumTaskType, ITest } from '../../interfaces/test.interface';
import Input from '../input/Input';

interface IProps {
    data: ITest
    state: [number, React.Dispatch<React.SetStateAction<number>>]
}

interface IForm {
    [EnumTaskType.SHORT]: ''
    [EnumTaskType.LONG]: ''
    [EnumTaskType.SINGLE]: ''
    [EnumTaskType.MULTIPLE]: string[]
}

const Form: FC<IProps> = ({ data, state }) => {
    const [currentTask, setCurrentTask] = state
    const { id, tasks } = data

    const formik = useFormik({
		initialValues: {
			[EnumTaskType.SHORT]: '',
			[EnumTaskType.LONG]: '',
			[EnumTaskType.SINGLE]: '',
            [EnumTaskType.MULTIPLE]: []
		},
		onSubmit: (values: IForm) => handleAnswer(values),
	});

    const handleAnswer = (values: IForm) => {
        const itemKey = `test${id}`
        const task = tasks[currentTask]
        const oldAnswers = localStorage.getItem(itemKey)
        const answerObj = { id: task.id, answer: values[task.type]}

        if (oldAnswers) {
            const oldAnswersObj = JSON.parse(oldAnswers)
            oldAnswersObj.answers.push(answerObj)
            localStorage.setItem(itemKey, JSON.stringify(oldAnswersObj))
        } else {
            const testAnswers = { id, answers: [answerObj] }
            localStorage.setItem(itemKey, JSON.stringify(testAnswers))
        }

        formik.setFieldValue(task.type, task.type === EnumTaskType.MULTIPLE ? [] : '')
        setCurrentTask((prev) => prev === tasks.length ? prev : ++prev)
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked: boolean = event.target.checked;
        const value: string = event.target.value;
    
        if (isChecked) {
            formik.setFieldValue(EnumTaskType.MULTIPLE, [...formik.values[EnumTaskType.MULTIPLE], value]);
        } else {
            formik.setFieldValue(
                EnumTaskType.MULTIPLE,
                formik.values[EnumTaskType.MULTIPLE].filter((id: string) => id !== value),
            );
        }
    };

    const createInputs = () => {
        switch (tasks[currentTask]?.type) {
            case EnumTaskType.SHORT:
                return <input type='text' name={EnumTaskType.SHORT} 
                    value={formik.values[EnumTaskType.SHORT]} onChange={formik.handleChange} 
                />
            case EnumTaskType.LONG:
                return <textarea name={EnumTaskType.LONG} value={formik.values[EnumTaskType.LONG]} 
                    onChange={formik.handleChange} 
                />
            case EnumTaskType.SINGLE:
                return tasks[currentTask]?.options?.map(option => (
                    <Input 
                        key={option.id} title={option.value} type="radio"
                        value={option.id} name={EnumTaskType.SINGLE} id={option.id.toString()} 
                        checked={formik.values[EnumTaskType.SINGLE] === option.id.toString()} 
                        onChange={formik.handleChange} 
                    />
                ))
            case EnumTaskType.MULTIPLE:
                return tasks[currentTask].options?.map(option => (
                    <Input 
                        key={option.id} title={option.value} type="checkbox"
                        value={option.id} name={EnumTaskType.MULTIPLE} id={option.id.toString()} 
                        checked={formik.values[EnumTaskType.MULTIPLE].includes(option.id.toString())} 
                        onChange={handleCheckboxChange} 
                    />
                ))
            default: return null
        }
    }

    const indicatorsContent: JSX.Element[] = tasks?.map((item, i) => {
        return <span key={item.id} className={`
            ${i === currentTask ? styles.current : ''}
            ${i < currentTask ? styles.answered : ''}
        `} />
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={styles.form__indicators}>
                {indicatorsContent}
            </div>
            <p className={styles.form__question}>{tasks[currentTask]?.question}</p>
            <div className={styles.form__answer}>
                {createInputs()}
            </div>
            <button 
                type='submit' 
                disabled={formik.values[tasks[currentTask].type].length === 0} 
                className={styles.form__button}
            >
                Ответить
            </button>
        </form>
    )
}

export default Form