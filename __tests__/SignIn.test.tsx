// コンポーネントの処理のテスト
// 関数をテストするのもあり
// バックエンドの動作は関係ない（mockを利用）
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { SignIn } from '../src/pages/SignIn'
import { Provider } from 'react-redux'
import { store } from '../src/store'
import { MemoryRouter } from 'react-router-dom'

describe('ログインコンポーネントをテストします', () => {
  it('ボタンが1つあるかどうか', async () => {
    // コンポーネントをレンダリング
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
    )

    // ボタン要素を取得
    const buttonList = await screen.findAllByRole('button')
    // toHaveLengthで数をテストする
    expect(buttonList).toHaveLength(1)
  })

  it('SignInコンポーネントが正しくレンダリングされ、必要な要素が存在するかどうかを確認する', () => {
    // コンポーネントをレンダリング
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
    )

    // フォームの存在を確認
    const form = screen.getByTestId('signin-form')

    // 必要な要素が存在するか確認
    const emailInput = screen.getByLabelText(/メールアドレス/i)
    const passwordInput = screen.getByLabelText(/パスワード/i)
    const signInButton = screen.getByRole('button', { name: /サインイン/i })
    const signUpLink = screen.getByRole('link', { name: /新規作成/i })

    // 必要な要素が表示されていることを確認
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(signInButton).toBeInTheDocument()
    expect(signUpLink).toBeInTheDocument()
    expect(form).toBeInTheDocument()

    // フォームの入力とサブミットのテスト
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.submit(form)

    // サブミット後の期待される処理をテスト（例：API呼び出しのモックが必要な場合など）
    // ここではaxios.postのモックを追加するなどが考えられます
  })

  // 追加の注意事項：
  // 1. 実際のAPI呼び出しをモック化する場合は、jest.mock('axios')を使用してaxiosをモックに置き換えることができます。
  // 2. useNavigateやdispatchなどの関数をモック化することも考慮してください。
})
