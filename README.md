# Getting Started with Create React App

1. Make sure you have installed all the required packages and libraries using "npm install" before you start.
2. This application is created by "create-react-app" so be sure to start app by running "npm start"

## Introduction

This is a small country book application created by React.js. Datasource was sourced from "https://restcountries.com/v3/all", You can see all the country in the list in alphabetical order and click each country to get detail information. You can also search country with keyword, and get result that contains the keyword you input.



## Assumptions
1. There are two pages as asked in challenge instruction. Root page is country list page and "/countryname" is country detail page
2. Antd can handle large amount of data and do auto-pagination(That will not show my pagination work). For the reason that the given API can only return all country data, I try to splice the datasets into array of 10 elements to simulate that I got different data based on pagenumber and pagesize from API. (For example, the given data is like '[country1, country2, .....]', I splice it like '[[country1, country2, ..., country10], [country11, country12, ...., country20],...]').
3. For searching country, I return the data that contains users' keyword. (For example, if users' keyword is 'al', the country like 'New Zealand' will be returned that contains 'al')
4. For country detail page, I took the eng.f as my demonym info. (TBH I dont really know the difference between 'f' and 'm').
5. Users can click 'undo search' button to reset the country list and go back to page 1



## Resources
1. React.js (staging tool is 'create-react-app')
2. antd(UI component library for responsive and delicate design)
3. Axios for ajax API calling
4. react-router-dom for react route
5. react-spinners for loading spinner animation



## Thank you for your opportunity!