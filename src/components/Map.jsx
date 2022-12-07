import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import axios from 'axios'

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

function Map({ street, number, city, province, country }) {
	const [location, setLocation] = useState({ lat: 0, lng: 0 })
	const [loading, setLoading] = useState(true)
	// const { street, number, city, province, country } = buyerAddress
	const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${street}%20${number}%20${city}%20${province}%20${country}&key=${GOOGLE_API_KEY}`

	useEffect(() => {
		async function getLocation() {
			const response = await axios(API)
			setLocation(response.data.results[0].geometry.location)
			setLoading(false)
		}
		getLocation()
	}, [])

	const containerStyle = {
		width: '100%',
		height: '50vh',
	}

	const defaultCenter = {
		lat: parseFloat(location.lat),
		lng: parseFloat(location.lng),
	}

	return (
		<>
			{loading ? (
				<h1>Cargando...</h1>
			) : (
				<LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={defaultCenter}
						zoom={17}
					>
						<Marker position={defaultCenter} />
						<></>
					</GoogleMap>
				</LoadScript>
			)}
		</>
	)
}

export default React.memo(Map)
