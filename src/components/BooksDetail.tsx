import { FormEvent, useEffect, useState } from 'react'
import { fetchGETBookDetail } from '../_utils/booksDetailUtils'
import { useCookies } from 'react-cookie'
import { Book } from '../_utils/homeUtils'
import { Form } from './commons/Form'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'

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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    fetchGETBookDetail(bookId, setErrorMessage, cookies.token, setBook).then(
      () => setIsLoading(false)
    )
    // eslint-disable-next-line
  }, [cookies.token])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ReactLoading
              type="spin"
              color="var(--color-text)"
              height="100px"
              width="100px"
              className="mx-auto"
            />
          </div>
        ) : (
          <div>
            <h3 style={{ fontSize: 30 }}>{book?.title}</h3>
            <h4>説明</h4>
            <p>{book?.detail}</p>
            <h4>レビュー内容</h4>
            <p>{book?.review}</p>
            <h4>レビュワー</h4>
            <p>{book?.reviewer}</p>
            <h4>書籍URL</h4>
            {book && (
              <Link to={book.url} target="_blank">
                <p>{book.url}</p>
              </Link>
            )}
          </div>
        )}
      </Form>
    </>
  )
}
