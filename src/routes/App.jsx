import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../containers/Home'
import Checkout from '../containers/Checkout'
import Information from '../containers/Information'
import Payment from '../containers/Payment'
import Success from '../containers/Success'
import NotFound from '../containers/NotFound'
import { AppProvider } from '../context/AppContext'
import '../styles/components/App.css'

function App() {
	return (
		<AppProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route path='/' element={<Home />} />
						<Route path='/checkout' element={<Checkout />} />
						<Route path='/checkout/information' element={<Information />} />
						<Route path='/checkout/payment' element={<Payment />} />
						<Route path='/checkout/success' element={<Success />} />
						<Route path='*' element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AppProvider>
	)
}

export default App
