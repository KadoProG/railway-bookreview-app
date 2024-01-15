import { useState } from 'react'
import { Header } from '../components/commons/Header'
import { Books } from '../components/Books'
import { Main } from '../components/commons/Main'
import Footer from '../components/commons/Footer'

// HOME画面
export const Home: React.FC = () => {
  // ========= ステートメント
  const [errorMessage, setErrorMessage] = useState<string>('') // エラーメッセージ

  return (
    <>
      <Header />
      <Main title="書籍リスト" errorMessage={errorMessage}>
        <Books setErrorMessage={setErrorMessage} />
      </Main>
      <Footer />
    </>
  )
}
