const closeBrowser = async (browser, page) => {
    await page.close();
    await browser.close();
}

module.exports = closeBrowser;