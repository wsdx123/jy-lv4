import { useMutationHook } from 'hooks/queryHooks'
import { useEffect, useState } from 'react'
import { getPost, updatePost } from 'service/api'
import styles from 'pages/Update/Update.module.css'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from 'firebase.js'
import { useNavigate, useParams } from 'react-router-dom'
import { CameraIcon } from 'assets/svgs'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { openAlert } from 'redux/modules/modalSlice'

function Update() {
  const [input, setInput] = useState({
    title: '',
    content: ''
  })
  const [imgFile, setImgFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const params = useParams().postId
  const { data } = useQuery(['post', params], () => getPost(params))

  useEffect(() => {
    const { title, context, picture } = data
    setInput({ title, content: context })
    setPreview(picture)
  }, [data])

  const mutation = useMutationHook(updatePost, 'posts')

  const handleUpload = (e) => {
    const file = e.target.files[0]
    console.log(file)
    const img = URL.createObjectURL(file)
    setImgFile(file)
    setPreview(img)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!imgFile) {
      dispatch(openAlert('이미지를 넣어주세요.'))
      return
    }
    const newPost = { ...data, title: input.title, context: input.content, picture: imgFile }
    const imageRef = ref(storage, `images/${newPost.id}`)

    await uploadBytes(imageRef, imgFile)

    const downloadURL = await getDownloadURL(imageRef)
    newPost.picture = downloadURL

    mutation.mutate(newPost)
    setInput({ title: '', content: '' })
    setImgFile(null)
    setPreview(null)
    navigate(`/detail/${data.id}`)
  }

  return (
    <div className={styles.updateContainer}>
      <form className={styles.updateForm} onSubmit={handleSubmit}>
        <div className={styles.picContainer}>
          <label className={styles.fileLabel} htmlFor='file'>
            <CameraIcon className={styles.icon} />
          </label>
          <input className={styles.file} id='file' type='file' onChange={handleUpload} />
          <div className={styles.previews}>
            {preview && <img src={preview} alt='미리보기' width={50} height={50} />}
          </div>
        </div>
        <div className={styles.inputBox}>
          <label htmlFor='title'>제목</label>
          <input
            id='title'
            placeholder='제목'
            value={input.title}
            onChange={(e) => setInput({ ...input, title: e.target.value })}
          />
        </div>
        <div className={styles.inputBox}>
          <label htmlFor='content'>내용</label>
          <textarea
            id='content'
            type='text'
            value={input.content}
            placeholder='내용을 입력해주세요'
            onChange={(e) => setInput({ ...input, content: e.target.value })}
          />
        </div>
        <button type='submit'>작성</button>
      </form>
    </div>
  )
}

export default Update
