import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Header } from '../components/Header'

export const Home = () => {
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState<string>('')
  // eslint-disable-next-line
  const [cookies] = useCookies()

  return (
    <div>
      <Header />
      <main className="taskList">
        <p className="error-message">{errorMessage}</p>
        <div>ああああ</div>
      </main>
    </div>
  )
}
