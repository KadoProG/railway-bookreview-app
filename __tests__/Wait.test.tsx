import { render } from '@testing-library/react'

import Wait from '../src/components/Wait'

describe('Waitコンポーネントをテストします', () => {
  it('コンポーネントの作成', async () => {
    render(
      <Wait
        nowIndex={-1}
        title="テストダイアログ"
        stateList={['1番目', '2番目']}
      />
    )
  })
})
