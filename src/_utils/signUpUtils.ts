import axios from 'axios'
import { url } from '../const'
import { Dispatch } from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import { signIn } from '../authSlice'
import { NavigateFunction } from 'react-router-dom'

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

      await postImage(token, file, setPostState, navigation)

      dispatch(signIn())
      setCookie('token', token)
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

const postImage = async (
  token: string,
  file: Blob,
  setPostState: (num: number) => void,
  navigation: NavigateFunction
) => {
  const data = new FormData()
  data.append('icon', file)

  await axios
    .post(`${url}/uploads`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setPostState(2)
      navigation('/') // これが動的なリダイレクト的なやつ
    })
    .catch((e) => {
      navigation('/') // これが動的なリダイレクト的なやつ
    })
}
