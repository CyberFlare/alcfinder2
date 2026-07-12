import { useParams } from 'react-router'
import '../App.css'
import Header from '../component/Header'
import BreweryInfo from '../component/BreweryInfo'

function DetailedView() {

    let params = useParams();

  return (
    <>
        <Header />
        <BreweryInfo breweryId={params.breweryId} />
    </>
  )
}

export default DetailedView
