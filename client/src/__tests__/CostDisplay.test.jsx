/**
 * @jest-environment jsdom
 */

import { render, cleanup, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CostDisplay from '../components/CostDisplay'

afterEach(cleanup)

it('renders', () => {
  const { asFragment } = render(<CostDisplay matCost={100} matVolume={100} />)
  expect(asFragment()).toMatchSnapshot()
})

it('correctly calculates and inserts into div', () => {
  render(<CostDisplay matCost={100} matVolume={100} />)

  expect(screen.getByTestId('totalcostdiv')).toHaveTextContent(10000.00)
})