/* eslint-env jest */

const configPaths = require('../../../../config/paths.json')
const PORT = configPaths.ports.test

const baseUrl = 'http://localhost:' + PORT
const buttonClass = '.govuk-js-hide-this-page-button'

describe('/components/hide-this-page', () => {
  beforeEach(async () => {
    await page.goto(baseUrl + '/components/hide-this-page/preview', { waitUntil: 'load' })
  })

  it('navigates to the href of the button', async () => {
    const href = await page.evaluate((buttonClass) => document.querySelector(buttonClass).href, buttonClass)

    await Promise.all([
      page.waitForNavigation(),
      page.click(buttonClass)
    ])

    const url = await page.url()
    expect(url).toBe(href)
  })

  it('opens a page in a new tab when the button is clicked', async () => {
    const expectedNewTabUrl = await page.evaluate((buttonClass) => document.querySelector(buttonClass).getAttribute('data-new-tab-url'), buttonClass)
    const pageTarget = page.target()

    await Promise.all([
      page.waitForNavigation(),
      page.click(buttonClass)
    ])

    // Because we're opening a new tab, we need to wait for that tab to open and load before we can test for it
    // We do do this by waiting for a new target to appear in the browser object which was opened by our button and getting it's page object
    const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget)
    const newPage = await newTarget.page()
    const newTabUrl = await newPage.url()

    expect(newTabUrl).toBe(expectedNewTabUrl)
  })

  // Checking the browser history from within jest is very difficult, meaning we can't completely test this feature
  // To get around this, we alter the button href so that it doesn't navigate, allowing us to at least ensure that the title is changing
  it('changes the page title before navigating to scramble the browser history', async () => {
    const fakePageTitle = await page.evaluate((buttonClass) => document.querySelector(buttonClass).getAttribute('data-fake-page-title'), buttonClass)
    await page.evaluate((buttonClass) => {
      document.querySelector(buttonClass).href = '#'
    }, buttonClass)

    await page.click(buttonClass)
    const pageTitle = await page.title()

    expect(pageTitle).toBe(fakePageTitle)
  })

  it('activates the button functionality when the escape key is pressed', async () => {
    const href = await page.evaluate((buttonClass) => document.querySelector(buttonClass).href, buttonClass)

    await page.keyboard.press('Escape')
    await page.waitForNavigation()

    const url = await page.url()
    expect(url).toBe(href)
  })
})
