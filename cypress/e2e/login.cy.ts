// バックエンドの通信を含めたEnd2Endテスト
// 人が手でテストするものをテスト
describe('ログインテスト', () => {
  // ログイン失敗
  it('ログイン失敗[メールアドレスとパスワードが不正]', () => {
    cy.visit('http://localhost:3000')

    // ログイン失敗
    cy.get('#email').clear().type('b')
    cy.get('#password').clear().type('b')
    cy.get('#form').submit()

    cy.get('#error_message').should(
      'have.text',
      'サインインに失敗しました。AxiosError: Request failed with status code 403'
    )
  })

  // 値が不正
  it('ログイン失敗[メールアドレスもパスワードも空白]', () => {
    cy.visit('http://localhost:3000')

    // ログイン失敗？
    cy.get('#email').clear()
    cy.get('#password').clear()
    cy.get('#form').submit()

    cy.get('#error_message').should(
      'have.text',
      'サインインに失敗しました。AxiosError: Request failed with status code 400'
    )
  })

  it('ログイン成功', () => {
    // 成功
    cy.visit('http://localhost:3000')
    cy.get('#email').clear().type('string@gmail.com')
    cy.get('#password').clear().type('string')
    cy.get('#form').submit()

    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('サインアウト', () => {
    // サインアウト
    cy.visit('http://localhost:3000')
    cy.get('#signout').click()
    cy.url().should('eq', 'http://localhost:3000/signin')
  })
})
