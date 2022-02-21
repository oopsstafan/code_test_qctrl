import React from 'react'
import { Card } from 'antd'
import { useLocation } from "react-router-dom"
import {reqCountryList} from '../../api/index'

import './Details.css'

export default function Details() {
  let curlocation = useLocation().pathname
  curlocation = curlocation.split('/')[1]
  let [isLoading, setIsLoading] = React.useState(true)
  let [currCountry, setCurrCountry] = React.useState([])
  React.useEffect(() => {
    getCountryInfo()
  }, [])

  const getCountryInfo = async ()=>{
    let result = await reqCountryList()
    //set up loading status
    if (result) setIsLoading(false)
    //get current selected country info
    result = result.data.filter(item=>{
      return item.name.common === curlocation
    })
    setCurrCountry(result)
  }
  return (
    <Card title={curlocation}
      loading={isLoading}
    >
      {/* show selected country information after data is successfully loaded */}
      <label htmlFor="">Name: </label><span>{currCountry[0]? currCountry[0].name.common:'Loading...'}</span><hr />
      <label htmlFor="">Flag: </label><img src={currCountry[0]? currCountry[0].flags[1]:''}></img><hr />
      <label htmlFor="">Population: </label><span>{currCountry[0]? currCountry[0].population:'Loading...'}</span><hr />
      <label htmlFor="">Demonym: </label><span>{currCountry[0]? currCountry[0].demonyms.eng.f:'Loading...'}</span><hr />
    </Card>
  )
}
