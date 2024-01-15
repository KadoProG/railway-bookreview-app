import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cookies } from 'react-cookie'

interface AuthState {
  isSignIn: boolean
  name: string
  iconUrl: string
}

const cookie = new Cookies()

const initialState: AuthState = {
  isSignIn: cookie.get('token') !== undefined,
  name: '',
  iconUrl: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: { type: any; payload: { name: string; iconUrl: string } }
    ) => {
      state.name = action.payload.name
      state.iconUrl = action.payload.iconUrl
    },
    signIn: (state) => {
      state.isSignIn = true
    },
    signOut: (state) => {
      state.isSignIn = false
    },
  },
})

export const { signIn, signOut, setUser } = authSlice.actions

// ペイロードの型を指定する
interface SignInActionPayload {
  // ここに必要なペイロードの型を指定する
}

// PayloadActionの型を指定してReducer関数を定義する
export const authReducer = authSlice.reducer as (
  state: AuthState,
  action: PayloadAction<SignInActionPayload>
) => void

// Redux stateの型も定義する
export interface RootState {
  auth: AuthState
}

// あるいはconfigureStoreの中で型を指定する
// const store = configureStore({
//   reducer: {
//     auth: authSlice.reducer as (state: AuthState, action: PayloadAction<SignInActionPayload>) => void,
//   },
// });

// 上記の例はSignInActionPayloadが必要ない場合のシンプルな例です。実際には必要な情報があれば型を適切に指定してください。
