import styles from './home.module.scss'

import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Header } from '../components/Header'
import { fetchGetUserData } from '../_utils/userUtils'
import { Books } from '../components/Books'

// HOME画面
export const Home: React.FC = () => {
  // ========= ステートメント
  const [errorMessage, setErrorMessage] = useState<string>('') // エラーメッセージ
  const [cookies] = useCookies() // クッキー
  const [user, setUser] = useState<{ name: string; iconUrl: string }>() // ユーザデータ

  // 起動時データを取得
  useEffect(() => {
    // ユーザデータを取得
    fetchGetUserData(cookies.token, setUser, setErrorMessage)
    // eslint-disable-next-line
  }, [])

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
