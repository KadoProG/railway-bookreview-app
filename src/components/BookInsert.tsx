import { FormEvent, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Form } from './commons/Form'
import { InputText } from './commons/InputText'
import { fetchBookDelete, fetchBookInsert } from '../_utils/bookInsertUtils'
import { useNavigate } from 'react-router-dom'
import { fetchGETBookDetail } from '../_utils/booksDetailUtils'
import { Book } from '../_utils/homeUtils'

type Props = {
  setErrorMessage(str: string): void
  bookId?: string
}

export const BookInsert: React.FC<Props> = ({
  setErrorMessage,
  bookId,
}: Props) => {
  // eslint-disable-next-line
  const [cookies] = useCookies() // クッキー
  const navigation = useNavigate()
  // 書籍のステートメント
  const [title, setTitle] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [detail, setDetail] = useState<string>('')
  const [review, setReview] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = { title, url, detail, review }
    fetchBookInsert(data, setErrorMessage, cookies.token, bookId).then(
      (res) => {
        if (res) {
          navigation('/')
        }
      }
    )
  }

  const handleDelete = (e: any) => {
    e.preventDefault()
    if (!bookId) return
    if (!confirm('本当に削除してよろしいですか？')) return //eslint-disable-line
    fetchBookDelete(bookId, cookies.token, setErrorMessage).then((res) => {
      if (res) {
        navigation('/')
      }
    })
  }

  // ステートの更新
  const setBook = (book: Book) => {
    if (!book.isMine) navigation('/new')
    setTitle(book.title)
    setUrl(book.url)
    setDetail(book.detail)
    setReview(book.review)
  }

  // 起動時実行
  useEffect(() => {
    if (bookId) {
      // 編集モード
      fetchGETBookDetail(bookId, setErrorMessage, cookies.token, setBook)
    }
    // eslint-disable-next-line
  }, [])

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
      <button type="submit">書籍を登録・更新する</button>
      {!!bookId && (
        <button
          onClick={handleDelete}
          style={{ background: 'var(--color-error)' }}
        >
          <p>削除する</p>
        </button>
      )}
    </Form>
  )
}
