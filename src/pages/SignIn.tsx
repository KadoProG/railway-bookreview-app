import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { RootState, signIn } from '../authSlice'
import { Header } from '../components/commons/Header'
import { url } from '../const'
import Wait from '../components/Wait'
import { InputText } from '../components/commons/InputText'
import { Main } from '../components/commons/Main'
import { Form } from '../components/commons/Form'
import Footer from '../components/commons/Footer'

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
      <Main title="サインイン" errorMessage={errorMessage}>
        <Form onSubmit={onSignIn} id="form" dataTestid="signin-form">
          <InputText
            inputType="email"
            id="email"
            value={email}
            labelText="メールアドレス"
            onChange={setEmail}
            autoFocus
          />

          <InputText
            inputType="password"
            id="password"
            value={password}
            labelText="パスワード"
            onChange={setPassword}
          />

          <button type="submit">サインイン</button>
          <p>
            アカウントがありませんか？<Link to="/signup">新規作成はこちら</Link>
          </p>
        </Form>
      </Main>
      <Footer />
    </>
  )
}
