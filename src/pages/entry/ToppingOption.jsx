import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

export default function ToppingOption({ name, imagePath, updateItemCount }) {
	const handleChange = (event) => {
		updateItemCount(name, event.target.checked ? 1 : 0)
	}
	return (
		<Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
			<img
				style={{ width: '75%' }}
				src={`http://localhost:3030/${imagePath}`}
				alt={`${name} topping`}
			/>
			<Form.Group
				controlId={`${name}-topping-checkbox`}
				as={Row}
				style={{ marginTop: '10px' }}
			>
				<Form.Check type="checkbox" onChange={handleChange} label={name} />
			</Form.Group>
		</Col>
	)
}
