import { FormEvent, useEffect, useState } from 'react'
import { Header } from '../components/commons/Header'
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
import { RootState, setUser } from '../authSlice'
import Footer from '../components/commons/Footer'

export const Profile: React.FC = () => {
  // ========= ステートメント
  const auth = useSelector((state: RootState) => state.auth)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [cookies] = useCookies()
  const dispatch = useDispatch()

  const [name, setName] = useState<string>('') // ユーザ名
  const [file, setFile] = useState<Blob>() // ファイルデータ

  useEffect(() => {
    setName(auth.name)
  }, [auth.name])

  const onSubmitName = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    await fetchUserProfileEdit(name, cookies.token, setErrorMessage, (name) =>
      dispatch(setUser({ name, iconUrl: auth.iconUrl }))
    )
  }

  const onSubmitImage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return setErrorMessage('ファイルをアップロードしてください')
    setErrorMessage('')
    await fetchUserImageEdit(
      file,
      cookies.token,
      (iconUrl) => {
        dispatch(setUser({ name: auth.name, iconUrl }))
      },
      setErrorMessage
    )
  }

  // ログインされていない場合はリダイレクト
  if (!auth.isSignIn) return <Navigate to="/" state={{ permanent: false }} />

  return (
    <>
      <Header />
      <Main title="ユーザ編集" errorMessage={errorMessage}>
        <Form onSubmit={onSubmitName} id="form" dataTestid="signin-form">
          <InputText
            inputType="text"
            id="name"
            value={name}
            labelText="ユーザ名"
            onChange={setName}
          />
          <button type="submit">ユーザ名を更新します</button>
        </Form>
        <Form onSubmit={onSubmitImage} id="form-2">
          <p>
            現在の画像
            <img
              src={auth.iconUrl}
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
