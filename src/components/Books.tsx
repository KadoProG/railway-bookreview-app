import { useEffect, useState } from 'react'
import { Book, fetchBooks } from '../_utils/homeUtils'
import { useCookies } from 'react-cookie'
import { BooksItem } from './BooksItem'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../authSlice'
import styles from './Books.module.scss'

type Props = {
  setErrorMessage(str: string): void
}

export const Books: React.FC<Props> = ({ setErrorMessage }: Props) => {
  const auth = useSelector((state: RootState) => state.auth.isSignIn)

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
      {auth && (
        <Link to={'/new'} className={styles.linkButton}>
          書籍を追加する
        </Link>
      )}

      <ul className={styles.books}>
        {books.map((v) => {
          return (
            <BooksItem key={v.id} book={v} setErrorMessage={setErrorMessage} />
          )
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
