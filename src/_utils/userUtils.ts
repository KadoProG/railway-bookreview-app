import axios from 'axios'
import { url } from '../const'

// ユーザデータを取得
export const fetchGetUserData = async (
  cookiesToken: string,
  setUser: (data: any) => void,
  setErrorMessage: (message: string) => void
) => {
  try {
    const res = await axios.get(`${url}/users`, {
      headers: {
        Authorization: `Bearer ${cookiesToken}`,
      },
    })
    setUser(res.data)
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.ErrorMessageJP) {
      setErrorMessage(
        `データ取得に失敗しました。${err.response.data.ErrorMessageJP}`
      )
    } else {
      setErrorMessage(`エラー：${err}`)
    }
  }
}
