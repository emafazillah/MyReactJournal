const { StringStream } = require('scramjet');
const request = require('request');

const URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/';
const CSV = '.csv';

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
let formattedYesterdayDate = '';
const getMonth = yesterday.getMonth() + 1;
if (getMonth < 10) {
    formattedYesterdayDate = '0' + getMonth + '-' + yesterday.getDate() + '-' + yesterday.getFullYear();
} else {
    formattedYesterdayDate = getMonth + '-' + yesterday.getDate() + '-' + yesterday.getFullYear();
}

async function getResult(country) {
    let arr = [];
    await request
            .get(URL + formattedYesterdayDate + CSV)
            .pipe(new StringStream())
            .CSVParse({ skipEmptyLines: true, header: true })
            .filter(data => (data.Country_Region === country))
            .consume(data => arr.push(data));
    return arr;
}

getResult('Australia')
    .then(result => console.log('result: ', result));