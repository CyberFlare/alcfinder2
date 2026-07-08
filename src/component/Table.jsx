import './table.css'

function Table({ breweries = [] }) {

  return (
    <div className="table-container">
      <table className="brewery-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {breweries.map((brewery) => (
            <tr key={brewery.id} className="brewery-row">
              <td data-label="Name" className="brewery-name">
                {brewery.name}
              </td>
              <td data-label="Type">
                <span className={`type-tag type-${brewery.brewery_type}`}>
                  {brewery.brewery_type}
                </span>
              </td>
              <td data-label="Location">
                {[brewery.city, brewery.state].filter(Boolean).join(' / ')}
              </td>
              <td data-label="Phone">
                {brewery.phone ? formatPhone(brewery.phone) : '—'}
              </td>
              <td data-label="Website">
                {brewery.website_url ? (
                  <a
                    className="website-button"
                    href={brewery.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit
                  </a>
                ) : (
                  '—'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function formatPhone(phone) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  return phone
}

export default Table
