import styles from './header.module.scss'

import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { RootState, signOut } from '../../authSlice'

type Props = {
  user?: { name: string; iconUrl: string }
}

export const Header = (props: Props) => {
  const user = props.user
    ? props.user
    : { name: 'ゲスト', iconUrl: '/images/kkrn_icon_user_13.png' }
  const auth = useSelector((state: RootState) => state.auth.isSignIn)
  const dispatch = useDispatch()
  const navigation = useNavigate()
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies()

  const handleSignClick = () => {
    if (auth) {
      dispatch(signOut())
      removeCookie('token')
    } else {
      navigation('/login')
    }
  }

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.header__title}>
        <h1>書籍レビューアプリ</h1>
      </Link>
      <div className={styles.header__right}>
        <div>
          {auth ? (
            <button
              className="disabled"
              title="ユーザを編集する"
              onClick={() => navigation('/profile')}
            >
              {user.name}さん
            </button>
          ) : (
            <p>{user.name}さん</p>
          )}
          <button onClick={handleSignClick} id="signout">
            {auth ? 'サインアウト' : 'サインイン'}
          </button>
        </div>
        <img src={user.iconUrl} alt="アイコン画像" />
      </div>
    </header>
  )
}
