import styles from './Main.module.scss'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  errorMessage?: string
  title: string
}
export const Main = ({ children, errorMessage, title }: Props) => {
  return (
    <main className={styles.main}>
      <h2>{title}</h2>
      <p id="error_message">{errorMessage}</p>
      {children}
    </main>
  )
}
