import React from 'react'
import { useState, useEffect} from 'react'

const Dashboard = () => {
  const [data, setData ] = useState([])
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

  return (
    <>
      <div className="dashboard-container">
        <p className="page-label">DASHBOARD PAGE</p>
        <h1>Learning Dashboard</h1>
        <p>Your saved resources</p>
        {selectedEntry === null ? (
          loading ? <p>Loading...</p> :
            <div className="card-grid"> {
              data.map(({ _id, url, title, summary, breakdown, deeperDive }) => (
                <div key={_id} className="card" onClick={() => setSelectedEntry({_id, url, title, summary, breakdown, deeperDive})}> 
                  <div className="card-title">{title}</div>
                  <div className="card-summary">{summary}</div>
                </div>
              ))}
            </div>
        ) : (
            <div className="entry-view">
              <button onClick={() => setSelectedEntry(null)}> ← </button>
              <h3>{selectedEntry.title}</h3>
              <div>
                <h2>URL</h2>
                <p>{selectedEntry.url}</p>
              </div>
              <div>
                <h2>Deeper Dive</h2>
                <p>{selectedEntry.deeperDive}</p>
              </div>
              <div>
                <h2>Summary</h2>
                <p>{selectedEntry.summary}</p>
              </div>
              <div>
                <h2>Breakdown</h2>
                <p>{selectedEntry.breakdown}</p>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}

export default Dashboard