/**
 * @jest-environment jsdom
 */
/* eslint-env jest */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('hide-this-page')

describe('Hide this page', () => {
  it('default example passes accessibility tests', async () => {
    const $ = render('hide-this-page', examples.default)

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('renders the default example', () => {
    const $ = render('hide-this-page', examples.default)
    const $button = $('.govuk-hide-this-page').find('.govuk-button')

    expect($button.hasClass('govuk-button--warning')).toBeTruthy()
    expect($button.text()).toContain('Hide this page')
    expect($button.attr('href')).toBe('https://www.gov.uk')
    expect($button.attr('data-new-tab-url')).toBe('https://www.google.com/search?q=weather')
    expect($button.attr('data-fake-page-title')).toBe('How to prevent the spread of Coronavirus - GOV.UK')
  })
})

describe('Custom options', () => {
  it('renders with text', () => {
    const $ = render('hide-this-page', examples.testing)
    const $button = $('.govuk-hide-this-page').find('.govuk-button')

    expect($button.text()).toContain('Hide this test')
  })

  it('renders with a current tab URL', () => {
    const $ = render('hide-this-page', examples.testing)
    const $button = $('.govuk-hide-this-page').find('.govuk-button')

    expect($button.attr('href')).toBe('https://www.test.co.uk')
  })

  it('renders with a new tab URL', () => {
    const $ = render('hide-this-page', examples.testing)
    const $button = $('.govuk-hide-this-page').find('.govuk-button')

    expect($button.attr('data-new-tab-url')).toBe('https://www.google.com/search?q=test')
  })

  it('renders with a fake page title', () => {
    const $ = render('hide-this-page', examples.testing)
    const $button = $('.govuk-hide-this-page').find('.govuk-button')

    expect($button.attr('data-fake-page-title')).toBe('This is a test')
  })

  it('renders with a custom id', () => {
    const $ = render('hide-this-page', examples.testing)
    const $component = $('.govuk-hide-this-page')

    expect($component.attr('id')).toBe('test-id')
  })

  it('renders with a custom class', () => {
    const $ = render('hide-this-page', examples.testing)
    const $component = $('.govuk-hide-this-page')

    expect($component.hasClass('test-class')).toBeTruthy()
  })

  it('renders with custom attributes', () => {
    const $ = render('hide-this-page', examples.testing)
    const $component = $('.govuk-hide-this-page')

    expect($component.attr('test-attribute')).toBe('true')
  })
})
