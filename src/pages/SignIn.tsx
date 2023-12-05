import axios from 'axios'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { RootState, signIn } from '../authSlice'
import { Header } from '../components/Header'
import { url } from '../const'

export const SignIn = () => {
  const auth = useSelector((state: RootState) => state.auth.isSignIn)

  const dispatch = useDispatch()
  const navigation = useNavigate()

  // テキストボックスのステートメント
  const [email, setEmail] = useState<string>('') // メールアドレス
  const [password, setPassword] = useState<string>('') // パスワード
  const [errorMessage, setErrorMessage] = useState<string>('') // エラーメッセージ

  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies()

  // 変更時の処理
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  // Submit時の処理
  const onSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios
      .post(`${url}/signin`, { email: email, password: password })
      .then((res) => {
        setCookie('token', res.data.token)
        dispatch(signIn())
        navigation('/')
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`)
      })
  }

  // ログインされていたらHOMEに戻る
  if (auth) return <Navigate to="/" state={{ permanent: false }} />

  return (
    <div>
      <Header />
      <main className="signin">
        <h2>サインイン</h2>
        <p className="error-message" id="error_message">
          {errorMessage}
        </p>
        <form
          className="signin-form"
          onSubmit={onSignIn}
          id="form"
          data-testid="signin-form"
        >
          <label className="email-label" htmlFor="email">
            メールアドレス
          </label>
          <br />
          <input
            type="text"
            className="email-input"
            value={email}
            id="email"
            onChange={handleEmailChange}
          />
          <br />
          <label className="password-label" htmlFor="password">
            パスワード
          </label>
          <br />
          <input
            type="password"
            className="password-input"
            value={password}
            id="password"
            onChange={handlePasswordChange}
          />
          <br />
          <button type="submit" className="signin-button">
            サインイン
          </button>
        </form>
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  )
}
