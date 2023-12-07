import styles from './header.module.scss'

import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { RootState, signOut } from '../authSlice'

type Props = {
  user?: { name: string; iconUrl: string }
}

export const Header = (props: Props) => {
  const user = props.user
  const auth = useSelector((state: RootState) => state.auth.isSignIn)
  const dispatch = useDispatch()
  const navigation = useNavigate()
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies()

  const handleSignOut = () => {
    dispatch(signOut())
    removeCookie('token')
    navigation('/login')
  }

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.header__title}>
        <h1>書籍レビューアプリ</h1>
      </Link>
      {auth && user ? (
        <div className={styles.header__right}>
          <div>
            <p>{user.name}さん</p>
            <button
              onClick={handleSignOut}
              className="sign-out-button"
              id="signout"
            >
              サインアウト
            </button>
          </div>
          <img src={user.iconUrl} alt="アイコン画像" />
        </div>
      ) : (
        <></>
      )}
    </header>
  )
}
