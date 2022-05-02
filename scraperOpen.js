const puppeteer = require("puppeteer");

class Browser {
    constructor(chromePath) {
      const launch_browser = async () => {
        this.browser = false;
        this.browser = await puppeteer.launch({
          headless: true,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-accelerated-2d-canvas",
            "--disable-gpu",
            "--shm-size=3gb",
          ],
          executablePath: chromePath,
          ignoreHTTPSErrors: true
        });
      };
  
      (async () => {
        await launch_browser();
      })();
    }
  }
  
  // wait for browser to be ready
const wait_for_browser = (browser_handler) =>
    new Promise((resolve, reject) => {
        const browser_check = setInterval(() => {
            if (browser_handler.browser !== false) {
                clearInterval(browser_check);
                resolve(true);
            }
        }, 100);
});

// open browser (on)
const openBrowser = async (path) => {
    const preperBrowser = new Browser(path);
  
    await wait_for_browser(preperBrowser);
  
    const browser = preperBrowser.browser;
    
    return browser;
};
  
module.exports = openBrowser;
  