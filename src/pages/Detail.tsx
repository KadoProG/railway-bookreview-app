import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Header } from '../components/commons/Header'
import { fetchGetUserData } from '../_utils/userUtils'
import { useDispatch } from 'react-redux'
import { Main } from '../components/commons/Main'
import Footer from '../components/commons/Footer'
import { useParams } from 'react-router-dom'
import { BooksDetail } from '../components/BooksDetail'
import { NotFound } from './NotFound'

// HOME画面
export const Detail: React.FC = () => {
  // ========= ステートメント
  const [errorMessage, setErrorMessage] = useState<string>('') // エラーメッセージ
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies() // クッキー
  const dispatch = useDispatch()
  const [user, setUser] = useState<{ name: string; iconUrl: string }>() // ユーザデータ

  const { bookId } = useParams()

  if (!bookId) return <NotFound />

  // 起動時データを取得
  // eslint-disable-next-line
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
      <Main title="書籍の詳細" errorMessage={errorMessage}>
        <BooksDetail setErrorMessage={setErrorMessage} bookId={bookId} />
      </Main>
      <Footer />
    </div>
  )
}
