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
              <td className="brewery-name">
                {brewery.name}
              </td>
              <td>
                <span className={`type-tag type-${brewery.brewery_type}`}>
                  {brewery.brewery_type}
                </span>
              </td>
              <td>
                {[brewery.city, brewery.state].filter(Boolean).join(' / ')}
              </td>
              <td>
                {brewery.phone ? brewery.phone : 'n/a'}
              </td>
              <td>
                {brewery.website_url ? (
                  <a
                    className="website-button"
                    href={brewery.website_url}
                    target="_blank"
                  >
                    Visit
                  </a>
                ) : (
                  'n/a'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
