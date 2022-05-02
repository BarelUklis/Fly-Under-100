const app = require("express")();
const locateChrome = require("locate-chrome");

const openBrowser = require("./scraperOpen");
const closeBrowser = require("./scraperClose");


// define chrome path
let chromePath;

// define te browser and page
let browser;
let page;


//* BASIC FUNCTIONS *// 
// get chrome path
const getChromePath = async () => {
    if (!chromePath) {
      chromePath = await locateChrome();
    }
    return chromePath;
};

// open browser and page
const openBrowserAndPage = async () => {
    await getChromePath();
    !browser && console.log("Opening browser") ,browser = await openBrowser(chromePath);
    !page && console.log("Opening page") ,page = await browser.newPage();
}

const closeBrowserAndPage = async () => {
    (browser || page) && (
        await closeBrowser(browser, page)
        .then(() => {
            browser = null;
            page = null;
        })
    );
}


//* TEST FUNCTIONS *// 



//* SERVER FUNCTIONS *// 
const port = process.env.PORT || 7000;
const adress = process.env.ADRESS || "localhost";

app.listen(port, () => {
  console.log(
    `TEST IS RUNNING ON PORT ${port} AND ADRESS ${adress}`
  );
});