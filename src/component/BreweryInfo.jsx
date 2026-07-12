import { useState, useEffect } from 'react'
import '../App.css'
import './BreweryInfo.css'

const url = 'https://api.openbrewerydb.org/v1/breweries/'

function BreweryInfo(props) {

    const [brewery, setBrewery] = useState(null);

    const callAPI = async (url) => {
        const response = await fetch(url);
        const json = await response.json();
        if (!json || !json.id) {
            alert("Oops! Something went wrong with that query, let's try again!")
        }
        else {
            setBrewery(json);
        }
    }

    useEffect(() => {
        callAPI(url + props.breweryId);
    }, [props.breweryId]);

    if (!brewery) {
        return <p>Loading...</p>
    }

    return (
        <>
            <h1 className="breweryName">{brewery.name}</h1>
            <table className="brewery-info-table">
                <tbody>
                    <tr>
                        <th>Type</th>
                        <td>{brewery.brewery_type}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>{brewery.address_1 || 'n/a'}</td>
                    </tr>
                    <tr>
                        <th>City</th>
                        <td>{brewery.city}</td>
                    </tr>
                    <tr>
                        <th>State</th>
                        <td>{brewery.state}</td>
                    </tr>
                    <tr>
                        <th>Postal Code</th>
                        <td>{brewery.postal_code}</td>
                    </tr>
                    <tr>
                        <th>Country</th>
                        <td>{brewery.country}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>{brewery.phone || 'n/a'}</td>
                    </tr>
                    <tr>
                        <th>Website</th>
                        <td>
                            {(() => {
                                if (brewery.website_url) {
                                    return (
                                        <a href={brewery.website_url} target="_blank">
                                            {brewery.website_url}
                                        </a>
                                    )
                                }
                                else {
                                    return 'n/a'
                                }
                            })()}
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default BreweryInfo
