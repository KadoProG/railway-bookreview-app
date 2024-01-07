import axios from 'axios'
import { url } from '../const'

export const fetchUserProfileEdit = async (
  name: string,
  cookiesToken: string
): Promise<boolean> => {
  const data = { name }
  try {
    await axios.put(`${url}/users`, data, {
      headers: {
        Authorization: `Bearer ${cookiesToken}`,
      },
    })
    return true
  } catch (e) {
    // eslint-disable-next-line
    console.error(e)
    return false
  }
}

/**
 * 画像アップロードの処理
 * @param file 画像ファイル
 * @param cookiesToken 認証トークン（cookies.token）
 * @returns @boolean trueなら成功
 */
export const fetchUserImageEdit = async (
  file: Blob,
  cookiesToken: string
): Promise<boolean> => {
  const data = new FormData()
  data.append('icon', file)

  try {
    await axios.post(`${url}/uploads`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${cookiesToken}`,
      },
    })
    return true
  } catch (e) {
    // eslint-disable-next-line
    console.error(e)
    return false
  }
}
