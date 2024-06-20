import type { FC } from 'react'

import styles from "./input.module.scss"

interface IProps {
    type: 'radio' | 'checkbox'
    title: string
    value: string | number
    name: string
    id: string
    checked: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<IProps> = ({ type, value, name, checked, onChange, id, title }) => {
  return (
    <div className={styles.input}>
        <input type={type} value={value} id={id} name={name} checked={checked} onChange={onChange} />
        <label htmlFor={id}>{title}</label>
    </div>
  )
}

export default Input