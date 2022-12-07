import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { handleSumTotal } from '../utils'
import '../styles/components/Checkout.css'

const Checkout = () => {
	const {
		state: { cart },
		addToCart,
		discountOne,
		removeFromCart,
	} = useContext(AppContext)

	const handleAddOne = item => {
		addToCart(item)
	}

	const handleDiscountOne = item => {
		discountOne(item)
	}
	const handleRemoveItem = id => {
		removeFromCart(id)
	}

	return (
		<div className='Checkout'>
			<div className='Checkout-content'>
				{cart.length > 0 ? <h3>Lista de Pedidos:</h3> : <h3>No hay pedido</h3>}
				{cart.map(item => (
					<div className='Checkout-item' key={item.id}>
						<div className='Checkout-element'>
							<h4>{item.title}</h4>
							<span>${item.price}</span>
							<span>
								<button
									className='Checkout-button-qty'
									onClick={() => handleAddOne(item)}
								>
									+
								</button>
								{` ${item.qty} `}{' '}
								<button
									className='Checkout-button-qty'
									onClick={() => handleDiscountOne(item)}
								>
									-
								</button>
							</span>

							<button
								type='button'
								className='Checkout-item-delete'
								onClick={() => handleRemoveItem(item.id)}
							>
								<i className='fas fa-trash-alt'></i>
							</button>
						</div>
					</div>
				))}
			</div>
			{cart.length > 0 && (
				<div className='Checkout-sidebar'>
					<h3>{`Precio Total $ ${handleSumTotal(cart)}`}</h3>
					<Link to='/checkout/information'>
						<button type='button'>Continuar pedido</button>
					</Link>
				</div>
			)}
		</div>
	)
}

export default Checkout
