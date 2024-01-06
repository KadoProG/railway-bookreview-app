import { useCookies } from 'react-cookie'

// テスト用 セッションを別の値に置き換える
// セッションの有効期限が切れた（セッションが間違っている）際ログアウトしないといけないため、
// セッションを適当な値にしてその状況を再現する
export const ChangeSession = () => {
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies()
  setCookie(
    'token',
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  )
  return <></>
}
