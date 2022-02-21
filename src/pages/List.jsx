import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Table, Input, Form } from 'antd'
import { reqCountryList } from '../api/index'


export default function List() {
    //countryLength is number of countries that is going to be showed and its used for pagination
    let [countryLength, setCountryLength] = React.useState([])
    //currCountryList is the current showing country list based on different pages or clients is doing search.
    let [currCountryList, setCurrCountryList] = React.useState([])
    //current is current showing page number
    let [current, setCurrent] = React.useState(1)
    //pagiArr is used to store country list array for pagination
    let [pagiArr, setPagiArr] = React.useState([])
    //loading is deciding if page is loading finish loading.
    let [loading, setLoading] = React.useState(true)
    
    //this dataSource is used for antd for showing table information. 
    const dataSource = currCountryList
    //this is used for antd for config column options, I make the country name as clickable link for showing coutry detail pages
    const columns = [
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            render: (country) => {
                const detailPath = `/${country}`
                return (
                    <Link to={detailPath}>{country}</Link>
                )
            }
        },

    ];
    //componentDidMount
    React.useEffect(() => {
        getCountries()
    }, [])
    //this function will be executed after components being firstly rendered(ComponentDidMount)
    const getCountries = async () => {
        //define resultArr for storing neede array for pagination
        let resultArr = []
        //using async/await to get requied data from API
        let result = await reqCountryList()
        console.log(result)
        //pull out the country name of the array for the purpose of order it in alphabetical order
        result = result.data.map((item) => {
            return item.name.common
        })
        //using sort() to alphabetically order string in array
        result.sort()
        //convert array into object array so that it can be configured by antd
        result = result.map((item, index) => {
            return { country: item, key: index }
        })
        //the length of the array should be the number of total countries
        setCountryLength(result.length)
        //if there is result(which means result is finished loading) set loading to false
        if (result) setLoading(false)
        /*remove the first 10 elements in orderd array and push them into pre-defined resultArr
        every countries will be in a array of 10 countries and store in a whold array resultArr
        */
        while(result.length) resultArr.push(result.splice(0,10))
        //set pagiArr as result Arr
        setPagiArr(resultArr)
        //set up current showing page which is page 1, page 1 should be index 0 in the resultArr
        setCurrCountryList(resultArr[0])
    }

    //handle search country function
    const handleSearchCountry = async (value) => {
        //get the input keyword
        const keyword = value.keyword
        //flat pagiArr
        let result = pagiArr.flat()
        //pull out the array that contains the search keyword, case not sensative
        result = result.filter(item=>{
            return item.country.toLowerCase().search(keyword.toLowerCase()) !== -1
            
        })
        //set up current showing country list as search result
        setCurrCountryList(result)
        //set up new search result array as new data length
        setCountryLength(result.length)
    }

    //handle reset country list
    const handleReset = ()=>{
        //set up current country list as first page
        setCurrCountryList(pagiArr[0])
        //set up data length as old length
        setCountryLength(pagiArr.flat().length)
        //set up current page number as page number 1
        setCurrent(1)
    }

    //this function is executed when page number is changed, page number is default 1
    const handlePage = (page=1, pageSize)=>{
        //when on page 1, index of pagiArr should be 0, so get pagiArr[page-1] as current showing country list
        setCurrCountryList(pagiArr[page-1])
        //set current page number
        setCurrent(page)
    }
    return (

        <Card title={<div>
            <span>Search Country by Keyword</span><br/>
            <Button type="secondary" onClick={handleReset}>Undo Search</Button>
        </div>}
            loading={loading}
            extra={<Form
                name="searchCountry"
                layout="inline"
                //handle form submit which is "search"
                onFinish={handleSearchCountry}
            >
                <Form.Item name="keyword">
                    <Input
                        type="text"
                        placeholder="keyword"
                        allowClear
                        style={{ width: 200 }}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                </Form.Item>

            </Form>}
        >
            <Table
                //configure data source and column options
                dataSource={dataSource}
                columns={columns}
                pagination={{
                    pageSize: 10,
                    //get countryLength stored in hook
                    total: countryLength,
                    showSizeChanger: false,
                    //handle page change
                    onChange: handlePage,
                    //get current store in hook
                    current
                }}
            >

            </Table>
        </Card>
    );
}
