import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { ChangeSession } from '../pages/test/ChangeSession'
import { Profile } from '../pages/Profile'
import { New } from '../pages/New'
import { Detail } from '../pages/Detail'
import { Edit } from '../pages/Edit'

export const Router = () => {
  const auth = useSelector((state: any) => state.auth.isSignIn)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/reset" element={<ChangeSession />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new" element={<New />} />
        <Route path="/detail/:bookId" element={<Detail />} />
        <Route path="/edit/:bookId" element={<Edit />} />

        {auth ? (
          <>
            {/* <Route path="/task/new" element={<NewTask />} />
            <Route path="/list/new" element={<NewList />} />
            <Route path="/lists/:listId/tasks/:taskId" element={<EditTask />} />
            <Route path="/lists/:listId/edit" element={<EditList />} /> */}
          </>
        ) : (
          <></>
          // <Route
          //   path="/*"
          //   element={<Navigate to="/login" state={{ permanent: false }} />}
          // />
        )}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
