import './SummaryCard.css'

function SummaryCard({ data, title, mode = 'light' }) {

  return (
    <div className={`summary-card ${mode}`}>
      <h1 className="summary-data">{data}</h1>
      <h3 className="summary-label">{title}</h3>
    </div>
  )
}

export default SummaryCard
