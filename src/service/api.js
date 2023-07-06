import axios from 'axios'

const getData = async () => {
  const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`)
  console.log(data.data)
}

export default getData
