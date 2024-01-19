import styles from './header.module.scss'

import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { RootState, setUser, signOut } from '../../authSlice'
import { fetchGetUserData } from '../../_utils/userUtils'

export const Header: React.FC = () => {
  const { isSignIn, name, iconUrl } = useSelector(
    (state: RootState) => state.auth
  )

  const dispatch = useDispatch()
  const navigation = useNavigate()

  const [cookies, , removeCookie] = useCookies()

  const user = isSignIn
    ? { name, iconUrl }
    : { name: 'ゲスト', iconUrl: '/images/kkrn_icon_user_13.png' }

  // サイトアクセス時、ユーザデータを取得（ページ遷移時は実行されない）
  if (user.name === '') {
    fetchGetUserData(
      cookies.token,
      (data) => dispatch(setUser(data)),
      () => {},
      dispatch,
      removeCookie
    )
  }

  const handleSignClick = () => {
    if (isSignIn) {
      dispatch(signOut())
      removeCookie('token')
    }
    navigation('/login')
  }

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.header__title}>
        <h1>書籍レビューアプリ</h1>
      </Link>
      <div className={styles.header__right}>
        <input
          type="checkbox"
          name="header__buttons__visible"
          id="header__buttons__visible"
        />
        <div className={styles.header__right__buttons}>
          {isSignIn ? (
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
            {isSignIn ? 'サインアウト' : 'サインイン'}
          </button>
        </div>
        <label
          htmlFor="header__buttons__visible"
          className={styles.header__right__image}
        >
          <img src={user.iconUrl} alt="アイコン画像" />
        </label>
      </div>
    </header>
  )
}
