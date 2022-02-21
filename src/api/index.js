import axios from 'axios'


//This file is created to store api connections
export const reqCountryList = ()=>{
    return axios.get("https://restcountries.com/v3/all")
}