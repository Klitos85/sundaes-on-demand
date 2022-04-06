import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

describe('APP', () => {
	it('should order phases for happy path', async () => {
		// Render App
		render(<App />)

		// Add ice cream scoops
		const vanillaInput = await screen.findByRole('spinbutton', {
			name: 'Vanilla'
		})
		userEvent.clear(vanillaInput)
		userEvent.type(vanillaInput, '1')

		const chocolateInput = await screen.findByRole('spinbutton', {
			name: 'Chocolate'
		})
		userEvent.clear(chocolateInput)
		userEvent.type(chocolateInput, '2')

		// Add toppings
		const cherriesCheckbox = await screen.findByRole('checkbox', {
			name: 'Cherries'
		})
		userEvent.click(cherriesCheckbox)

		// Find and click order summary button
		const orderSummaryButton = screen.getByRole('button', {
			name: /order sundae/i
		})
		userEvent.click(orderSummaryButton)

		//Check summary information based on order
		const summaryHeading = screen.getByRole('heading', {
			name: 'Order Summary'
		})
		expect(summaryHeading).toBeInTheDocument()

		const scoopsHeading = screen.getByRole('heading', {
			name: 'Scoops: $6.00'
		})
		expect(scoopsHeading).toBeInTheDocument()

		const toppingsHeading = screen.getByRole('heading', {
			name: 'Toppings: $1.50'
		})
		expect(toppingsHeading).toBeInTheDocument()

		// Check summary option items
		expect(screen.getByText('1 Vanilla')).toBeInTheDocument()
		expect(screen.getByText('2 Chocolate')).toBeInTheDocument()
		expect(screen.getByText('Cherries')).toBeInTheDocument()

		// Alternative
		/* const optionItems = screen.getAllByRole('listitem')
		const optionItemsText = optionItems.map((item) => item.textContent)
		expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries']) */

		// Accept terms and conditions
		const tcCheckbox = screen.getByRole('checkbox', {
			name: /terms and conditions/i
		})
		userEvent.click(tcCheckbox)

		// Click Button confirm order
		const confirmOrderButton = screen.getByRole('button', {
			name: /confirm order/i
		})
		userEvent.click(confirmOrderButton)

		// Confirm order number on confirmation page
		// async call POST
		const thankYouHeader = await screen.findByRole('heading', {
			name: /thank you/i
		})
		expect(thankYouHeader).toBeInTheDocument()

		const orderNumber = await screen.findByText(/order number/i)
		expect(orderNumber).toBeInTheDocument()

		// Click "new order" button on confirmation page
		const newOrderButton = screen.getByRole('button', {
			name: /new order/i
		})
		userEvent.click(newOrderButton)

		// Check that scoops and toppings have been reset
		const scoopsTotal = screen.getByText('Scoops total: $0.00')
		expect(scoopsTotal).toBeInTheDocument()

		const toppingsTotal = screen.getByText('Toppings total: $0.00')
		expect(toppingsTotal).toBeInTheDocument()

		// Wait for items to appear in the page
		await screen.findByRole('spinbutton', { name: 'Vanilla' })
		await screen.findByRole('checkbox', { name: 'Cherries' })
	})
})
