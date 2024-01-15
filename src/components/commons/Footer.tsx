import { Link, useNavigate } from 'react-router-dom'
import styles from './Footer.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, signOut } from '../../authSlice'
import { useCookies } from 'react-cookie'

const Footer: React.FC = () => {
  // ========= ステートメント
  const [, , removeCookie] = useCookies() // クッキー
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const auth = useSelector((state: RootState) => state.auth.isSignIn)

  const handleSignClick = () => {
    dispatch(signOut())
    removeCookie('token')
    navigation('/login')
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__links}>
        <section>
          <Link to={'/'}>
            <h3>HOME</h3>
          </Link>
        </section>
        {auth ? (
          <section>
            <Link to={'/profile'}>
              <h3>ユーザ情報</h3>
            </Link>
            <ul>
              <li>
                <button onClick={handleSignClick}>ログアウト</button>
              </li>
            </ul>
          </section>
        ) : (
          <section>
            <Link to={'/login'}>
              <h3>ログイン</h3>
            </Link>
            <ul>
              <li>
                <Link to={'/signup'}>新規登録</Link>
              </li>
            </ul>
          </section>
        )}
      </div>
      <p className={styles.copyright}>
        &copy; KadoBloG 2023, Thanks TechTrain!
      </p>
    </footer>
  )
}

export default Footer
