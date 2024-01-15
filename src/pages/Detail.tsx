import { useState } from 'react'
import { Header } from '../components/commons/Header'
import { Main } from '../components/commons/Main'
import Footer from '../components/commons/Footer'
import { useParams } from 'react-router-dom'
import { BooksDetail } from '../components/BooksDetail'
import { NotFound } from './NotFound'

// HOME画面
export const Detail: React.FC = () => {
  // ========= ステートメント
  const [errorMessage, setErrorMessage] = useState<string>('') // エラーメッセージ
  const { bookId } = useParams()

  if (!bookId) return <NotFound />

  return (
    <>
      <Header />
      <Main title="書籍の詳細" errorMessage={errorMessage}>
        <BooksDetail setErrorMessage={setErrorMessage} bookId={bookId} />
      </Main>
      <Footer />
    </>
  )
}
