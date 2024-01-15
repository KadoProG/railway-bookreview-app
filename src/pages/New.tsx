import { useState } from 'react'
import { Header } from '../components/commons/Header'
import { useSelector } from 'react-redux'
import { Main } from '../components/commons/Main'
import { Navigate } from 'react-router-dom'
import { RootState } from '../authSlice'
import Footer from '../components/commons/Footer'
import { BookInsert } from '../components/BookInsert'

export const New: React.FC = () => {
  // ========= ステートメント
  const auth = useSelector((state: RootState) => state.auth.isSignIn)
  const [errorMessage, setErrorMessage] = useState<string>('') // エラーメッセージ

  // ログインされていない場合はリダイレクト
  if (!auth) return <Navigate to="/" state={{ permanent: false }} />

  return (
    <>
      <Header />
      <Main title="新規書籍登録" errorMessage={errorMessage}>
        <BookInsert setErrorMessage={setErrorMessage} />
      </Main>
      <Footer />
    </>
  )
}
