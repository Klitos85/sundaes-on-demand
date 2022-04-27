import {
	render,
	screen,
	waitFor
} from '../../../test-utils/testing-library-utils'
import OrderEntry from '../OrderEntry'
import { rest } from 'msw'
import { server } from '../../../mocks/server'
import userEvent from '@testing-library/user-event'

describe('Error Order Entry page', () => {
	server.resetHandlers(
		rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
			res(ctx.status(500))
		),
		rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
			res(ctx.status(500))
		)
	)

	it('should handle errors for scoops and topping routes', async () => {
		render(<OrderEntry setOrderPhase={jest.fn()} />)

		await waitFor(async () => {
			const alerts = await screen.findAllByRole('alert')

			expect(alerts).toHaveLength(2)
		})
	})
})

describe('Order Entry page', () => {
	it('should disable Order Sundae button', async () => {
		render(<OrderEntry setOrderPhase={jest.fn()} />)

		let orderButton = await screen.findByRole('button', {
			name: /order sundae!/i
		})
		expect(orderButton).toBeDisabled()

		const chocolateInput = await screen.findByRole('spinbutton', {
			name: 'Chocolate'
		})

		userEvent.clear(chocolateInput)
		userEvent.type(chocolateInput, '1')

		expect(orderButton).toBeEnabled()

		userEvent.clear(chocolateInput)
		userEvent.type(chocolateInput, '0')

		expect(orderButton).toBeDisabled()
	})
})
