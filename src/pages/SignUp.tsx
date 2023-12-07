import styles from './signin.module.scss'

import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { RootState } from '../authSlice'
import { Header } from '../components/Header'
import Compressor from 'compressorjs'
import Wait from '../components/Wait'
import { fetchSignUp } from '../_utils/signUpUtils'

export const SignUp = () => {
  // ========= ステートメント
  const fileRef = useRef<HTMLInputElement>(null)
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

  // 画像リセットの処理
  const handleImageReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFile(undefined)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files === null) return
    const data = files[0]
    if (data === undefined) return

    const sizeQuality = data.size > 1000000 ? 1000000 / data.size : 1

    new Compressor(data, {
      quality: sizeQuality,
      success(result) {
        // 圧縮完了
        if (result.size > 1000000) {
          setErrorMessge('画像が大きすぎます')
          return
        }
        setFile(result)
      },
      error(error) {
        setErrorMessge('画像アップロードに失敗しました')
      },
    })
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
      <main className={styles.main}>
        <h2>新規作成</h2>
        <p id="error_message">{errorMessage}</p>
        <form className={styles.form} onSubmit={onSignUp}>
          <label htmlFor="email">メールアドレス</label>
          <input
            required
            autoFocus={true}
            type="email"
            id="email"
            onChange={handleEmailChange}
          />

          <label htmlFor="name">ユーザ名</label>
          <input required type="text" onChange={handleNameChange} id="name" />

          <label htmlFor="password">パスワード</label>
          <input
            required
            type="password"
            onChange={handlePasswordChange}
            id="password"
          />

          <label htmlFor="file">アイコン画像</label>
          <div className={styles.form__image}>
            <input
              ref={fileRef}
              type="file"
              accept=".png, .jpg"
              onChange={handleImageChange}
              id="file"
            />
            {file ? (
              <div className={styles.form__image__container}>
                <img
                  src={URL.createObjectURL(file)}
                  alt="アイコン用画像"
                  width={100}
                  height={100}
                />
                <button onClick={handleImageReset}>取り消す</button>
              </div>
            ) : (
              <div>
                <p>ドラッグアンドドロップ</p>
                <p>またはクリックで挿入</p>
              </div>
            )}
          </div>

          <button type="submit" className="signup-button">
            作成
          </button>
          <p>
            アカウントをお持ちですか？<Link to="/login">ログインはこちら</Link>
          </p>
        </form>
      </main>
    </>
  )
}
