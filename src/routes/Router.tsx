import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { ChangeSession } from '../pages/test/ChangeSession'

export const Router = () => {
  const auth = useSelector((state: any) => state.auth.isSignIn)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/test" element={<ChangeSession />} />

        <Route path="/signup" element={<SignUp />} />
        {auth ? (
          <>
            <Route path="/" element={<Home />} />
            {/* <Route path="/task/new" element={<NewTask />} />
            <Route path="/list/new" element={<NewList />} />
            <Route path="/lists/:listId/tasks/:taskId" element={<EditTask />} />
            <Route path="/lists/:listId/edit" element={<EditList />} /> */}
          </>
        ) : (
          <Route
            path="/*"
            element={<Navigate to="/login" state={{ permanent: false }} />}
          />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
