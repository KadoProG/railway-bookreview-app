import { ChangeEvent, FormEvent, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { RootState } from '../authSlice'
import { Header } from '../components/commons/Header'
import Wait from '../components/Wait'
import { fetchSignUp } from '../_utils/signUpUtils'
import { InputText } from '../components/commons/InputText'
import { Main } from '../components/commons/Main'
import { Form } from '../components/commons/Form'
import { UploadImage } from '../components/UploadImage'
import Footer from '../components/commons/Footer'

export const SignUp = () => {
  // ========= ステートメント
  const auth = useSelector((state: RootState) => state.auth.isSignIn)
  const dispatch = useDispatch()
  const navigation = useNavigate()

  // テキストボックスのステートメント
  const [email, setEmail] = useState<string>('') // メールアドレス
  const [name, setName] = useState<string>('') // ユーザ名
  const [password, setPassword] = useState<string>('') // パスワード
  const [errorMessage, setErrorMessge] = useState<string>('') // エラーメッセージ

  const [file, setFile] = useState<Blob>()

  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies()

  // APIリクエストの状態 0:アカウント登録 1:画像転送
  const [postState, setPostState] = useState<number>(-1)

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
  const onSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !name || !password) {
      return setErrorMessge('フォームに空白の項目があります')
    }
    if (!file) {
      return setErrorMessge('画像が設定されていません')
    }

    const data = { email, name, password }

    return await fetchSignUp(
      data,
      file,
      setPostState,
      dispatch,
      setCookie,
      setErrorMessge,
      navigation
    )
  }

  // すでにログインされている場合はリダイレクト的なことする
  if (auth) return <Navigate to="/" state={{ permanent: false }} />

  return (
    <>
      <Wait
        nowIndex={postState}
        title="リクエストを送信しています"
        stateList={['ユーザ登録', '画像の送信']}
      />
      <Header />
      <Main title="新規作成" errorMessage={errorMessage}>
        <Form onSubmit={onSignUp}>
          <InputText
            inputType="email"
            id="email"
            value={email}
            labelText="メールアドレス"
            onChange={handleEmailChange}
            autoFocus
          />

          <InputText
            inputType="text"
            id="name"
            value={name}
            labelText="ユーザ名"
            onChange={handleNameChange}
          />

          <InputText
            inputType="password"
            id="password"
            value={password}
            labelText="パスワード"
            onChange={handlePasswordChange}
          />

          <UploadImage
            setErrorMessage={setErrorMessge}
            file={file}
            setFile={setFile}
          />

          <button type="submit" className="signup-button">
            作成
          </button>
          <p>
            アカウントをお持ちですか？<Link to="/login">ログインはこちら</Link>
          </p>
        </Form>
      </Main>
      <Footer />
    </>
  )
}
