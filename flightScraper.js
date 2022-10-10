const openBrowser = require("./scraperOpen");
const closeBrowser = require("./scraperClose");
const formatLink = require("./linkFormater");
const {
    originCountry,
    flightOrderdListSelector,
    flightDestinationSelector,
    flightDatesSelector,
    flightPriceSelector,
    flightStopsSelector,
    flightDurationSelector
} = require("./selectors");

const getFlights = async (maxPrice = 100) => {
    const headless = true;
    const url = 'https://www.google.com/travel/explore?curr=USD&hl=en-US';

    const browser = await openBrowser(headless);
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });
    await page.waitForSelector(flightOrderdListSelector);

    const origin = await page.$eval(originCountry, el => el.value);
    const flightOrderdList = await page.$(flightOrderdListSelector);
    const flightItems = await flightOrderdList.$$('li');

    const flights = [];

    for (let i = 0; i < flightItems.length; i++) {
        const flightDestination = await flightItems[i].$(flightDestinationSelector);
        const flightDates = await flightItems[i].$(flightDatesSelector);
        const flightPrice = await flightItems[i].$(flightPriceSelector);
        const flightStops = await flightItems[i].$(flightStopsSelector);
        const flightDuration = await flightItems[i].$(flightDurationSelector);

        const destination = await page.evaluate(el => el?.innerHTML, flightDestination);
        const price = await page.evaluate(el => el?.innerHTML, flightPrice);
        const dates = await page.evaluate(el => el?.innerHTML, flightDates);
        const stops = await page.evaluate(el => el?.innerHTML, flightStops);
        const duration = await page.evaluate(el => el?.innerHTML, flightDuration);
        const link = formatLink(origin, dates, destination);

        const flight = {
            destination,
            dates,
            price,
            stops,
            duration,
            link
        };

        flights.push(flight);
    }
    closeBrowser(browser, page);

    const filterdFlights = flights.filter(flight => {
        const priceClean = flight.price.replace(/[^0-9]/g, '');
        return priceClean < maxPrice;
    });

    return {
        origin,
        flightsFound: filterdFlights.length,
        flights: filterdFlights
    }
}

module.exports = getFlights;