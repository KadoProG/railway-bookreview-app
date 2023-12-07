import { Book } from '../_utils/homeUtils'

type Props = {
  v: Book
  styles: {
    readonly [key: string]: string
  }
}
export const BooksItem = ({ v, styles }: Props) => {
  return (
    <li key={v.id} className={styles.book}>
      <h3 className={styles.book_title}>{v.title}</h3>
      <p className={styles.book_detail}>{v.detail}</p>
      <div className={styles.book_review}>
        <div className={styles.book_review_left}>
          <img src="/images/kkrn_icon_user_13.png" alt="ユーザアイコン" />
          <p>{v.reviewer}</p>
        </div>
        <p>{v.review}</p>
      </div>
      <p>
        <a href={v.url} target="_blank" rel="noopener noreferrer">
          書籍リンクはこちら
        </a>
        自分：{v.isMine ? 'はい' : 'いいえ'}
      </p>
    </li>
  )
}
