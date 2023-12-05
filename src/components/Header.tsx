import styles from './header.module.scss'

import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { RootState, signOut } from '../authSlice'

export const Header = () => {
  const auth = useSelector((state: RootState) => state.auth.isSignIn)
  const dispatch = useDispatch()
  const navigation = useNavigate()
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies()

  const handleSignOut = () => {
    dispatch(signOut())
    removeCookie('token')
    navigation('/signin')
  }

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.header__title}>
        <h1>書籍レビューアプリ</h1>
      </Link>
      {auth ? (
        <button
          onClick={handleSignOut}
          className="sign-out-button"
          id="signout"
        >
          サインアウト
        </button>
      ) : (
        <></>
      )}
    </header>
  )
}
