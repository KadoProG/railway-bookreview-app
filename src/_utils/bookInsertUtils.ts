import axios from 'axios'
import { url } from '../const'

type SendData = {
  title: string
  url: string
  detail: string
  review: string
}

/**
 * 新規書籍の挿入
 */
export const fetchBookInsert = async (
  data: SendData,
  setErrorMessage: (str: string) => void,
  cookiesToken: string
) => {
  return await axios
    .post(`${url}/books`, data, {
      headers: {
        Authorization: `Bearer ${cookiesToken}`,
      },
    })
    .then(async () => {
      return true
    })
    .catch((err) => {
      if (!!err.response.data && !!err.response.data.ErrorMessageJP) {
        setErrorMessage(
          `データ取得に失敗しました。${err.response.data.ErrorMessageJP}`
        )
      } else {
        setErrorMessage(`エラー：${err}`)
      }
      return false
    })
    .catch((err) => {
      setErrorMessage(`エラー： ${err}`)
      return false
    })
}
