import React, { useContext } from 'react'
import Product from './Product'

import '../styles/components/Products.css'
import { AppContext } from '../context/AppContext'

const Products = () => {
	const {
		state: { products },
		addToCart,
	} = useContext(AppContext)

	return (
		<div className='Products'>
			<div className='Products-items'>
				{products.map(product => (
					<Product key={product.id} product={product} addToCart={addToCart} />
				))}
			</div>
		</div>
	)
}
export default Products
