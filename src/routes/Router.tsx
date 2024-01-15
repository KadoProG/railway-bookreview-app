import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { Profile } from '../pages/Profile'
import { New } from '../pages/New'
import { Detail } from '../pages/Detail'
import { Edit } from '../pages/Edit'

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/new" element={<New />} />
      <Route path="/detail/:bookId" element={<Detail />} />
      <Route path="/edit/:bookId" element={<Edit />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)
