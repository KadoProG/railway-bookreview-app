import axios from 'axios'
import { url } from '../const'

export type Book = {
  id: string
  title: string
  url: string
  detail: string
  review: string
  reviewer: string
  isMine: boolean
}

export const fetchBooks = async (
  cookiesToken: string,
  setBooks: (books: Book[]) => void,
  setErrorMessage: (str: string) => void,
  initOffset?: number
) => {
  const offset = initOffset ?? 0
  try {
    const headers = cookiesToken
      ? {
          Authorization: `Bearer ${cookiesToken}`,
        }
      : {}

    const urlMore = cookiesToken ? '' : '/public'

    const res = await axios.get(`${url}${urlMore}/books?offset=${offset}`, {
      headers,
    })

    setBooks(res.data)
  } catch (err: any) {
    if (err.response) {
      if (err.response.status === 401) {
        return setErrorMessage(
          'データ取得に失敗しました。セッションの有効期限が切れたようです。'
        )
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

export const fetchPOSTLog = async (
  cookiesToken: string,
  selectBookId: string,
  setErrorMessage: (str: string) => void
) => {
  const data = { selectBookId }
  try {
    await axios.post(`${url}/logs`, data, {
      headers: {
        Authorization: `Bearer ${cookiesToken}`,
      },
    })
    return true
  } catch (err: any) {
    if (err.response) {
      if (err.response.status === 401) {
        return setErrorMessage(
          'データ取得に失敗しました。セッションの有効期限が切れたようです。'
        )
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
