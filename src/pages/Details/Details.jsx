import React from 'react'
import { Card } from 'antd'
import { useLocation } from "react-router-dom"
import { reqCountryList } from '../../api/index'
import { ClipLoader } from 'react-spinners'

import './Details.css'

export default function Details() {
  //make country name as an array to remove %20 if it exists
  let curlocation = useLocation().pathname
  curlocation = curlocation.split('/')[1].split('%20')
  let [loading, setLoading] = React.useState(true)
  let [currCountry, setCurrCountry] = React.useState([])
  React.useEffect(() => {
    getCountryInfo()
  }, [])

  //This function is proof the element equality of two arrays 
  const arrayEquals = (a, b) =>{
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((item, index) => item === b[index]);
  }

  const getCountryInfo = async () => {
    let result = await reqCountryList()
    //set up loading status
    if (result) setLoading(false)
    //get current selected country info
    result = result.data.filter(item => {
      return arrayEquals(item.name.common.split(' '), curlocation)
    })
    setCurrCountry(result)
  }
  
  return (
    <Card title={currCountry[0] ? currCountry[0].name.common : 'Loading...'}
      // loading={loading}
    >
      {/* show selected country information after data is successfully loaded */}
      <section style={{display: loading? 'none': ''}}>
        <label htmlFor="">Name: </label><span>{currCountry[0] ? currCountry[0].name.common : 'Loading...'}</span><hr />
        <label htmlFor="">Flag: </label><img src={currCountry[0] ? currCountry[0].flags[1] : ''}></img><hr />
        <label htmlFor="">Population: </label><span>{currCountry[0] ? currCountry[0].population : 'Loading...'}</span><hr />
        <label htmlFor="">Demonym: </label><span>{currCountry[0] ? currCountry[0].demonyms.eng.f : 'Loading...'}</span><hr />
      </section>

      <ClipLoader color="#1890FF" loading={loading} style={{ margin: '0 auto' }} size={50} />
    </Card>
  )
}
