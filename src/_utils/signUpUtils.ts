import axios from 'axios'
import { url } from '../const'
import { Dispatch } from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import { signIn } from '../authSlice'
import { NavigateFunction } from 'react-router-dom'
import { fetchUserImageEdit } from './profileUtils'

type SendData = {
  email: string
  name: string
  password: string
}

export const fetchSignUp = async (
  data: SendData,
  file: Blob,
  setPostState: (num: number) => void,
  dispatch: Dispatch<AnyAction>,
  setCookie: (name: string, value: any) => void,
  setErrorMessage: (str: string) => void,
  navigation: NavigateFunction
) => {
  // Wait画面を起動
  setPostState(0)

  // 新規ユーザ作成
  await axios
    .post(`${url}/users`, data)
    .then(async (res) => {
      // 成功時は画像アップロードもする
      const token = res.data.token

      setPostState(1)
      const imageResponse = await fetchUserImageEdit(file, token)
      if (imageResponse) {
        setPostState(2)
      }

      setTimeout(() => {
        navigation('/')
        dispatch(signIn())
        setCookie('token', token)
      }, 100)
    })
    .catch((err) => {
      setPostState(-1)
      return setErrorMessage(
        `サインアップに失敗しました。 ${err.response.data.ErrorMessageJP}`
      )
    })
    .catch((err) => {
      return setErrorMessage(`エラー： ${err}`)
    })
}
