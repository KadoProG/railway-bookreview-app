import styles from './Form.module.scss'
import { FormEvent, ReactNode } from 'react'

interface Props {
  children: ReactNode
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  id?: string
  dataTestid?: string
}

export const Form = ({ children, onSubmit, id, dataTestid }: Props) => {
  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      id={id}
      data-testid={dataTestid}
    >
      {children}
    </form>
  )
}
