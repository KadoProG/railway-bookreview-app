import axios from 'axios'
import { url } from '../const'

export const fetchUserProfileEdit = async (
  name: string,
  cookiesToken: string,
  setErrorMessage: (message: string) => void,
  setName: (name: string) => void
): Promise<void> => {
  const data = { name }
  try {
    const res = await axios.put(`${url}/users`, data, {
      headers: {
        Authorization: `Bearer ${cookiesToken}`,
      },
    })
    setName(res.data.name)
    return
  } catch (err: any) {
    if (err.response) {
      // 401 認証エラー
      if (err.response.status === 401) {
        return setErrorMessage(
          'セッションの有効期限が切れています。再度ログインしてください。'
        )
      }
      if (err.response.data && err.response.data.ErrorMessageJP) {
        return setErrorMessage(
          `名前の変更に失敗しました：${err.response.data.ErrorMessageJP}`
        )
      }
      return setErrorMessage(`名前の変更に失敗しました：${err}`)
    }
    return setErrorMessage(`名前の変更に失敗しました：${err}`)
  }
}

/**
 * 画像アップロードの処理
 * @param file 画像ファイル
 * @param cookiesToken 認証トークン（cookies.token）
 * @param setIconUrl 関数 アイコンを変更します
 * @returns @boolean trueなら成功
 */
export const fetchUserImageEdit = async (
  file: Blob,
  cookiesToken: string,
  setIconUrl: (iconUrl: string) => void,
  setErrorMessage: (str: string) => void
): Promise<boolean> => {
  const data = new FormData()
  data.append('icon', file)

  try {
    const res = await axios.post(`${url}/uploads`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${cookiesToken}`,
      },
    })
    setIconUrl(res.data.iconUrl)
    return true
  } catch (err: any) {
    if (err.response) {
      // 401 認証エラー
      if (err.response.status === 401) {
        setErrorMessage(
          'セッションの有効期限が切れています。再度ログインしてください。'
        )
        return false
      }
      if (err.response.data && err.response.data.ErrorMessageJP) {
        setErrorMessage(
          `名前の変更に失敗しました：${err.response.data.ErrorMessageJP}`
        )
        return false
      }
      setErrorMessage(`名前の変更に失敗しました：${err}`)
      return false
    }
    setErrorMessage(`名前の変更に失敗しました：${err}`)

    return false
  }
}
