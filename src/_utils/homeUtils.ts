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
    const res = await axios.get(`${url}/books?offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${cookiesToken}`,
      },
    })

    setBooks(res.data)
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
