import { FormEvent, useEffect, useState } from 'react'
import { fetchGETBookDetail } from '../_utils/booksDetailUtils'
import { useCookies } from 'react-cookie'
import { Book } from '../_utils/homeUtils'
import { Form } from './commons/Form'

interface Props {
  setErrorMessage(str: string): void
  bookId: string
}
export const BooksDetail: React.FC<Props> = ({
  bookId,
  setErrorMessage,
}: Props) => {
  const [cookies] = useCookies() // クッキー
  const [book, setBook] = useState<Book>()

  useEffect(() => {
    fetchGETBookDetail(bookId, setErrorMessage, cookies.token, setBook)
    // eslint-disable-next-line
  }, [cookies.token])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h3 style={{ fontSize: 25 }}>{book?.title}</h3>
        <h4>説明</h4>
        <p>{book?.detail}</p>
        <h4>レビュー内容</h4>
        <p>{book?.review}</p>
        <h4>レビュワー</h4>
        <h4>{book?.reviewer}</h4>
      </Form>
    </>
  )
}
