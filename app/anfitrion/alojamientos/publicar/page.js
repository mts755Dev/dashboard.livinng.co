'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import useUser from '@/app/store/User'
import Link from 'next/link'
import Edit from 'public/Edit.svg'
import Location from 'public/Location.svg'
import Discovery from 'public/Discovery.svg'
import RightSquare from 'public/RightSquare.svg'
import Home from 'public/Home.svg'
import Filter from 'public/Filter.svg'
import EditSquare from 'public/EditSquare.svg'
import TickSquare from 'public/TickSquare.svg'
import Swal from 'sweetalert2'
// El type debe ser corregido cuando tengamos en funcionamiento el ID de cada usuario

const Form = () => {
	const { User } = useUser()

	const URL = 'https://www.api.livinng.co'

	const [allData, setAllData] = useState({
		accounTypes: [],
		accoundSize: [],
		accoundService: [],
	})
	const [imageData, setImageData] = useState([])
	const [isLoading, setIsLoading] = useState(false);

	const [form, setForm] = useState({
		name: '',
		address: '',
		price: null,
		guests: 0,
		bathrooms: 0,
		description: '',
		rooms: 0,
		beds: 0,
		distribution: '',
		location: '',
		type: '',
		size: '',
		host: '',
		services: [],
	})

	const handleImageUpload = event => {
		const files = event.target.files
		const imageFiles = Array.from(files)
		transformFiles(imageFiles)
	}

	const transformFiles = files => {
		Promise.all(
			files.map(file => {
				return new Promise((resolve, reject) => {
					const reader = new FileReader()
					reader.onloadend = () => resolve(reader.result)
					reader.onerror = reject
					reader.readAsDataURL(file)
				})
			}),
		)
			.then(results => {
				setImageData([...imageData, ...results])
			})
			.catch(error => {
				console.error('Error loading images:', error)
				setImageData([])
			})
	}

	const handleImageDelete = index => {
		const updatedImageData = [...imageData]
		updatedImageData.splice(index, 1)
		setImageData(updatedImageData)
	}

	const getAllAcc = async () => {
		const { data } = await axios(`${URL}/user/utils/acctype`)
		return data
	}

	const getAllSize = async () => {
		const { data } = await axios(`${URL}/user/utils/size`)
		return data
	}

	const getAllService = async () => {
		const { data } = await axios(`${URL}/user/utils/services`)
		return data
	}

	useEffect(() => {
		setForm(state => ({ ...state, host: User.userId }))
	}, [User.userId])

	useEffect(() => {
		const fetchData = async () => {
			const type = await getAllAcc()
			const size = await getAllSize()
			const services = await getAllService()

			setAllData({
				...allData,
				accounTypes: type,
				accoundSize: size,
				accoundService: services,
			})
		}
		fetchData()
	}, [])

	const handleIncrement = prop => {
		setForm(prevFilters => {
			let updatedValue = parseInt(prevFilters[prop]) || 0
			updatedValue++
			return {
				...prevFilters,
				[prop]: updatedValue,
			}
		})
	}

	const handleDecrement = prop => {
		setForm(prevFilters => {
			let updatedValue = parseInt(prevFilters[prop]) || 0
			if (updatedValue > 0) {
				updatedValue--
			}
			return {
				...prevFilters,
				[prop]: updatedValue,
			}
		})
	}

	const showAlert = () => {
		Swal.fire({
			title: 'Creado con exito',
			text: 'Tus cambios se veran reflejados en el apartado de alojamientos.',
			icon: 'success',
			confirmButtonColor: '#17387e',
			confirmButtonText: 'Aceptar',
			width: 400,
		})
	}

	const handleSubmit = async event => {
		event.preventDefault()
		setIsLoading(true);
		let uri = []
		try {
			for (let i = 0; i < imageData.length; i++) {
				const URLCDRY = 'https://api.cloudinary.com/v1_1/dp57hxv6h/image/upload'

				const formData = new FormData()
				formData.append('file', imageData[i])
				formData.append('upload_preset', 'ml_default')

				await axios.post(`${URLCDRY}`, formData).then(response => {
				

					if (response) {
						uri.push(response.data.secure_url)
					}
				})
			}
			await axios.post(
				`${URL}/host/acc`,
				{
					form,
					uri,
				},
				{
					headers: {
						Authorization: `Bearer ${User.token}`,
					},
				},
			)
			showAlert()
			setIsLoading(false);
			setForm({
				name: '',
				address: '',
				price: null,
				guests: 0,
				bathrooms: 0,
				description: '',
				rooms: 0,
				beds: 0,
				distribution: '',
				location: '',
				type: '',
				size: '',
				host: '',
				services: [],
			})
			setImageData([])
		} catch (error) {
			console.error(error)
		}
	}
	

	const handleChange = event => {
		const { name, value } = event.target

		if (name === 'price') {
			setForm({
				...form,
				[name]: Number(value),
			})
		} else {
			setForm({
				...form,
				[name]: value,
			})
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className='space-y-12'>
					<h2 className=' flex justify-center text-[30px] underline text-base mt-5 font-semibold leading-7 text-gray-900'>
						Bienvenido a Livinng!
					</h2>
					<p className='text-sm mt-5 leading-6 text-gray-600'>
						A continuación te solicitaremos los datos necesarios para dejar tu
						alojamiento listo para recibir ofertas de nuestros usuarios.
					</p>

					<div className='pb- border-b border-gray-900/10 pb-10 pt-9'>
						<h2 className='text-base pb-5 font-semibold leading-7 text-gray-900'>
							Datos del alojamiento
						</h2>
						<div className='flex gap-2'>
							<Image src={RightSquare} alt='Icono' width={20} height={20} />
							<label className='text-sm mt-1 leading-6 text-gray-600 italic'>
								En esta sección deberás indicar los datos mas importantes del
								alojamiento.
							</label>
						</div>

						<div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-blue-900 border p-10 rounded-xl'>
							<div className='sm:col-span-3'>
								<div className='flex items-center gap-2 '>
									<Image src={Edit} alt='Icono' width={20} height={20} />
									<label
										htmlFor=''
										className='text-sm block font-medium leading-6 text-gray-900'
									>
										Nombre:
									</label>
								</div>
								<div className='mt-2'>
									<input
										type='text'
										name='name'
										id='name'
										value={form.name}
										onChange={handleChange}
										className='sm:text-sm block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6'
									/>
								</div>
							</div>

							<div className='sm:col-span-3'>
								<div className='flex items-center gap-2 '>
									<Image src={Location} alt='Icono' width={20} height={20} />
									<label
										htmlFor=''
										className='text-sm block font-medium leading-6 text-gray-900'
									>
										Ciudad:
									</label>
								</div>
								<div className='mt-2'>
									<input
										type='text'
										name='location'
										id='location'
										value={form.location}
										onChange={handleChange}
										className='sm:text-sm block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6'
									/>
								</div>
							</div>
							<div className='sm:col-span-3'>
								<div className='flex items-center gap-2 '>
									<Image src={Discovery} alt='Icono' width={20} height={20} />
									<label
										htmlFor=''
										className='text-sm block font-medium leading-6 text-gray-900'
									>
										Dirección:
									</label>
								</div>
								<div className='mt-2'>
									<input
										type='text'
										name='address'
										id='address'
										value={form.address}
										onChange={handleChange}
										className='sm:text-sm block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6'
									/>
								</div>
							</div>
							<div className='sm:col-span-3'>
								<label
									htmlFor=''
									className='text-sm block font-medium leading-6 text-gray-900'
								></label>
								<div className='mt-2'></div>
							</div>

							<div className='pt-10 sm:col-span-3'>
								<div className='flex items-center gap-2'>
									<Image src={Home} alt='Icono' width={20} height={20} />
									<label
										htmlFor=''
										className='text-sm block font-medium leading-6 text-gray-900'
									>
										Tipo de alojamiento:
									</label>
								</div>
								<div className='mt-2'>
									<select
										id='type'
										name='type'
										value={form.type}
										onChange={event => {
											handleChange(event)
										}}
										className='sm:text-sm block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:leading-6'
									>
										<option value='' disabled selected>
											Selecciona una opción
										</option>
										{allData?.accounTypes?.map((element, index) => (
											<option value={element} key={index}>
												{element}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className='pt-10 sm:col-span-3'>
								<div className='flex gap-2 items-center'>
									<Image src={Filter} alt='Icono' width={20} height={20} />
									<label
										htmlFor=''
										className='text-sm block font-medium leading-6 text-gray-900'
									>
										Tamaño del alojamiento:
									</label>
								</div>
								<div className='mt-2'>
									<select
										id='size'
										name='size'
										value={form.size}
										onChange={event => {
											handleChange(event)
										}}
										className='sm:text-sm block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:leading-6'
									>
										<option value='' disabled selected>
											Selecciona una opción
										</option>

										{allData?.accoundSize?.map((element, index) => (
											<option value={element} key={index}>
												{element}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</div>

					<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
						<div className='col-span-full'>
							<div className='pb- border-b border-gray-900/10 pb-10'>
								<h2 className='text-base pb-5 font-semibold leading-7 text-gray-900'>
									Sobre el alojamiento
								</h2>
								<div className='flex gap-2 mb-5'>
									<Image src={RightSquare} alt='Icono' width={20} height={20} />
									<label className='text-sm mt-1 leading-6 text-gray-600 italic'>
										Aquí podrás dejar una descripción general sobre las
										características del alojamiento que ofertarás a nuestros
										usuarios.
									</label>
								</div>
								<div className='border-blue-900 border p-10 rounded-xl'>
									<div className='flex gap-2  items-center'>
										<Image
											src={EditSquare}
											alt='Icono'
											width={20}
											height={20}
										/>
										<label
											htmlFor=''
											className='text-sm block  font-medium leading-6 text-gray-900'
										>
											Detalles del alojamiento:
										</label>
									</div>
									<div className='mt-5'>
										<textarea
											id='description'
											name='description'
											value={form.description}
											onChange={handleChange}
											rows='3'
											placeholder='Escribe aquí...'
											className='sm:text-sm block w-full rounded-md border-0 p-2 py-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6'
										></textarea>
									</div>

									<div className=' pt-10 sm:col-span-3'>
										<div className='flex gap-2 items-center'>
											<Image
												src={EditSquare}
												alt='Icono'
												width={20}
												height={20}
											/>
											<label
												htmlFor=''
												className='text-sm block font-medium leading-6 text-gray-900'
											>
												Estructura del alojamiento:
											</label>
										</div>
										<div className='mt-2'>
											<textarea
												id='distribution'
												name='distribution'
												value={form.distribution}
												onChange={handleChange}
												rows='3'
												placeholder='Ej: 2 habitaciones con cama matrimonial, sala de estar con sofá/cama, etc...'
												className='sm:text-sm block w-full rounded-md border-0 p-2 py-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6'
											></textarea>
										</div>
									</div>
								</div>
							</div>

							<fieldset className='pb- border-b border-gray-900/10 pb-10'>
								<legend>
									<h2 className='text-base pb-5 pt-10 font-semibold leading-7 text-gray-900'>
										Destaca los servicios principales
									</h2>
								</legend>
								<div className='flex gap-2 items-center mb-5'>
									<Image src={RightSquare} alt='Icono' width={20} height={20} />
									<label
										htmlFor=''
										className='text-sm mt-1 leading-6 text-gray-600 italic'
									>
										Aquí podrás seleccionar diferentes características que
										destaquen tu hospedaje.
									</label>
								</div>
								<div className='border-blue-900 border p-10 rounded-xl'>
									<div className='my-6 space-y-6'>
										<div className='flex gap-2 items-center'>
											<Image
												src={TickSquare}
												alt='Icono'
												width={20}
												height={20}
											/>
											<h2 className='text-base font-medium leading-7 text-gray-900'>
												Ambientes y aforo:
											</h2>
										</div>
									</div>
									<div className='relative flex gap-x-3 pb-3'>
										<div className='text-sm leading-6'>
											<label htmlFor='' className='font-medium text-gray-900'>
												Habitaciones
											</label>
										</div>

										<svg
											onMouseEnter={e => (e.target.style.cursor = 'pointer')}
											onMouseLeave={e => (e.target.style.cursor = 'default')}
											onClick={() => handleDecrement('rooms')}
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='h-6 w-6'
										>
											<path
												StrokeLinecap='round'
												StrokeLinejoin='round'
												d='M15.75 19.5L8.25 12l7.5-7.5'
											/>
										</svg>

										<input
											onChange={event => setForm(event.target.value)}
											value={form.rooms}
											name='rooms'
											className='w-5 rounded-lg text-center'
										/>
										<svg
											onMouseEnter={e => (e.target.style.cursor = 'pointer')}
											onMouseLeave={e => (e.target.style.cursor = 'default')}
											onClick={() => handleIncrement('rooms')}
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='h-6 w-6'
										>
											<path
												StrokeLinecap='round'
												StrokeLinejoin='round'
												d='M8.25 4.5l7.5 7.5-7.5 7.5'
											/>
										</svg>
									</div>

									<div className='relative flex gap-x-3 pb-3'>
										<div className='text-sm leading-6'>
											<label
												htmlFor='comments'
												className='font-medium text-gray-900'
											>
												Baños
											</label>
										</div>

										<svg
											onMouseEnter={e => (e.target.style.cursor = 'pointer')}
											onMouseLeave={e => (e.target.style.cursor = 'default')}
											onClick={() => handleDecrement('bathrooms')}
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='h-6 w-6'
										>
											<path
												StrokeLinecap='round'
												StrokeLinejoin='round'
												d='M15.75 19.5L8.25 12l7.5-7.5'
											/>
										</svg>

										<input
											onChange={event => setForm(event.target.value)}
											value={form.bathrooms}
											name='rooms'
											className='w-5 rounded-lg text-center'
										/>
										<svg
											onMouseEnter={e => (e.target.style.cursor = 'pointer')}
											onMouseLeave={e => (e.target.style.cursor = 'default')}
											onClick={() => handleIncrement('bathrooms')}
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='h-6 w-6'
										>
											<path
												StrokeLinecap='round'
												StrokeLinejoin='round'
												d='M8.25 4.5l7.5 7.5-7.5 7.5'
											/>
										</svg>
									</div>

									<div className='relative flex gap-x-3 pb-3'>
										<div className='text-sm leading-6'>
											<label htmlFor='' className='font-medium text-gray-900'>
												Camas
											</label>
										</div>

										<svg
											onMouseEnter={e => (e.target.style.cursor = 'pointer')}
											onMouseLeave={e => (e.target.style.cursor = 'default')}
											onClick={() => handleDecrement('beds')}
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='h-6 w-6'
										>
											<path
												StrokeLinecap='round'
												StrokeLinejoin='round'
												d='M15.75 19.5L8.25 12l7.5-7.5'
											/>
										</svg>

										<input
											onChange={event => setForm(event.target.value)}
											value={form.beds}
											name='beds'
											className='w-5 rounded-lg text-center'
										/>
										<svg
											onMouseEnter={e => (e.target.style.cursor = 'pointer')}
											onMouseLeave={e => (e.target.style.cursor = 'default')}
											onClick={() => handleIncrement('beds')}
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='h-6 w-6'
										>
											<path
												StrokeLinecap='round'
												StrokeLinejoin='round'
												d='M8.25 4.5l7.5 7.5-7.5 7.5'
											/>
										</svg>
									</div>

									<div className='relative flex gap-x-3 pb-3'>
										<div className='text-sm leading-6'>
											<label htmlFor='' className='font-medium text-gray-900'>
												Cantidad máxima de huéspedes
											</label>
										</div>

										<svg
											onMouseEnter={e => (e.target.style.cursor = 'pointer')}
											onMouseLeave={e => (e.target.style.cursor = 'default')}
											onClick={() => handleDecrement('guests')}
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='h-6 w-6'
										>
											<path
												StrokeLinecap='round'
												StrokeLinejoin='round'
												d='M15.75 19.5L8.25 12l7.5-7.5'
											/>
										</svg>

										<input
											onChange={event => setForm(event.target.value)}
											value={form.guests}
											name='guests'
											className='w-5 rounded-lg text-center'
										/>
										<svg
											onMouseEnter={e => (e.target.style.cursor = 'pointer')}
											onMouseLeave={e => (e.target.style.cursor = 'default')}
											onClick={() => handleIncrement('guests')}
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='h-6 w-6'
										>
											<path
												StrokeLinecap='round'
												StrokeLinejoin='round'
												d='M8.25 4.5l7.5 7.5-7.5 7.5'
											/>
										</svg>
									</div>

									<div className='mt-6 space-y-6 '>
										<div className='flex gap-5 items-center'>
											<Image
												src={TickSquare}
												alt='Icono'
												width={20}
												height={20}
											/>
											<h2 className='text-base font-medium leading-7 text-gray-900'>
												Servicios básicos
											</h2>
										</div>
									</div>

									<div className='flex flex-col pt-5'>
										{allData?.accoundService?.map(element => (
											<div
												key={element}
												className='flex items-center gap-5 py-1'
											>
												<input
													type='checkbox'
													name='services'
													id='services'
													value={form.services}
													checked={form.services.includes(element)}
													onChange={event => {
														const serviceName = element
														if (event.target.checked) {
															setForm(form => ({
																...form,
																services: [...form.services, serviceName],
															}))
														} else {
															setForm(form => ({
																...form,
																services: form.services.filter(
																	service => service !== serviceName,
																),
															}))
														}
													}}
												/>
												<label>{element}</label>
											</div>
										))}
									</div>
								</div>
							</fieldset>
						</div>
					</div>

					<div className='border-b border-gray-900/10 pb-12'>
						<div className='col-span-full'>
							<h2 className='text-base pb-3 font-semibold leading-7 text-gray-900'>
								Fotos del alojamiento
							</h2>
							<div className='flex gap-2 items-center mb-5'>
								<Image src={RightSquare} alt='Icono' width={20} height={20} />
								<label
									htmlFor=''
									className='text-sm mt-1 leading-6 text-gray-600 italic'
								>
									En este apartado podrás subir las fotos que mejor describan a
									tu alojamiento. Recuerda que podrás subir un máximo de{' '}
									<span className='font-bold underline '>5 imagenes.</span>
								</label>
							</div>

							<div className='border-blue-900 border p-10 rounded-xl'>
								<div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
									<div className='text-center'>
										<svg
											className='mx-auto h-12 w-12 text-gray-300'
											viewBox='0 0 24 24'
											fill='currentColor'
											aria-hidden='true'
										>
											<path
												fillRule='evenodd'
												d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
												clipRule='evenodd'
											/>
										</svg>
										<div className='text-sm mt-4 flex leading-6 text-gray-600'>
											<label
												htmlFor='file-upload'
												className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
											>
												<span className='flex mb-2'>Subir imagenes</span>
												<input
													id='file-upload'
													accept='image/*'
													name='thumbnail'
													type='file'
													className='sr-only'
													multiple
													onChange={handleImageUpload}
												/>
											</label>
										</div>
										<p className='text-xs leading-5 text-gray-600'>
											Formatos: PNG, JPG, GIF. Máximo 10MB
										</p>
									</div>
								</div>
								{imageData.length === 0 && (
									<p className='font-medium text-gray-900 mt-10 italic'>
										La vista previa de las imagenes aparecera aquí
									</p>
								)}
								<div className='grid grid-cols-3 items-center justify-items-center '>
									{imageData &&
										imageData?.map((element, index) => (
											<div
												key={index}
												className='relative w-full pr-2 md:w-1/2 m-5'
											>
												<Image
													src={element}
													alt={`Image ${index}`}
													width={300}
													height={300}
													className='aspect-square rounded-lg'
												/>
												<button
													onClick={() => handleImageDelete(index)}
													className=' absolute top-2 right-5 z-10  bg-gray-100 rounded-[50%] aspect-square'
													type='button'
												>
													✖️
												</button>
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
					<div>
					<h2 className='text-base mb-5 font-semibold leading-7 text-gray-900'>
						Precio sugerido
					</h2>

					<div className='flex gap-2 items-center'>
						<Image src={RightSquare} alt='Icono' width={20} height={20} />
						<label className='text-sm leading-6 text-gray-600 italic'>
							Aquí podrás sugerir un precio para que nuestros usuarios puedan
							tener un valor actualizado de lo que se puede negociar.{' '}
							<span className='font-bold'>Recuerda que:</span>
						</label>
					</div>
					<ul className='italic text-gray-600 space-y-2 my-5'>
						<li>El precio es por noche</li>
						<li>
							{' '}
							Es SUGERIDO. El objetivo es evitar ofertas muy por debajo de lo
							que se desea
						</li>
						<li>
							Nuestros clientes podrán aceptarla sin necesidad de contraofertar
						</li>
						<li>
							Podrás actualizarlo en el momento que lo consideres necesario
						</li>
					</ul>

					<div className='border-blue-900 border p-10 rounded-xl'>
						<div className='flex gap-2 items-center mb-5'>
							<Image src={RightSquare} alt='Icono' width={20} height={20} />
							<label
								htmlFor=''
								className='text-sm block font-medium leading-6 text-gray-900'
							>
								Precio:
							</label>
						</div>
						<div className='mt-2'>
							<input
								type='number'
								name='price'
								id='price'
								value={form.price}
								onChange={handleChange}
								placeholder='$'
								className='sm:text-sm block  w-1/4 rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6'
							/>
						</div>
					</div>

					<div class='flex items-center mt-10'>
						<input
							id='link-checkbox'
							type='checkbox'
							value=''
							class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
						></input>
						<label
							for='link-checkbox'
							class='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
						>
							Estoy de acuerdo con los{' '}
							<Link href='https://www.livinng.co/terminos-y-condiciones' target='_blank' class='text-blue-600 dark:text-blue-500 hover:underline'>términos y condiciones</Link>
							
						</label>
					</div>
					</div>

					<div className='mt-6 flex items-center justify-end gap-x-6 pb-10'>
						<button
							type='submit'
							id='guardar-btn'
							className={`text-sm rounded-md px-3 py-2 font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
								isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-500'}`}
							disabled={isLoading}
						>
							{isLoading ? 'Procesando...' : 'Guardar'}
						</button>
						<Link href='/anfitrion/alojamientos'>
							<button
								type='button'
								className='text-sm hover:bg-red-400 rounded-md bg-red px-3 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								Regresar
							</button>
						</Link>
					</div>
				</div>
			</form>
		</>
	)
}

export default Form
