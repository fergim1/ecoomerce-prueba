import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import '../styles/components/Header.css'

const Header = () => {
	const {
		state: { cart },
	} = useContext(AppContext)

	const handleTotalQuantityInCart = () => {
		const reducer = (acc, actualValue) => acc + actualValue.qty
		const totalQty = cart.reduce(reducer, 0)
		return totalQty
	}

	return (
		<div className='Header'>
			<h1 className='Header-title'>
				<Link to='/'>PlatzConf Merch</Link>
			</h1>
			<div className='Header-checkout'>
				<Link to='/checkout'>
					<i className='fa-solid fa-cart-shopping'></i>
				</Link>
				{cart.length > 0 && (
					<div className='Header-alert'>{handleTotalQuantityInCart()}</div>
				)}
			</div>
		</div>
	)
}

export default Header
