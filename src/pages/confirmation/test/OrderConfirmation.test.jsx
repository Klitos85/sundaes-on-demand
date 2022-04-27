import { render, screen } from '../../../test-utils/testing-library-utils'
import { server } from '../../../mocks/server'
import { rest } from 'msw'

import OrderConfirmation from '../OrderConfirmation'

describe('Order Confirmation', () => {
	it('should show error response from the server for submitting order', async() => {
		server.resetHandlers(
			rest.post('http://localhost:3030/order', (_, res, ctx) =>
				res(ctx.status(500))
			)
		)

    render(<OrderConfirmation setOrderPhase={jest.fn()}/>)

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(
      'An unexpected error occurred. Please try again later.'
    )
	})
})
