import { useEffect, useState } from 'react'
import { Header } from '../components/commons/Header'
import { fetchGetUserData } from '../_utils/userUtils'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { Main } from '../components/commons/Main'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  // ========= ステートメント
  const [errorMessage, setErrorMessage] = useState<string>('') // エラーメッセージ
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies() // クッキー
  const dispatch = useDispatch()
  const [user, setUser] = useState<{ name: string; iconUrl: string }>() // ユーザデータ

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
      <Main errorMessage={errorMessage} title="Sorry, Not found">
        <Link to={'/'}>ホームに戻る</Link>
      </Main>
    </>
  )
}
