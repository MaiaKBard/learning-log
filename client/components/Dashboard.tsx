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
      <div className="dashboard-container">
        <p className="page-label">DASHBOARD PAGE</p>
        <h1>Learning Dashboard</h1>
        <p>Your saved resources</p>
        {loading ? <p>Loading...</p> :
          <div className="card-grid"> {
            data.map(({ _id, title, summary }) => (
              <div key={_id} className="card"> 
                <div className="card-title">{title}</div>
                <div className="card-summary">{summary}</div>
              </div>
            ))
          }</div>
        }
      </div>
    </>
  )
}

export default Dashboard