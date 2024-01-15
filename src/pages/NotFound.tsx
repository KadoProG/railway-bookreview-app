import { Header } from '../components/commons/Header'
import { Main } from '../components/commons/Main'
import { Link } from 'react-router-dom'

export const NotFound = () => (
  <>
    <Header />
    <Main errorMessage={''} title="Sorry, Not found">
      <Link to={'/'}>ホームに戻る</Link>
    </Main>
  </>
)
