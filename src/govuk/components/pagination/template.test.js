/**
 * @jest-environment jsdom
 */
/* eslint-env jest */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('pagination')

describe('Pagination', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('pagination', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders the correct URLs for each link', () => {
      const $ = render('pagination', examples.default)
      const previous = $('.govuk-pagination__item--prev .govuk-pagination__link')
      const next = $('.govuk-pagination__item--next .govuk-pagination__link')
      const firstNumber = $('.govuk-pagination__item:nth-child(2) .govuk-pagination__link')
      const thirdNumber = $('.govuk-pagination__item:nth-child(4) .govuk-pagination__link')

      expect(previous.attr('href')).toEqual('/previous')
      expect(next.attr('href')).toEqual('/next')
      expect(firstNumber.attr('href')).toEqual('/page/1')
      expect(thirdNumber.attr('href')).toEqual('/page/3')
    })

    it('marks up the current item correctly', () => {
      const $ = render('pagination', examples.default)
      const currentNumber = $('.govuk-pagination__item--current')

      expect(currentNumber).toBeTruthy()
      expect(currentNumber.text().trim()).toEqual('Page 2 (current page)')
    })
  })

  describe('prev/next only mode', () => {
    it('changes the display to prev/next only if no items are provided', () => {
      const $ = render('pagination', examples['with prev and next only'])
      const blockNav = $('.govuk-pagination--block')
      const items = $('.govuk-pagination__item')

      expect(blockNav).toBeTruthy()
      expect(items.length).toEqual(2)
    })

    it('applies labels when provided', () => {
      const $ = render('pagination', examples['with prev and next only and labels'])
      const prevLabel = $('.govuk-pagination__item--prev .govuk-pagination__link-label')
      const nextLabel = $('.govuk-pagination__item--next .govuk-pagination__link-label')

      expect(prevLabel.text()).toEqual('1 of 3')
      expect(nextLabel.text()).toEqual('3 of 3')
    })
  })

  describe('custom attributes', () => {
    it('applies ellipses when specified', () => {
      const $ = render('pagination', examples['with many pages'])
      const ellipses = $('.govuk-pagination__item--ellipses')

      expect(ellipses).toBeTruthy()
      expect(ellipses.length).toEqual(2)
    })
  })
})
