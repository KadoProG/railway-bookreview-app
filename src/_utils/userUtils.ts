import axios from 'axios'
import { url } from '../const'
import { Dispatch } from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import { CookieSetOptions } from 'universal-cookie'
import { signOut } from '../authSlice'

// ユーザデータを取得
export const fetchGetUserData = async (
  cookiesToken: string,
  setUser: (data: { name: string; iconUrl: string }) => void,
  setErrorMessage: (message: string) => void,
  dispatch: Dispatch<AnyAction>,
  removeCookie: (name: string, options?: CookieSetOptions | undefined) => void
): Promise<void> => {
  if (!cookiesToken) return

  try {
    const res = await axios.get(`${url}/users`, {
      headers: {
        Authorization: `Bearer ${cookiesToken}`,
      },
    })
    setUser(res.data)
    return
  } catch (err: any) {
    if (err.response) {
      // 401 認証エラー
      if (err.response.status === 401) {
        dispatch(signOut())
        removeCookie('token')
        setErrorMessage(
          'セッションの有効期限が切れています。再度ログインしてください。'
        )
        return
      }
      if (err.response.data && err.response.data.ErrorMessageJP) {
        setErrorMessage(
          `データ取得に失敗しました。${err.response.data.ErrorMessageJP}`
        )
      } else {
        setErrorMessage(`エラー：${err}`)
      }
    } else {
      setErrorMessage(`エラー：${err}`)
    }
  }
}
