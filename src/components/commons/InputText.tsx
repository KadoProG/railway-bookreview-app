import styles from './InputText.module.scss'

interface Props {
  inputType: 'text' | 'email' | 'password' | 'textarea'
  labelText: string
  autoFocus?: boolean
  id: string
  value: string
  onChange: (str: string) => void
}
export const InputText = ({
  inputType,
  labelText,
  autoFocus,
  value,
  onChange,
  id,
}: Props) => {
  if (inputType === 'textarea') {
  }
  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {labelText}
      </label>
      {inputType === 'textarea' ? (
        <textarea
          required
          className={styles.textarea}
          autoFocus={!!autoFocus}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          required
          className={styles.input}
          autoFocus={!!autoFocus}
          type={inputType}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </>
  )
}
