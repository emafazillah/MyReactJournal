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
    
    // request.get(URL + formattedYesterdayDate + CSV)
    //     .pipe(new StringStream())
    //     .CSVParse({ skipEmptyLines: true, header: true })
    //     .filter(object => (object.Country_Region === 'Canada'))
    //     .map(async(object) => {
    //         // TODO: Get country region from configuration
    //     });

    let result = [];

    request.get(URL + formattedYesterdayDate + CSV)
        .pipe(new StringStream())
        .CSVParse({ skipEmptyLines: true, header: true })
        .filter(object => (object.Country_Region === 'Malaysia'))
        .map(async(object) => {
            result.push(object)
            console.log('result: ', result);
        });

    Promise.all([result])
        .then(objects => {
            let totalDeaths = 0;
            objects.forEach(object => {
                console.log('object: ', object);
                console.log('Deaths: ', object.Deaths);
                totalDeaths += object.Deaths;
            });
            return totalDeaths;
        })
        .then(totalDeaths => `Total Deaths in US as ${yesterday} is ${totalDeaths}`)
        .catch(() => console.log('ERROR'));
} catch (error) {
    console.log(error.message);
}