import axios from 'axios'
import { url } from '../const'
import { Book } from './homeUtils'

/**
 * 書籍の詳細
 */
export const fetchGETBookDetail = async (
  bookId: string,
  setErrorMessage: (str: string) => void,
  cookiesToken: string,
  setBook: (books: Book) => void
) => {
  return await axios
    .get(`${url}/books/${bookId}`, {
      headers: {
        Authorization: `Bearer ${cookiesToken}`,
      },
    })
    .then(async (res) => {
      setBook(res.data)
      return
    })
    .catch((err) => {
      if (!!err.response.data && !!err.response.data.ErrorMessageJP) {
        setErrorMessage(
          `データ取得に失敗しました。${err.response.data.ErrorMessageJP}`
        )
      } else {
        setErrorMessage(`エラー：${err}`)
      }
      return
    })
    .catch((err) => {
      setErrorMessage(`エラー： ${err}`)
      return
    })
}
