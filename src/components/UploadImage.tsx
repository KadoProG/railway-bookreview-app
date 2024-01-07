import { ChangeEvent, MouseEvent, useRef } from 'react'
import styles from './UploadImage.module.scss'
import Compressor from 'compressorjs'

interface Props {
  setErrorMessage: (str: string) => void
  file: Blob | undefined
  setFile: (file: Blob | undefined) => void
}

export const UploadImage = ({ setErrorMessage, file, setFile }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files === null) return
    const data = files[0]
    if (data === undefined) return

    const sizeQuality = data.size > 1000000 ? 1000000 / data.size : 1

    new Compressor(data, {
      quality: sizeQuality,
      success(result) {
        // 圧縮完了
        if (result.size > 1000000) {
          setErrorMessage('画像が大きすぎます')
          return
        }
        setFile(result)
      },
      error(error) {
        setErrorMessage('画像アップロードに失敗しました')
      },
    })
  }

  // 画像リセットの処理
  const handleImageReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFile(undefined)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <>
      <label htmlFor="file">アイコン画像</label>
      <div className={styles.form__image}>
        <input
          ref={fileRef}
          type="file"
          accept=".png, .jpg"
          onChange={handleImageChange}
          id="file"
        />
        {file ? (
          <div className={styles.form__image__container}>
            <img
              src={URL.createObjectURL(file)}
              alt="アイコン用画像"
              width={100}
              height={100}
            />
            <button onClick={handleImageReset}>取り消す</button>
          </div>
        ) : (
          <div>
            <p>ドラッグアンドドロップ</p>
            <p>またはクリックで挿入</p>
          </div>
        )}
      </div>
    </>
  )
}
