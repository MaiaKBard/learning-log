import React from 'react'
import { useState, useEffect} from 'react'

const Dashboard = () => {
  const [data, setData] = useState<{
    _id: string,
    url: string,
    title: string,
    summary: string,
    breakdown: string,
    deeperDive: string
  }[]>([])
  const [loading, setLoading ] = useState(true)
  const [selectedEntry, setSelectedEntry] = useState<{
    _id: string,
    url: string,
    title: string,
    summary: string,
    breakdown: string,
    deeperDive: string
  } | null>(null)

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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/dashboard/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        setData(data.filter(item => item._id !== id))
        console.log('Successful Delete')
      }

    } catch(err) {
      console.log("Error deleting item:", err)
    }
  }

  return (
    <>
     {selectedEntry === null ? (
      <div className="dashboard-container">
        <p className="page-label">DASHBOARD PAGE</p>
        <h1>Learning Dashboard</h1>
        <p>Your saved resources</p>
          {loading ? <p>Loading...</p> :
            <div className="card-grid"> {
              data.map(({ _id, url, title, summary, breakdown, deeperDive }) => (
                <div key={_id} className="card" onClick={() => setSelectedEntry({_id, url, title, summary, breakdown, deeperDive})}> 
                  <div className="card-tag"> {new URL(url).hostname} </div>
                  <div className="card-title">{title}</div>
                  <div className="card-summary">{summary}</div>
                  <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(_id)}}>Delete</button>
                </div>
              ))}
            </div>
          }
      </div>
    ) : (
      <div className="entry-view">
        <button onClick={() => setSelectedEntry(null)}>← Back to dashboard</button>
        <h1 className="entry-title">{selectedEntry.title}</h1>
        <p className="resource-url">{selectedEntry.url}</p>
        <div className="section"><h2>Summary</h2><p>{selectedEntry.summary}</p></div>
        <div className="section"><h2>Breakdown</h2><p>{selectedEntry.breakdown}</p></div>
        <div className="section"><h2>Deeper Dive</h2><p>{selectedEntry.deeperDive}</p></div>
    </div>
  )}
    </>
  )
}

export default Dashboard