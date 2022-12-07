import React, { useContext } from 'react'
import Map from '../components/Map'
import { AppContext } from '../context/AppContext'
import '../styles/components/Success.css'

const Success = () => {
	const { state } = useContext(AppContext)
	const { buyer } = state
	const { street, number, city, province, country } = buyer[0]

	return (
		<div className='Succes'>
			<div className='Success-content'>
				<h2>{buyer[0].name}, Gracias por tu compra</h2>
				<span>Tu pedido llegara en 3 dias a tu dirección:</span>
				<br></br>
				<span>{`${street} ${number}, ${city}, ${province}, ${country}`}</span>
				<div className='Success-map'>
					<Map
						street={street}
						number={number}
						city={city}
						province={province}
						country={country}
					/>
				</div>
			</div>
		</div>
	)
}

export default Success
