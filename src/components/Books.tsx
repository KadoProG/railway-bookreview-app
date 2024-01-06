import { useEffect, useState } from 'react'
import { Book, fetchBooks } from '../_utils/homeUtils'
import { useCookies } from 'react-cookie'
import { BooksItem } from './BooksItem'

type Props = {
  setErrorMessage(str: string): void
  styles: {
    readonly [key: string]: string
  }
}

export const Books = ({ setErrorMessage, styles }: Props) => {
  const [cookies] = useCookies() // クッキー
  const [books, setBooks] = useState<Book[]>([]) // 書籍リスト
  const [page, setPage] = useState<number>(0) // ページ番号(nの場合、offset=n*10~n*10+9)

  // ページ更新時データを取得
  useEffect(() => {
    fetchBooks(cookies.token, setBooks, setErrorMessage, page * 10)
    // eslint-disable-next-line
  }, [page, cookies])

  return (
    <>
      <h2>書籍リスト</h2>
      <ul className={styles.books}>
        {books.map((v) => {
          return <BooksItem key={v.id} v={v} styles={styles} />
        })}
      </ul>

      <div className={styles.pageScroll}>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Previous Page
        </button>
        <span>{page + 1}</span>
        <button onClick={() => setPage(page + 1)} disabled={books.length < 10}>
          Next Page
        </button>
      </div>
    </>
  )
}
