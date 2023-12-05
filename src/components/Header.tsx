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
    <header className="header">
      <Link to="/" className="header__title">
        <h1>Todoアプリ</h1>
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
