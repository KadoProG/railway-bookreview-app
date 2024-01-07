import { FormEvent, useEffect, useState } from 'react'
import { Header } from '../components/commons/Header'
import { fetchGetUserData } from '../_utils/userUtils'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { Main } from '../components/commons/Main'
import { Form } from '../components/commons/Form'
import { InputText } from '../components/commons/InputText'
import { UploadImage } from '../components/UploadImage'
import {
  fetchUserImageEdit,
  fetchUserProfileEdit,
} from '../_utils/profileUtils'
import { Navigate } from 'react-router-dom'
import { RootState } from '../authSlice'
import Footer from '../components/commons/Footer'

export const Profile: React.FC = () => {
  // ========= ステートメント
  const auth = useSelector((state: RootState) => state.auth.isSignIn)
  const [errorMessage, setErrorMessage] = useState<string>('') // エラーメッセージ
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies() // クッキー
  const dispatch = useDispatch()
  const [user, setUser] = useState<{ name: string; iconUrl: string }>() // ユーザデータ

  const [name, setName] = useState<string>('') // ユーザ名
  const [file, setFile] = useState<Blob>() // ファイルデータ

  const fetchUserData = async () => {
    const res = await fetchGetUserData(
      cookies.token,
      setUser,
      setErrorMessage,
      dispatch,
      removeCookie
    )
    if (!!res && !!res.name) setName(res.name)
  }

  const onSubmitName = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    const res = await fetchUserProfileEdit(name, cookies.token)
    if (res) {
      await fetchUserData()
    } else {
      setErrorMessage('名前の変更に失敗しました')
    }
  }

  const onSubmitImage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return setErrorMessage('ファイルをアップロードしてください')
    setErrorMessage('')
    const res = await fetchUserImageEdit(file, cookies.token)
    if (res) {
      await fetchUserData()
    } else {
      setErrorMessage('画像アップロードに失敗しました')
    }
  }

  // 起動時データを取得
  useEffect(() => {
    // ユーザデータを取得
    fetchUserData()
    // eslint-disable-next-line
  }, [cookies.token])

  // ログインされていない場合はリダイレクト
  if (!auth) return <Navigate to="/" state={{ permanent: false }} />

  return (
    <>
      <Header user={user} />
      <Main title="ユーザ編集" errorMessage={errorMessage}>
        <Form onSubmit={onSubmitName} id="form" dataTestid="signin-form">
          <InputText
            inputType="text"
            id="name"
            value={name}
            labelText="ユーザ名"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">ユーザ名を更新します</button>
        </Form>
        <Form onSubmit={onSubmitImage} id="form-2">
          <p>
            現在の画像
            <img
              src={user?.iconUrl}
              alt="アイコン用画像"
              width={20}
              height={20}
            />
          </p>
          <UploadImage
            setErrorMessage={setErrorMessage}
            file={file}
            setFile={setFile}
          />
          <button type="submit">画像を更新</button>
        </Form>
      </Main>
      <Footer />
    </>
  )
}
