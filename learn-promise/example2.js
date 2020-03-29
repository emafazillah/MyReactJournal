const { StringStream } = require('scramjet');
const request = require('request');

const URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/';
const CSV = '.csv';

try {
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
    
    request.get(URL + formattedYesterdayDate + CSV)
        .pipe(new StringStream())
        .CSVParse({ skipEmptyLines: true, header: true })
        .filter(object => (object.Country_Region === 'Malaysia'))
        .map(async(object) => {
            // TODO: Get country region from configuration
        });
} catch (error) {
    console.log(error.message);
}