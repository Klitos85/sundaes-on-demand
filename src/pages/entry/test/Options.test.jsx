import { render, screen } from '../../../test-utils/testing-library-utils'
import Options from '../Options'

describe('Options', () => {
	it('should display image from server with scoops', async () => {
		render(<Options optionType="scoops" />)

		const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
		expect(scoopImages).toHaveLength(2)

		const altTexts = scoopImages.map((element) => element.alt)
		expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop'])
	})

	it('should display image from server with toppings', async () => {
		render(<Options optionType="toppings" />)

		const toppingImages = await screen.findAllByRole('img', {
			name: /topping$/i
		})
		expect(toppingImages).toHaveLength(3)

		const altTexts = toppingImages.map((element) => element.alt)
		expect(altTexts).toEqual([
			'Cherries topping',
			'M&Ms topping',
			'Hot fudge topping'
		])
	})
})
