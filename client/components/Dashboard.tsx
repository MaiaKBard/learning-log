import React from 'react'
import { useState, useEffect} from 'react'

const Dashboard = () => {
  const [data, setData ] = useState([])
  const [loading, setLoading ] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await fetch('http://localhost:3000/dashboard')
      const json = await response.json()

      setData(json)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <h1>Learning Dashboard</h1>
      {loading ? <p>Loading...</p> : <div>{data.map(({ _id, title, summary }) => {
        return <div key={_id}> {title} {summary} </div>
      })}</div>}
    </>
  )
}

export default Dashboard