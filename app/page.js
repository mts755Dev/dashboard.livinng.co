'use client'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useUser from './store/User'
const CryptoJS = require('crypto-js')

export default function Login() {
	const encryptionKey = 'user'
	const { User, setUser } = useUser()
	const router = useRouter()

	async function handleSubmit(event) {
		event.preventDefault()

		const email = event.target.email.value
		const password = event.target.password.value

		try {
			const response = await axios.post(
				'https://www.api.livinng.co/dashboard/login',
				{
					email,
					password,
				},
			)

			if (response.status === 200) {
				const encryptedData = CryptoJS.AES.encrypt(
					JSON.stringify(response.data),
					encryptionKey,
				).toString()

				const decryptedData = CryptoJS.AES.decrypt(
					encryptedData,
					encryptionKey,
				).toString(CryptoJS.enc.Utf8)

				setUser({
					userId: response.data.id,
					role: response.data.role,
					token: response.data.token,
					name: response.data.name,
				})
				console.log('Iniciado correctamente')
				console.log(response)
				localStorage.removeItem('userData')
				localStorage.setItem('userData', encryptedData)

				router.push(`/${response.data.role.toLowerCase()}/dashboard`)
			} else {
				console.log('Login failed')
			}
		} catch (error) {
			console.error('Ha ocurrido un error al iniciar sesion:', error)
		}
	}

	useEffect(() => {
		const userData = localStorage.getItem('userData')
		if (userData) {
			const decryptedData = CryptoJS.AES.decrypt(
				userData,
				encryptionKey,
			).toString(CryptoJS.enc.Utf8)
			const parsedData = JSON.parse(decryptedData)
			setUser({ parsedData })
			router.replace(`/${parsedData.role.toLowerCase()}/dashboard`)
		}
	}, [])

	return (
		<section className='w-full h-auto'>
			<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
				<a
					href='#'
					className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
				>
					<Image
						src='https://res.cloudinary.com/dg8awhbvm/image/upload/v1690128865/Proyecto%20JS%20vanilla/2222_an6eid.png'
						alt='logo'
						width={120}
						height={120}
					/>
				</a>
				<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Inicia sesión con tu cuenta
						</h1>
						<form
							className='space-y-4 md:space-y-6'
							action='#'
							onSubmit={handleSubmit}
						>
							<div>
								<label
									htmlFor='email'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Email
								</label>
								<input
									type='email'
									name='email'
									id='email'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='name@company.com'
									required=''
								/>
							</div>
							<div>
								<label
									htmlFor='password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Contraseña
								</label>
								<input
									type='password'
									name='password'
									id='password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required=''
								/>
							</div>
							<button
								type='submit'
								className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-corporate-blue'
							>
								Iniciar sesión
							</button>
							<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
								¿No tienes una cuenta?{' '}
								<Link
									href='/register'
									className='font-medium text-primary-600 hover:underline dark:text-primary-500'
								>
									Registrate
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}
