'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Modal from '@/app/components/ModalFormAcc'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link'
import useUser from '@/app/store/User'
import Swal from 'sweetalert2'

const Detail = () => {
	const router = useRouter()

	const { User } = useUser()

	const searchParams = useSearchParams()
	const id = searchParams.get('id')

	const URL = 'https://www.api.livinng.co'

	const tickImageUrl =
		'https:res.cloudinary.com/dg8awhbvm/image/upload/v1688978913/Proyecto%20JS%20vanilla/Tick_Square_iojxxc.png'

	const ubicationIco =
		'https://res.cloudinary.com/dg8awhbvm/image/upload/v1689081640/Proyecto%20JS%20vanilla/Location_cisem2.png'

	const [accommodation, setAccommodation] = useState({})

	const [allDataAcc, setAllDataAcc] = useState({})

	const [imageData, setImageData] = useState([])

	const [modal, setModal] = useState({
		name: false,
		description: false,
		distribution: false,
		caracteristic: false,
	})

	const [newName, setNewName] = useState('')
	const [newDescription, setNewDescription] = useState('')
	const [newDistribution, setNewDistribution] = useState('')
	const [newCaracteristic, setNewCaracteristic] = useState('')
	const [accService, setAccService] = useState({})
	const [displayedImages, setDisplayedImages] = useState([])
	const [newPrice, setNewPrice] = useState()

	// funciones manejadoras de modal
	const handleButtonClick = id => {
		if (id === 'name') {
			setModal(prevModal => ({
				...prevModal,
				name: true,
			}))
		}

		if (id === 'description') {
			setModal(prevModal => ({
				...prevModal,
				description: true,
			}))
		}

		if (id === 'distribution') {
			setModal(prevModal => ({
				...prevModal,
				distribution: true,
			}))
		}

		if (id === 'caracteristic') {
			setModal(prevModal => ({
				...prevModal,
				caracteristic: true,
			}))
		}
	}

	const handleModalClose = id => {
		if (id === 'name') {
			setModal(prevModal => ({
				...prevModal,
				name: false,
			}))
		}

		if (id === 'description') {
			setModal(prevModal => ({
				...prevModal,
				description: false,
			}))
		}

		if (id === 'distribution') {
			setModal(prevModal => ({
				...prevModal,
				distribution: false,
			}))
		}

		if (id === 'caracteristic') {
			setModal(prevModal => ({
				...prevModal,
				caracteristic: false,
			}))
		}
	}

	const handleSaveName = id => {
		if (id === 'name') {
			setNewName(newName)

			setAccommodation({
				...accommodation,
				name: newName,
			})
			setModal({
				name: false,
			})
		}

		if (id === 'description') {
			setNewDescription(newDescription)

			setAccommodation({
				...accommodation,
				description: newDescription,
			})
			setModal({
				description: false,
			})
		}

		if (id === 'distribution') {
			setNewDistribution(newDistribution)

			setAccommodation({
				...accommodation,
				distribution: newDistribution,
			})
			setModal({
				distribution: false,
			})
		}

		if (id === 'caracteristic') {
			setNewCaracteristic(newCaracteristic)

			setAccommodation({
				...accommodation,
			})
			setModal({
				caracteristic: false,
			})
		}
	}
	//Funciones para la carga de imagenes
	const handleImageUpload = event => {
		const { files } = event.target
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
				setImageData(results)
				setDisplayedImages(prevImages => {
					if (Array.isArray(prevImages)) {
						// Si prevImages es un array, puedes utilizar el operador de propagación aquí
						return [...prevImages, ...results]
					} else {
						// Si prevImages no es un array, puedes devolver un array con imageFiles solamente
						return [...results]
					}
				})
			})
			.catch(error => {
				console.error('Error loading images:', error)
				setImageData([])
			})
	}

	const handleRemoveImage = index => {
		setAccommodation(prevAccommodation => {
			const updatedImages = Array.isArray(prevAccommodation.image)
				? [...prevAccommodation.image]
				: []
			updatedImages.splice(index, 1)
			return {
				...prevAccommodation,
				image: updatedImages,
			}
		})
		setDisplayedImages(prevImages => prevImages.filter((_, i) => i !== index))
	}

	const handleSubmit = async event => {
		event.preventDefault()
		let uri = []
		try {
			const requestData = {
				...accommodation,
			}

			// Check if imageData is not empty or undefined
			if (imageData && imageData.length > 0) {
				for (let i = 0; i < imageData.length; i++) {
					const URLCDRY =
						'https://api.cloudinary.com/v1_1/dp57hxv6h/image/upload'

					const formData = new FormData()
					formData.append('file', imageData[i])
					formData.append('upload_preset', 'ml_default')

					await axios.post(`${URLCDRY}`, formData).then(response => {
						if (response) {
							uri.push(response.data.secure_url)
							requestData.uri = [...uri]
						}
					})
				}
			}

			await axios.post(`${URL}/host/acc/update`, requestData, {
				headers: {
					Authorization: `Bearer ${User.token}`,
				},
			})
			Swal.fire({
				title: 'Modificado correctamente',
				text: 'Los cambios se aplicaron correctamente',
				icon: 'success',
				confirmButtonColor: '#17387e',
				confirmButtonText: 'Aceptar',
				width: 400,
			})
			router.push('/anfitrion/alojamientos')
		} catch (error) {
			Swal.fire({
				title: '¡Error!',
				text: 'Error al modificar el alojamiento',
				icon: 'error',
				confirmButtonText: 'Aceptar',
				confirmButtonColor: '#17387e',
				width: 400,
			})
		}
	}

	const fetchAccommodation = async () => {
		try {
			const { data } = await axios.get(`${URL}/user/acc/${id}`)
			setAccommodation({
				name: data.name,
				guests: data.guests,
				price: data.price,
				services: data.services,
				description: data.description,
				beds: data.beds,
				image: data.image,
				id: data.id,
				location: data.location,
			})
			setDisplayedImages(data.image)
			setNewPrice(accommodation.price)
		} catch (error) {
			console.error('Error al traer el detalle:', error)
		}
	}

	const fetchAccommodationAll = async () => {
		try {
			const { data } = await axios.get(`${URL}/user/acc/${id}`)
			setAllDataAcc(data)
		} catch (error) {
			console.error('Error al traer todo el detalle:', error)
		}
	}

	const getAllService = async () => {
		const { data } = await axios(`${URL}/user/utils/services`, {
			headers: {
				Authorization: `Bearer ${User.token}`,
			},
		})
		setAccService(data)
	}

	useEffect(() => {
		fetchAccommodation()
		getAllService()
		fetchAccommodationAll()
		setDisplayedImages(accommodation.image)
	}, [])

	const handleIncrement = prop => {
		setAccommodation(prevFilters => {
			let updatedValue = parseInt(prevFilters[prop]) || 0
			updatedValue++
			return {
				...prevFilters,
				[prop]: updatedValue,
			}
		})
	}

	const handleDecrement = prop => {
		setAccommodation(prevFilters => {
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

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className='relative max-w-[1024px] py-25px'>
					<h1 className='flex m-auto font-bold text-center justify-center my-10 text-[35px]'>
						Vista Previa
					</h1>

					{/* Nombre del Hospedaje */}
					<div className='flex gap-5'>
						<h2 className='mb-4 text-[32px] font-semibold '>
							{accommodation?.name}
						</h2>

						<button
							className='flex items-center gap-[5px] rounded-xl bg-yellow-200 px-3 py-2'
							id='name'
							onClick={() => handleButtonClick('name')}
							type='button'
						>
							<Image
								src='/Filter.svg'
								alt='Icono filtro'
								className='justify-items-center'
								width={24}
								height={24}
							/>
							Editar nombre
						</button>

						{modal.name && (
							<Modal id='name' onClose={() => handleModalClose('name')}>
								<div className='p-6 text-center'>
									<Image
										src='/DangerTriangle.svg'
										alt='Icono Danger'
										width={24}
										height={24}
										className='mx-auto mb-4 text-yellow-400 w-12 h-12'
									/>

									<h3 className='mb-5 text-lg font-normal text-gray-500'>
										Ingresa el nuevo nombre:
									</h3>
									<input
										className='w-full text-center font-bold mb-10 border-b-2'
										type='text'
										placeholder='Nuevo nombre'
										value={newName}
										onChange={e => setNewName(e.target.value)}
									/>

									<button
										onClick={() => handleSaveName('name')}
										className='text-green-400 mr-10'
									>
										Guardar
									</button>
									<button
										onClick={() => handleModalClose('name')}
										className='text-red ml-10'
									>
										Cancelar
									</button>
								</div>
							</Modal>
						)}
					</div>

					<div className='mb-2 flex justify-between'>
						<p className='flex flex-wrap items-center'>
							<span className='mr-3 flex items-center'>
								<Image
									src='https://i.ibb.co/rvjkYqQ/Star.png'
									width={18}
									height={18}
									alt='icono'
								/>
								<span className='ml-1'>0,00 · 0 evaluaciones ·</span>
								<Image
									src={ubicationIco}
									alt='Tick'
									width={18}
									height={18}
									className='inline-block'
									priority={true}
								/>
								<span className='ml-1'>{accommodation.location}</span>
							</span>
						</p>
						<div className='flex items-center gap-5px'></div>
					</div>

					{/* Fotos del hospedaje */}
					<div className='flex flex-wrap'>
						<div className='relative w-full pr-2 md:w-1/2'>
							<Image
								src={
									displayedImages && displayedImages.length > 0
										? displayedImages[0]
										: undefined
								}
								alt='Imagen Principal'
								width={625}
								height={625}
								className='aspect-square rounded-lg object-cover border'
								priority={true}
							/>
							<button
								className=' absolute top-2 right-5 z-10 border-2 bg-slate-200 rounded-full'
								onClick={() => handleRemoveImage(0)}
								type='button'
							>
								x
							</button>
						</div>
						<div className='hidden w-full flex-wrap sm:flex md:w-1/2'>
							{displayedImages &&
								displayedImages?.slice(1, 5)?.map((element, index) => (
									<div key={index} className='relative w-full pr-2 md:w-1/2'>
										<Image
											src={element}
											alt={`Imagen ${index + 2}`}
											width={310}
											height={300}
											className='object-cover: aspect-square border rounded-lg'
											// priority={true}
										/>
										<button
											className=' absolute top-2 right-5 z-10 border-2 bg-slate-200 rounded-full'
											onClick={() => handleRemoveImage(index + 1)}
											type='button'
										>
											X
										</button>
									</div>
								))}
						</div>
					</div>

					<div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
						<div className='text-center'>
							<Image
								src='/ImageIco.svg'
								width={24}
								height={24}
								alt='Icono image'
								className='mx-auto h-12 w-12 text-gray-300'
							/>

							<div className='text-sm mt-4 flex leading-6 text-gray-600'>
								<label
									htmlFor='file-upload'
									className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
								>
									<span>Sube un archivo</span>
									<input
										id='file-upload'
										accept='image/*'
										name='images'
										type='file'
										className='sr-only'
										multiple
										onChange={handleImageUpload}
									/>
								</label>
								<p className='pl-1 mb-3'>o arrastra y suelta</p>
							</div>
							<p className='text-xs leading-5 text-gray-600'>
								Tipo de imagen: PNG, JPG, GIF
							</p>
						</div>
					</div>
					{/* Descripción del hospedaje */}
					<div className='mb-12 mt-16 grid grid-cols-1 gap-25px sm:grid-cols-2'>
						<div className='w-full align-middle'>
							{/* Descripción */}
							<div className='flex gap-5'>
								<h2 className='mb-2 text-[32px]'>Descripción</h2>

								<button
									className='flex items-center gap-[5px] rounded-xl bg-yellow-200 px-3 py-2'
									id='description'
									onClick={() => handleButtonClick('description')}
									type='button'
								>
									<Image
										src='/Filter.svg'
										width={24}
										height={24}
										alt='icono filtro'
										className='justify-items-center'
									/>
									Editar Descripción
								</button>

								{modal.description && (
									<Modal
										id='description'
										onClose={() => handleModalClose('description')}
									>
										<div className='p-6 text-center'>
											<Image
												src='/DangerTriangle.svg'
												width={24}
												height={24}
												alt='icono Danger'
												className='mx-auto mb-4 text-yellow-400 w-12 h-12'
											/>

											<h3 className='mb-5 text-lg font-normal text-gray-500'>
												Ingresa la nueva descripción:
											</h3>
											<input
												className='w-full text-center font-bold mb-10 border-b-2'
												type='text'
												placeholder='Nueva descripción'
												value={newDescription}
												onChange={e => setNewDescription(e.target.value)}
											/>

											<button
												onClick={() => handleSaveName('description')}
												className='text-green-400 mr-10'
											>
												Guardar
											</button>
											<button
												onClick={() => handleModalClose('description')}
												className='text-red ml-10'
											>
												Cancelar
											</button>
										</div>
									</Modal>
								)}
							</div>
							<p className='mt-5'>{accommodation.description}</p>
						</div>
						{/* Distribución del hospedaje */}
						<div className='w-full align-middle'>
							<div className='flex gap-5'>
								<h2 className=' pb-5px text-[32px]'>Distribución</h2>
							</div>
							<p className='mt-5'>{allDataAcc.distribution}</p>
						</div>
					</div>

					{/* Características y mapa- */}
					<div className='mb-6 flex flex-wrap pb-6'>
						<div className='w-full pr-4 md:w-1/2'>
							<hr className='mb-6 mt-0 border-gray-300' />
							{/* Características */}
							<div className='flex gap-5'>
								<h2 className='mb-4 text-[32px]'>Otras Características</h2>
								<button
									className='flex items-center gap-[5px] m-auto rounded-xl bg-yellow-200 px-3 py-3 w-auto'
									onClick={() => handleButtonClick('caracteristic')}
									type='button'
								>
									<Image
										src='/Filter.svg'
										width={24}
										height={24}
										alt='Icono filtro'
										className='justify-items-center'
									/>
									Editar Características
								</button>

								{modal.caracteristic && (
									<Modal
										id='caracteristic'
										onClose={() => handleModalClose('caracteristic')}
									>
										<div className='p-6 text-center'>
											<Image
												src='/DangerTriangle.svg'
												width={24}
												height={24}
												alt='icono danger'
												className='mx-auto mb-4 text-yellow-400 w-12 h-12'
											/>

											<h3 className='text-lg font-normal text-gray-500'>
												Configurá las nuevas características:
											</h3>

											<div className=' flex items-center justify-center  pb-3 pt-10'>
												<p className='w-auto text-center font-medium mr-4'>
													Capacidad:
												</p>
												<Image
													src='/ArrowLeft.svg'
													width={24}
													height={24}
													alt='icono arrow'
													onMouseEnter={e =>
														(e.target.style.cursor = 'pointer')
													}
													onMouseLeave={e =>
														(e.target.style.cursor = 'default')
													}
													onClick={() => handleDecrement('guests')}
													className='h-6 w-6'
												/>

												<input
													onChange={event =>
														setAccommodation(event.target.value)
													}
													value={accommodation.guests}
													name='guests'
													className='w-5 rounded-lg text-center'
												/>

												<Image
													src='/ArrowRight.svg'
													width={24}
													height={24}
													alt='icono arrow'
													onMouseEnter={e =>
														(e.target.style.cursor = 'pointer')
													}
													onMouseLeave={e =>
														(e.target.style.cursor = 'default')
													}
													onClick={() => handleIncrement('guests')}
													className='h-6 w-6'
												/>

												<p className='w-auto text-center font-medium mr-4 ml-28'>
													Camas:
												</p>

												<Image
													src='/ArrowLeft.svg'
													width={24}
													height={24}
													alt='icono arrow'
													onMouseEnter={e =>
														(e.target.style.cursor = 'pointer')
													}
													onMouseLeave={e =>
														(e.target.style.cursor = 'default')
													}
													onClick={() => handleDecrement('beds')}
													className='h-6 w-6'
												/>

												<input
													onChange={event =>
														setAccommodation(event.target.value)
													}
													value={accommodation.beds}
													name='beds'
													className='w-5 rounded-lg text-center text-sm'
												/>

												<Image
													src='/ArrowRight.svg'
													width={24}
													height={24}
													alt='icono arrow'
													onMouseEnter={e =>
														(e.target.style.cursor = 'pointer')
													}
													onMouseLeave={e =>
														(e.target.style.cursor = 'default')
													}
													onClick={() => handleIncrement('beds')}
													className='h-6 w-6'
												/>
											</div>

											<h4 className='mt-10 font-medium'>Servicios:</h4>
											{accService.length > 0 &&
												accService?.map((element, index) => (
													<div
														key={index}
														className='flex items-center gap-5 py-1'
													>
														<input
															type='checkbox'
															name='services'
															id='services'
															value={accommodation.services}
															checked={accommodation?.services?.includes(
																element,
															)}
															onChange={event => {
																const serviceName = element
																if (event.target.checked) {
																	setAccommodation(prevAccommodation => ({
																		...prevAccommodation,
																		services: [
																			...accommodation.services,
																			serviceName,
																		],
																	}))
																} else {
																	setAccommodation(prevAccommodation => ({
																		...prevAccommodation,
																		services: accommodation.services.filter(
																			service => service !== serviceName,
																		),
																	}))
																}
															}}
														/>
														<label>{element}</label>
													</div>
												))}

											<h4 className='mt-10 font-medium'>Precio sugerido:</h4>

											<input
												className='w-full text-center font-bold mb-10 border-b-2'
												type='number'
												placeholder='$'
												name='price'
												value={accommodation.price}
												onChange={event =>
													setAccommodation({
														...accommodation,
														price: Number(event.target.value),
													})
												}
											/>

											<button
												onClick={() => handleSaveName('caracteristic')}
												className='text-green-400 mr-10'
											>
												Guardar
											</button>
											<button
												onClick={() => handleModalClose('caracteristic')}
												className='text-red ml-10'
											>
												Cancelar
											</button>
										</div>
									</Modal>
								)}
							</div>
							<ul>
								{[
									{ label: 'Capacidad', value: accommodation.guests },
									{ label: 'Baños', value: allDataAcc.bathroom },
									{ label: 'Habitaciones', value: allDataAcc.rooms },
									{ label: 'Camas', value: accommodation.beds },
									{ label: 'Tipo', value: allDataAcc.type },
									{
										label: 'Servicios',
										value: accommodation.services?.join(', '),
									},
								].map((item, index) => (
									<ul key={index} className='mb-2'>
										<Image
											src={tickImageUrl}
											alt='Tick'
											width={16}
											height={16}
											className='inline-block'
										/>
										&nbsp;{item.label}: {item.value}
									</ul>
								))}
							</ul>
						</div>
						<div className='w-full  md:w-1/2'>
							{/* Mapa */}
							<iframe
								src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
								width='100%'
								height='350'
								style={{ border: '1px solid #ccc' }}
								allowFullScreen=''
								loading='lazy'
								className='rounded-2xl'
							></iframe>
						</div>
					</div>
					<div className='flex gap-10 justify-end'>
						<Link href='/anfitrion/alojamientos'>
							<button className='text-red font-bold'>Regresar</button>
						</Link>

						<button className='text-green-500 font-bold ' type='submit'>
							Aprobar Cambios
						</button>
					</div>
				</div>
			</form>
		</>
	)
}

export default Detail
