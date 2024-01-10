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
  cookiesToken: string,
  bookId?: string
) => {
  try {
    if (!bookId) {
      // 新規登録
      await axios.post(`${url}/books`, data, {
        headers: {
          Authorization: `Bearer ${cookiesToken}`,
        },
      })
    } else {
      // 編集
      await axios.put(`${url}/books/${bookId}`, data, {
        headers: {
          Authorization: `Bearer ${cookiesToken}`,
        },
      })
    }
    return true
  } catch (err: any) {
    if (!!err.response.data && !!err.response.data.ErrorMessageJP) {
      setErrorMessage(
        `データ取得に失敗しました。${err.response.data.ErrorMessageJP}`
      )
    } else {
      setErrorMessage(`エラー：${err}`)
    }
    return false
  }
}

/**
 * 書籍を削除する
 */
export const fetchBookDelete = async (
  bookId: string,
  cookiesToken: string,
  setErrorMessage: (str: string) => void
) => {
  try {
    // 削除
    await axios.delete(`${url}/books/${bookId}`, {
      headers: {
        Authorization: `Bearer ${cookiesToken}`,
      },
    })
    return true
  } catch (err: any) {
    if (!!err.response.data && !!err.response.data.ErrorMessageJP) {
      setErrorMessage(
        `データ取得に失敗しました。${err.response.data.ErrorMessageJP}`
      )
    } else {
      setErrorMessage(`エラー：${err}`)
    }
    return false
  }
}
