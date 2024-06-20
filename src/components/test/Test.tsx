import { FC, useEffect, useState } from 'react';
import styles from './test.module.scss'

import type { ITest } from '../../interfaces/test.interface';
import Timer from '../timer/Timer';
import Form from '../form/Form';

interface IProps {
    data: ITest | null
}

const Test: FC<IProps> = ({ data }) => {
    const [currentTask, setCurrentTask] = useState(0)
    const [timerValue, setTimerValue] = useState(data?.timer ?? 0)

    useEffect(() => {
        // Проверка полученнного теста на кэш в сторедже
        if (data) {
            const oldAnswers = localStorage.getItem(`test${data.id}`)
            if (oldAnswers) {
                const oldAnswersObj = JSON.parse(oldAnswers)
                oldAnswersObj.id === data.id && setCurrentTask(oldAnswersObj.answers.length)
            }
        }
    }, [data])

    if (!data) return <p>Что-то пошло не так. Перезагрузите страницу</p>

    const { id, tasks } = data

    const handleSubmit = () => {
        try {
            // Отправить данные в базу данных
            // const data = localStorage.getItem(`test${id}`)
            // fetch(..., data)

            // Очистить сторедж после успешной отправки
            localStorage.removeItem(`test${id}`)
            setCurrentTask(0)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.test}>
            <div className={styles.test__header}>
                <h2>Тестирование</h2>
                <Timer state={[timerValue, setTimerValue]} />
            </div>
            
            {currentTask < tasks.length && 
                <Form state={[currentTask, setCurrentTask]} data={data} />
            }

            {currentTask >= tasks.length && <>
                <p>Вы ответили на все вопросы! Проверьте свои ответы перед завершением тестирования</p>
                <button 
                    type='button'
                    disabled={timerValue <= 0}
                    onClick={handleSubmit} 
                    className={styles.test__button}
                >
                    Подтвердить отправку
                </button>
            </>}
        </div>
    )
}

export default Test;
