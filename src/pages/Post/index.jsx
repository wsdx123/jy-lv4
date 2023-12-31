import { useMutationHook } from 'hooks/queryHooks'
import { useState } from 'react'
import { addPost } from 'service/api'
import styles from 'pages/Post/Post.module.css'
import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from 'firebase.js'
import { useNavigate } from 'react-router-dom'
import { CameraIcon } from 'assets/svgs'

import useInput from 'hooks/useInput'

import Button from 'components/Button'

function Post() {
  const { value, onChange, reset } = useInput({ title: '', content: '' })

  const [imgFile, setImgFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const navigate = useNavigate()

  const mutation = useMutationHook(addPost, 'posts')

  const handleUpload = (e) => {
    const { files } = e.target
    if (!files[0]) return

    const file = files[0]
    const img = URL.createObjectURL(file)
    setImgFile(file)
    setPreview(img)
  }

  const handleCancel = () => {
    reset()
    setImgFile(null)
    setPreview(null)
    navigate('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPost = { id: v4(), createdAt: Date.now(), title: value.title, context: value.content, picture: '' }
    const imageRef = ref(storage, `images/${newPost.id}`)
    await uploadBytes(imageRef, imgFile)
    const downloadURL = await getDownloadURL(imageRef)
    newPost.picture = downloadURL
    mutation.mutate(newPost)

    reset()
    setImgFile(null)
    setPreview(null)
    navigate('/')
  }

  return (
    <div className={styles.postContainer}>
      <form className={styles.postForm} onSubmit={handleSubmit}>
        <div className={styles.picContainer}>
          <label className={styles.fileLabel} htmlFor='file'>
            <CameraIcon className={styles.icon} />
          </label>
          <input className={styles.file} id='file' type='file' onChange={handleUpload} />
          <div>{preview && <img src={preview} alt='미리보기' width={100} height={100} />}</div>
        </div>
        <div className={styles.inputBox}>
          <label htmlFor='title'>제목</label>
          <input
            className={styles.titleInput}
            id='title'
            placeholder='제목'
            value={value.title}
            onChange={onChange}
            name='title'
          />
        </div>
        <div className={styles.inputBox}>
          <label htmlFor='content'>내용</label>
          <textarea
            id='content'
            type='text'
            value={value.content}
            placeholder='내용을 입력해주세요'
            onChange={onChange}
            name='content'
            className={styles.textInput}
          />
        </div>
        <div className={styles.btnContainer}>
          <Button type='submit'>작성</Button>
          <Button onClick={handleCancel}>취소</Button>
        </div>
      </form>
    </div>
  )
}

export default Post
