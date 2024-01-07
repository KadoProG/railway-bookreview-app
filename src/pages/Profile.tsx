import { FormEvent, useEffect, useState } from 'react'
import { Header } from '../components/commons/Header'
import { fetchGetUserData } from '../_utils/userUtils'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { Main } from '../components/commons/Main'
import { Form } from '../components/commons/Form'
import { InputText } from '../components/commons/InputText'

export const Profile: React.FC = () => {
  // ========= ステートメント
  const [errorMessage, setErrorMessage] = useState<string>('') // エラーメッセージ
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies() // クッキー
  const dispatch = useDispatch()
  const [user, setUser] = useState<{ name: string; iconUrl: string }>() // ユーザデータ

  const [name, setName] = useState<string>('') // ユーザ名

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  // 起動時データを取得
  useEffect(() => {
    // ユーザデータを取得
    fetchGetUserData(
      cookies.token,
      setUser,
      setErrorMessage,
      dispatch,
      removeCookie
    )
    // eslint-disable-next-line
  }, [cookies.token])

  return (
    <>
      <Header user={user} />
      <Main title="ユーザ編集" errorMessage={errorMessage}>
        <Form onSubmit={onSubmit} id="form" dataTestid="signin-form">
          <InputText
            inputType="text"
            id="name"
            value={name}
            labelText="ユーザ名"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="signup-button">
            確定
          </button>
        </Form>
      </Main>
    </>
  )
}
