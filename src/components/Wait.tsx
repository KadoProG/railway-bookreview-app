// API取得等時間のかかる操作の可視化UI
import styles from './Wait.module.scss'

type Props = {
  nowIndex: number // 今何番目のタスクをやっているか -1では非表示
  title: string // タイトル
  stateList: string[] // ステートリスト
}
export const Wait = (props: Props) => {
  const nowIndex = props.nowIndex
  const [activeColor, baseColor] = ['green', 'var(--color-back-next)']
  const arrList = props.stateList
  const progress = (nowIndex / arrList.length) * 100
  return (
    <div
      className={styles.wait}
      style={{
        display: nowIndex === -1 ? 'none' : 'flex',
      }}
    >
      <div className={styles.wait__dialog}>
        <p>{props.title}</p>
        <div className={styles.wait__dialog__bar}>
          <span
            className={styles.wait__dialog__bar__body}
            style={{
              background: `linear-gradient(to right, ${activeColor} ${progress}%, ${baseColor} ${progress}%)`,
            }}
          ></span>
          <div className={styles.wait__dialog__bar__balls}>
            {arrList.map((v, index) => {
              return (
                <span
                  key={index}
                  style={{
                    background: index > nowIndex ? baseColor : activeColor,
                  }}
                >
                  <span>{v}</span>
                </span>
              )
            })}
            <span
              style={{
                background: arrList.length > nowIndex ? baseColor : activeColor,
              }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  )
}
