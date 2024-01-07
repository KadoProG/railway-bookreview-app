import styles from './InputText.module.scss'
import { ChangeEvent } from 'react'

interface Props {
  inputType: 'text' | 'email' | 'password'
  labelText: string
  autoFocus?: boolean
  id: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const InputText = ({
  inputType,
  labelText,
  autoFocus,
  value,
  onChange,
  id,
}: Props) => {
  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {labelText}
      </label>
      <input
        required
        className={styles.input}
        autoFocus={!!autoFocus}
        type={inputType}
        id={id}
        value={value}
        onChange={onChange}
      />
    </>
  )
}
