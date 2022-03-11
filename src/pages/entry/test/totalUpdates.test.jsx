import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import Options from '../Options'

describe('Options', () => {
	it('should update scoop subtotal when scoops change', async () => {
		render(<Options optionType="scoops" />)

		// First: sure total starts out $0.00
		const scoopsSubtotal = screen.getByText('Scoops total: $', {
			exact: false
		})
		expect(scoopsSubtotal).toHaveTextContent('0.00')

		// update vanilla scoops to 1 and check the subtotal
		const vanillaInput = await screen.findByRole('spinbutton', {
			name: 'Vanilla'
		})
		userEvent.clear(vanillaInput)
		userEvent.type(vanillaInput, '1')
		expect(scoopsSubtotal).toHaveTextContent('2.00')

		// update chocolate scoops to 2 and check the subtotal
		const chocolateInput = await screen.findByRole('spinbutton', {
			name: 'Chocolate'
		})
		userEvent.clear(chocolateInput)
		userEvent.type(chocolateInput, '2')
		expect(scoopsSubtotal).toHaveTextContent('6.00')
	})

	it('should update toppings subtotal when topping check', async () => {
		render(<Options optionType="toppings" />)

		// First: sure total starts out $0.00
		const toppingsTotal = screen.getByText('Toppings total: $', {
			exact: false
		})
		expect(toppingsTotal).toHaveTextContent('0.00')

		// Check cherries topping
		const cherryCheckbox = await screen.findByRole('checkbox', {
			name: 'Cherries'
		})
		userEvent.click(cherryCheckbox)
		expect(toppingsTotal).toHaveTextContent('1.50')

		// Check M&Ms topping
		const MMCheckbox = await screen.findByRole('checkbox', {
			name: 'M&Ms'
		})
		userEvent.click(MMCheckbox)
		expect(toppingsTotal).toHaveTextContent('3.00')

		//Uncheck the Cherries topping
		userEvent.click(cherryCheckbox)
		expect(toppingsTotal).toHaveTextContent('1.50')
	})
})
