const closeBrowser = async (browser, page) => {
    await page.waitFor(2500);
    await browser.close();
    console.log('Browser closed');
}

module.exports = closeBrowser;