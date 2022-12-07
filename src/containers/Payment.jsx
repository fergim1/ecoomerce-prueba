import React, { useContext } from 'react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ButtonWrapper } from '../components/PaypalButton'
import { handleSumTotal } from '../utils'
import { AppContext } from '../context/AppContext'
import '../styles/components/Payment.css'

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID

const Payments = () => {
	const { state } = useContext(AppContext)
	const { cart } = state

	return (
		<div className='Payment'>
			<div className='Payment-content'>
				<h3>Resumen del pedido:</h3>
				{cart.map(item => (
					<div className='Payment-item' key={item.title}>
						<div className='Payment-element'>
							<h4>{item.title}</h4>
							<span>$ {item.price}</span>
						</div>
					</div>
				))}
				<div style={{ maxWidth: '750px', minHeight: '200px' }}>
					<PayPalScriptProvider
						options={{
							'client-id': PAYPAL_CLIENT_ID,
							commit: true,
							intent: 'capture',
							components: 'buttons',
							currency: 'EUR',
						}}
					>
						<ButtonWrapper
							amount={handleSumTotal(cart)}
							currency='EUR'
							style={{
								layout: 'vertical',
								// color: 'blue',
								shape: 'rect',
								// label: 'paypal',
							}}
						/>
					</PayPalScriptProvider>
				</div>
			</div>
			<div></div>
		</div>
	)
}

export default Payments
