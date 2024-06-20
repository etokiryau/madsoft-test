import { FC, useEffect } from 'react'

import styles from "./timer.module.scss"

interface IProps {
    state: [number, React.Dispatch<React.SetStateAction<number>>]
}

const Timer: FC<IProps> = ({ state }) => {
    const [timerValue, setTimerValue] = state

    useEffect(() => {
        const interval = setInterval(() => {
            setTimerValue(prev => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (totalSeconds: number): string => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
    
    return (
        <div className={styles.timer}>{formatTime(timerValue)}</div>
    )
}

export default Timer