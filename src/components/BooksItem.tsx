import { Link, useNavigate } from 'react-router-dom'
import { Book, fetchPOSTLog } from '../_utils/homeUtils'
import { useCookies } from 'react-cookie'
import styles from './BooksItem.module.scss'

type Props = {
  setErrorMessage: (str: string) => void
  book: Book
}
export const BooksItem = ({ setErrorMessage, book }: Props) => {
  const [cookies] = useCookies() // クッキー
  const navigation = useNavigate()

  // トークンが設定されていたら詳細にアクセスできるように＋APIにログを送信
  const handleClick = async () => {
    if (!!cookies.token) {
      const res = await fetchPOSTLog(cookies.token, book.id, setErrorMessage)
      if (!res) return
      navigation(`/detail/${book.id}`)
    }
  }
  return (
    <li key={book.id} className={styles.book}>
      <button
        onClick={handleClick}
        style={{
          border: 'none',
          background: 'transparent',
          width: '100%',
          cursor: 'pointer',
        }}
      >
        <h3 className={styles.book__title}>{book.title}</h3>
      </button>
      <p className={styles.book__detail}>{book.detail}</p>
      <div className={styles.book__review}>
        <div className={styles.book__review__left}>
          <img src="/images/kkrn_icon_user_13.png" alt="ユーザアイコン" />
          <p>{book.reviewer}</p>
        </div>
        <p>{book.review}</p>
      </div>
      <p>
        <a href={book.url} target="_blank" rel="noopener noreferrer">
          書籍リンクはこちら
        </a>
        <span> </span>
        {book.isMine && <Link to={`/edit/${book.id}`}>編集する</Link>}
      </p>
    </li>
  )
}
