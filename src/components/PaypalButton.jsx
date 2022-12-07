import React, { useContext } from 'react'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const ButtonWrapper = ({ currency, amount, style }) => {
	const [status] = usePayPalScriptReducer()

	const navigate = useNavigate()

	const {
		state: { cart, buyer },
		addNewOrder,
	} = useContext(AppContext)

	const handlePaymentSuccess = (details, data) => {
		if (details.status === 'COMPLETED') {
			const newOrder = {
				buyer,
				product: cart,
				payment: data,
				details,
			}
			addNewOrder(newOrder)
			navigate('/checkout/success')
		}
	}

	return (
		<>
			{status.isPending ? (
				<h1>Spinner....</h1>
			) : (
				<PayPalButtons
					style={style}
					disabled={false}
					forceReRender={[amount, currency, style]}
					fundingSource={undefined}
					createOrder={(data, actions) => {
						return actions.order
							.create({
								purchase_units: [
									{
										amount: {
											currency_code: currency,
											value: amount,
										},
									},
								],
							})
							.then(orderId => {
								// Your code here after create the order
								return orderId
							})
					}}
					onApprove={function (data, actions) {
						return actions.order.capture().then(function (details) {
							// Your code here after capture the order
							handlePaymentSuccess(details, data)
						})
					}}
					onCancel={function (data) {
						// Show a cancel page, or return to cart
					}}
					onError={function (err) {
						console.log(err)
					}}
				/>
			)}
		</>
	)
}

export { ButtonWrapper }
