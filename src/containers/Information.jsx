import React, { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { handleSumTotal } from '../utils'
import '../styles/components/Information.css'

const Information = () => {
	const {
		state: { cart },
		addToBuyer,
	} = useContext(AppContext)

	const navigate = useNavigate()

	const form = useRef(null)

	const handleSubmit = () => {
		const formData = new FormData(form.current)
		const buyer = Object.fromEntries(formData)
		// Lo de arriba es igual que:
		//  const buyer = {
		// 	name: formData.get('name'),
		// 	email: formData.get('email'),
		// 	address: formData.get('address'),
		// 	apto: formData.get('apto'),
		// 	city: formData.get('city'),
		// 	country: formData.get('country'),
		// 	state: formData.get('state'),
		// 	cp: formData.get('cp'),
		// 	mobile: formData.get('mobile'),
		// }
		addToBuyer(buyer)
		navigate('/checkout/payment')
	}

	return (
		<div className='Information'>
			<div className='Information-content'>
				<div className='Information-head'>
					<h2>Información de contacto:</h2>
				</div>
				<div className='Information-form'>
					<form ref={form}>
						<input type='text' placeholder='Nombre' name='name' />
						<input type='text' placeholder='Apellido' name='surname' />
						<input type='text' placeholder='Correo Electronico' name='email' />
						<input type='text' placeholder='Calle o Avenida)' name='street' />
						<input type='text' placeholder='Numero' name='number' />
						<input type='text' placeholder='Codigo postal' name='cp' />
						<input type='text' placeholder='Ciudad' name='city' />
						<input type='text' placeholder='Provincia' name='province' />
						<input type='text' placeholder='Pais' name='country' />
						<input type='text' placeholder='Celular' name='mobile' />
					</form>
				</div>
				<div className='Information-buttons'>
					<div className='Information-back'>
						<Link to='/checkout'>Regresar</Link>
					</div>
					<div className='Information-next'>
						<button type='button' onClick={handleSubmit}>
							Pagar
						</button>
					</div>
				</div>
			</div>
			<div className='Information-sidebar'>
				<h3>Pedido:</h3>
				{cart.map(item => (
					<div className='Information-item' key={item.id}>
						<div className='Information-element'>
							<h4>{`${item.title} (x ${item.qty})`}</h4>
							<span>${item.price * item.qty}</span>
						</div>
					</div>
				))}
				<h4>Total: $ {handleSumTotal(cart)}</h4>
			</div>
		</div>
	)
}

export default Information
