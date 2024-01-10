import { useEffect, useState } from 'react'
import { Header } from '../components/commons/Header'
import { fetchGetUserData } from '../_utils/userUtils'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { Main } from '../components/commons/Main'
import { Navigate, useParams } from 'react-router-dom'
import { RootState } from '../authSlice'
import Footer from '../components/commons/Footer'
import { BookInsert } from '../components/BookInsert'
import { NotFound } from './NotFound'

export const Edit: React.FC = () => {
  // ========= ステートメント
  const auth = useSelector((state: RootState) => state.auth.isSignIn)
  const [errorMessage, setErrorMessage] = useState<string>('') // エラーメッセージ
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies() // クッキー
  const dispatch = useDispatch()
  const [user, setUser] = useState<{ name: string; iconUrl: string }>() // ユーザデータ

  const { bookId } = useParams()

  if (!bookId) return <NotFound />

  const fetchUserData = async () => {
    await fetchGetUserData(
      cookies.token,
      setUser,
      setErrorMessage,
      dispatch,
      removeCookie
    )
  }

  // 起動時データを取得
  // eslint-disable-next-line
  useEffect(() => {
    // ユーザデータを取得
    fetchUserData()
    // eslint-disable-next-line
  }, [cookies.token])

  // ログインされていない場合はリダイレクト
  if (!auth) return <Navigate to="/" state={{ permanent: false }} />

  return (
    <>
      <Header user={user} />
      <Main title="書籍編集" errorMessage={errorMessage}>
        <BookInsert setErrorMessage={setErrorMessage} bookId={bookId} />
      </Main>
      <Footer />
    </>
  )
}
