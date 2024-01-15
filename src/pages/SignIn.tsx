import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { RootState, setUser, signIn } from '../authSlice'
import { Header } from '../components/commons/Header'
import { url } from '../const'
import Wait from '../components/Wait'
import { InputText } from '../components/commons/InputText'
import { Main } from '../components/commons/Main'
import { Form } from '../components/commons/Form'
import Footer from '../components/commons/Footer'
import { fetchGetUserData } from '../_utils/userUtils'

export const SignIn = () => {
  const auth = useSelector((state: RootState) => state.auth.isSignIn)

  const dispatch = useDispatch()

  // テキストボックスのステートメント
  const [email, setEmail] = useState<string>('') // メールアドレス
  const [password, setPassword] = useState<string>('') // パスワード
  const [errorMessage, setErrorMessage] = useState<string>('') // エラーメッセージ

  const [postState, setPostState] = useState<number>(-1)

  const [, setCookie, removeCookie] = useCookies()

  // Submit時の処理
  const onSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPostState(0)
    axios
      .post(`${url}/signin`, { email: email, password: password })
      .then((res) => {
        setPostState(1)
        setCookie('token', res.data.token)
        fetchGetUserData(
          res.data.token,
          (data) => {
            dispatch(setUser(data))
            dispatch(signIn())
          },
          setErrorMessage,
          dispatch,
          removeCookie
        )
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
