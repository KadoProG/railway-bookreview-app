import { FormEvent, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Form } from './commons/Form'
import { InputText } from './commons/InputText'

type Props = {
  setErrorMessage(str: string): void
}

export const BookInsert: React.FC<Props> = ({ setErrorMessage }: Props) => {
  // eslint-disable-next-line
  const [cookies] = useCookies() // クッキー
  // 書籍のステートメント
  const [title, setTitle] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [detail, setDetail] = useState<string>('')
  const [review, setReview] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputText
        labelText="書籍タイトル"
        inputType="text"
        value={title}
        onChange={setTitle}
        id="title"
      />
      <InputText
        labelText="書籍URL"
        inputType="text"
        value={url}
        onChange={setUrl}
        id="url"
      />
      <InputText
        labelText="説明"
        inputType="textarea"
        value={detail}
        onChange={setDetail}
        id="detail"
      />
      <InputText
        labelText="レビュー・感想"
        inputType="textarea"
        value={review}
        onChange={setReview}
        id="review"
      />
      <button type="submit">書籍を登録する</button>
    </Form>
  )
}
