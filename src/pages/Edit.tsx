import { useState } from 'react'
import { Header } from '../components/commons/Header'
import { useSelector } from 'react-redux'
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

  const { bookId } = useParams()

  if (!auth) return <Navigate to="/" state={{ permanent: false }} />

  if (!bookId) return <NotFound />

  return (
    <>
      <Header />
      <Main title="書籍編集" errorMessage={errorMessage}>
        <BookInsert setErrorMessage={setErrorMessage} bookId={bookId} />
      </Main>
      <Footer />
    </>
  )
}
