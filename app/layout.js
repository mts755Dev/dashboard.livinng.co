'use client'

import './globals.css'
import { useMediaQuery } from '@react-hook/media-query'

import { Inter, Montserrat } from 'next/font/google'

import SideBar from './components/sideBar'
import NavBar from './components/NavBar'
import { usePathname } from 'next/navigation'
import useUser from './store/User'
import { useEffect } from 'react'

const inter = Inter({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
})

const montserrat = Montserrat({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-montserrat',
})

const CryptoJS = require('crypto-js')

export default function RootLayout({ children }) {
	const isMobile = useMediaQuery('(max-width: 767px)')
	const pathname = usePathname()
	const { User, setUser } = useUser()
	const encryptionKey = 'user'

	useEffect(() => {
		const userData = localStorage.getItem('userData')
		if (userData) {
			const decryptedData = CryptoJS.AES.decrypt(
				userData,
				encryptionKey,
			).toString(CryptoJS.enc.Utf8)
			const parsedData = JSON.parse(decryptedData)
			setUser(parsedData)
		}
	}, [])

	return (
		<html lang='es' className={`${inter.variable} ${montserrat.variable}`}>
			<body className='flex flex-row font-inter'>
				{isMobile ? (
					<h1>Porfavor ingresa desde una computadora</h1>
				) : pathname === '/' || pathname === '/register'? (
					<>{children}</>
				) : (
					<>
						<SideBar />
						<container className='grid grid-rows-[100px_1fr] h-full w-full'>
							<NavBar />
							<main className='px-50px py-25px flex flex-col gap-25px overflow-y-scroll'>
								{children}
							</main>
						</container>
					</>
				)}
			</body>
		</html>
	)
}
