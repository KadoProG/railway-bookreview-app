import styles from './signin.module.scss'
import axios from 'axios'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { RootState, signIn } from '../authSlice'
import { Header } from '../components/Header'
import { url } from '../const'
import Wait from '../components/Wait'

export const SignIn = () => {
  const auth = useSelector((state: RootState) => state.auth.isSignIn)

  const dispatch = useDispatch()
  const navigation = useNavigate()

  // テキストボックスのステートメント
  const [email, setEmail] = useState<string>('') // メールアドレス
  const [password, setPassword] = useState<string>('') // パスワード
  const [errorMessage, setErrorMessage] = useState<string>('') // エラーメッセージ

  const [postState, setPostState] = useState<number>(-1)

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
    setPostState(0)
    axios
      .post(`${url}/signin`, { email: email, password: password })
      .then((res) => {
        setPostState(1)
        setCookie('token', res.data.token)
        dispatch(signIn())
        navigation('/')
      })
      .catch((err) => {
        setPostState(-1)
        setErrorMessage(`サインインに失敗しました。${err}`)
      })
  }

  // ログインされていたらHOMEに戻る
  if (auth) return <Navigate to="/" state={{ permanent: false }} />

  return (
    <>
      <Wait
        nowIndex={postState}
        title="リクエストを送信しています"
        stateList={['ログイン']}
      />
      <Header />
      <main className={styles.main}>
        <h2>サインイン</h2>
        <p id="error_message">{errorMessage}</p>
        <form
          className={styles.form}
          onSubmit={onSignIn}
          id="form"
          data-testid="signin-form"
        >
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            value={email}
            id="email"
            required
            onChange={handleEmailChange}
          />

          <label htmlFor="password">パスワード</label>
          <input
            required
            type="password"
            value={password}
            id="password"
            onChange={handlePasswordChange}
          />
          <button type="submit">サインイン</button>
          <p>
            アカウントがありませんか？<Link to="/signup">新規作成はこちら</Link>
          </p>
        </form>
      </main>
    </>
  )
}
