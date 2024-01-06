import styles from './Home.module.scss'

import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Header } from '../components/commons/Header'
import { fetchGetUserData } from '../_utils/userUtils'
import { Books } from '../components/Books'
import { useDispatch } from 'react-redux'

// HOME画面
export const Home: React.FC = () => {
  // ========= ステートメント
  const [errorMessage, setErrorMessage] = useState<string>('') // エラーメッセージ
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies() // クッキー
  const dispatch = useDispatch()
  const [user, setUser] = useState<{ name: string; iconUrl: string }>() // ユーザデータ

  // 起動時データを取得
  useEffect(() => {
    // ユーザデータを取得
    fetchGetUserData(
      cookies.token,
      setUser,
      setErrorMessage,
      dispatch,
      removeCookie
    )
    // eslint-disable-next-line
  }, [cookies.token])

  return (
    <div>
      <Header user={user} />
      <main className={styles.main}>
        <p id="error_message">{errorMessage}</p>
        <Books setErrorMessage={setErrorMessage} styles={styles} />
      </main>
    </div>
  )
}
