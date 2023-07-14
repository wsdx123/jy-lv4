import styles from 'components/Card/Card.module.css'
import { Link } from 'react-router-dom'

function Card({ data }) {
  return (
    <Link to={`/detail/${data.id}`} className={styles.container}>
      <img alt={`pictures_${data.id}`} src={data.picture} className={styles.thumbnail} />
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{data.title}</h2>
        <p>{data.context}</p>
      </div>
    </Link>
  )
}

export default Card
