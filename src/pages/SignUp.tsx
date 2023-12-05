import axios from 'axios'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { signIn } from '../authSlice'
import { Header } from '../components/Header'
import { url } from '../const'
// import './signUp.scss'

export const SignUp = () => {
  const auth = useSelector((state: any) => state.auth.isSignIn)
  const dispatch = useDispatch()
  const navigation = useNavigate()

  // テキストボックスのステートメント
  const [email, setEmail] = useState<string>('') // メールアドレス
  const [name, setName] = useState<string>('') // ユーザ名
  const [password, setPassword] = useState<string>('') // パスワード
  const [errorMessage, setErrorMessge] = useState<string>('') // エラーメッセージ

  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies()

  // 変更時の処理
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  // Submit時の処理
  const onSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = { email, name, password }

    axios
      .post(`${url}/users`, data)
      .then((res) => {
        const token = res.data.token
        dispatch(signIn())
        setCookie('token', token)
        navigation('/')
      })
      .catch((err) => {
        setErrorMessge(`サインアップに失敗しました。 ${err}`)
      })
    // ログインされていたらHOMEに戻る
    if (auth) return <Navigate to="/" state={{ permanent: false }} />
  }
  return (
    <div>
      <Header />
      <main className="signup">
        <h2>新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signup-form" onSubmit={onSignUp}>
          <label>メールアドレス</label>
          <br />
          <input
            type="email"
            onChange={handleEmailChange}
            className="email-input"
          />
          <br />
          <label>ユーザ名</label>
          <br />
          <input
            type="text"
            onChange={handleNameChange}
            className="name-input"
          />
          <br />
          <label>パスワード</label>
          <br />
          <input
            type="password"
            onChange={handlePasswordChange}
            className="password-input"
          />
          <br />
          <button type="submit" className="signup-button">
            作成
          </button>
        </form>
      </main>
    </div>
  )
}
