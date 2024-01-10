import { Link, useNavigate } from 'react-router-dom'
import { Book, fetchPOSTLog } from '../_utils/homeUtils'
import { useCookies } from 'react-cookie'

type Props = {
  setErrorMessage: (str: string) => void
  v: Book
  styles: {
    readonly [key: string]: string
  }
}
export const BooksItem = ({ setErrorMessage, v, styles }: Props) => {
  const [cookies] = useCookies() // クッキー
  const navigation = useNavigate()

  // トークンが設定されていたら詳細にアクセスできるように＋APIにログを送信
  const handleClick = async () => {
    if (!!cookies.token) {
      const res = await fetchPOSTLog(cookies.token, v.id, setErrorMessage)
      if (!res) return
      navigation(`/detail/${v.id}`)
    }
  }
  return (
    <li key={v.id} className={styles.book}>
      <button
        onClick={handleClick}
        style={{
          border: 'none',
          background: 'transparent',
          width: '100%',
          cursor: 'pointer',
        }}
      >
        <h3 className={styles.book__title}>{v.title}</h3>
      </button>
      <p className={styles.book__detail}>{v.detail}</p>
      <div className={styles.book__review}>
        <div className={styles.book__review__left}>
          <img src="/images/kkrn_icon_user_13.png" alt="ユーザアイコン" />
          <p>{v.reviewer}</p>
        </div>
        <p>{v.review}</p>
      </div>
      <p>
        <a href={v.url} target="_blank" rel="noopener noreferrer">
          書籍リンクはこちら
        </a>
        <span> </span>
        {v.isMine && <Link to={`/edit/${v.id}`}>編集する</Link>}
      </p>
    </li>
  )
}
