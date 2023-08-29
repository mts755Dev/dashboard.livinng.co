'use client'
import Link from 'next/link'
import { Dialog } from '@headlessui/react'
import { requestUtils } from './requestUtils'
import { iconsUtils } from './iconsUtils'
import { monthUtils } from './monthUtils'
import Calendar from '../components/Calendar'
import { useState } from 'react'
const URL = 'https://www.api.livinng.co'

const modals = {
	// Pregunta si desea eliminar el alojamiento y hace la request delete con el id
	deleteAccModal: ({ status, setStatus, id, getAccs, token }) => {
		const handleOptionClick = () => {
			setStatus(state => ({ ...state, deleteAccomodation: false }))
			requestUtils.deleteAccommodation(id, getAccs, token)
		}
		return (
			<Dialog
				open={status}
				onClose={() =>
					setStatus(state => ({ ...state, deleteAccomodation: false }))
				}
				className='relative z-9'
			>
				<div className='fixed inset-0 z-10 flex items-center justify-center backdrop-filter backdrop-blur'>
					<div className='bg-lightred p-8 rounded-lg shadow-lg max-w-lg'>
						<div className='flex'>
							<span className='mr-5'>{iconsUtils.alert}</span>
							<h2 className='text-xl font-semibold mb-4'>
								Seguro que quieres eliminar este alojamiento?
							</h2>
						</div>
						<p className='text-gray-700 mb-4'>
							Esto eliminará por completo este alojamiento.
						</p>
						<div className='flex justify-end space-x-2'>
							<button
								onClick={() =>
									setStatus(state => ({
										...state,
										deleteAccomodation: false,
									}))
								}
								className='px-4 py-2 text-gray-600 hover:text-gray-800'
							>
								Cancelar
							</button>
							<button
								onClick={handleOptionClick}
								className='px-4 py-2 bg-darkred text-white rounded hover:bg-red'
							>
								Sí, eliminar
							</button>
						</div>
					</div>
				</div>
			</Dialog>
		)
	},
	// Pregunta si desea editar el alojamiento y redirecciona a la pagina de editar pasandole el id por params
	EditAccModal: ({ status, setStatus, id }) => {
		return (
			<Dialog
				open={status}
				onClose={() =>
					setStatus(state => ({ ...state, editAccomodation: false }))
				}
				className='relative z-9'
			>
				<div className='fixed inset-0 z-10 flex items-center justify-center backdrop-filter backdrop-blur'>
					<div className='bg-white p-8 rounded-lg shadow-lg max-w-lg'>
						<div className='flex'>
							<span className='mr-5'>{iconsUtils.edit}</span>
							<h2 className='text-xl font-semibold mb-4'>
								Deseas editar este alojamiento?
							</h2>
						</div>
						<p className='text-gray-700 mb-4'>
							Esto te redirige a la página de edición.
						</p>
						<div className='flex justify-end space-x-2'>
							<button
								onClick={() =>
									setStatus(state => ({ ...state, editAccomodation: false }))
								}
								className='font-semibold px-4 py-2 text-gray-600 hover:text-gray-800'
							>
								Cancelar
							</button>
							<Link href={`/anfitrion/alojamientos/editar?id=${id}`} passHref>
								<button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
									Sí, editar
								</button>
							</Link>
						</div>
					</div>
				</div>
			</Dialog>
		)
	},
	// Pregunta si desea pausar y hace el request PUT pasandole el id y el state
	pauseAccModal: ({ status, setStatus, id, getAccs, token }) => {
		const handleOptionClick = () => {
			requestUtils.pauseAccommodation(id, getAccs, token)
			setStatus(state => ({ ...state, pauseAccomodation: false }))
		}

		return (
			<Dialog
				open={status}
				onClose={() =>
					setStatus(state => ({ ...state, pauseAccomodation: false }))
				}
				className='relative z-9'
			>
				<div className='fixed inset-0 z-10 flex items-center justify-center backdrop-filter backdrop-blur'>
					<div className='bg-white p-8 rounded-lg shadow-lg max-w-lg'>
						<div className='flex'>
							<span className='mr-5'>{iconsUtils.warning}</span>
							<h2 className='text-xl font-semibold mb-4'>
								Deseas pausar esta publicación?
							</h2>
						</div>
						<p className='text-gray-700 mb-4'>
							Esto cambiara su estado a pausado y se dejará de mostrar a tus
							clientes potenciales.
						</p>
						<div className='flex justify-end space-x-2'>
							<button
								onClick={() =>
									setStatus(state => ({ ...state, pauseAccomodation: false }))
								}
								className='font-semibold px-4 py-2 text-gray-600 hover:text-gray-800'
							>
								Cancelar
							</button>
							<button
								onClick={handleOptionClick}
								className='px-4 py-2 bg-darkyellow text-white rounded hover:bg-yellow'
							>
								Sí, pausar
							</button>
						</div>
					</div>
				</div>
			</Dialog>
		)
	},
	// Pregunta si desea pausar y hace el request PUT pasandole el id y el state
	pauseAccModalAdmin: ({ status, setStatus, id, getAccs, token }) => {
		const handleOptionClick = () => {
			requestUtils.pauseAccommodationAdmin(id, getAccs, token)
			setStatus(state => ({ ...state, pauseAccomodation: false }))
		}

		return (
			<Dialog
				open={status}
				onClose={() =>
					setStatus(state => ({ ...state, pauseAccomodation: false }))
				}
				className='relative z-9'
			>
				<div className='fixed inset-0 z-10 flex items-center justify-center backdrop-filter backdrop-blur'>
					<div className='bg-white p-8 rounded-lg shadow-lg max-w-lg'>
						<div className='flex'>
							<span className='mr-5'>{iconsUtils.warning}</span>
							<h2 className='text-xl font-semibold mb-4'>
								Deseas pausar esta publicación?
							</h2>
						</div>
						<p className='text-gray-700 mb-4'>
							Esto cambiara su estado a pausado y se dejará de mostrar a tus
							clientes potenciales.
						</p>
						<div className='flex justify-end space-x-2'>
							<button
								onClick={() =>
									setStatus(state => ({ ...state, pauseAccomodation: false }))
								}
								className='font-semibold px-4 py-2 text-gray-600 hover:text-gray-800'
							>
								Cancelar
							</button>
							<button
								onClick={handleOptionClick}
								className='px-4 py-2 bg-darkyellow text-white rounded hover:bg-yellow'
							>
								Sí, pausar
							</button>
						</div>
					</div>
				</div>
			</Dialog>
		)
	},
	// Pregunta si desea reanudar y hace el request PUT pasandole el id y el state
	activateAccModal: ({ status, setStatus, id, getAccs, token }) => {
		const handleOptionClick = () => {
			requestUtils.activateAccommodation(id, getAccs, token)
			setStatus(state => ({ ...state, activateAccomodation: false }))
		}

		return (
			<Dialog
				open={status}
				onClose={() =>
					setStatus(state => ({ ...state, activateAccomodation: false }))
				}
				className='relative z-9'
			>
				<div className='fixed inset-0 z-10 flex items-center justify-center backdrop-filter backdrop-blur'>
					<div className='bg-white p-8 rounded-lg shadow-lg max-w-lg'>
						<div className='flex'>
							<span className='mr-5'>{iconsUtils.warning}</span>
							<h2 className='text-xl font-semibold mb-4'>
								Deseas reanudar esta publicación?
							</h2>
						</div>
						<p className='text-gray-700 mb-4'>
							Esto cambiara su estado a activo y se mostrará a tus clientes
							potenciales.
						</p>
						<div className='flex justify-end space-x-2'>
							<button
								onClick={() =>
									setStatus(state => ({
										...state,
										activateAccomodation: false,
									}))
								}
								className='px-4 py-2 text-gray-600 hover:text-gray-800'
							>
								Cancelar
							</button>
							<button
								onClick={handleOptionClick}
								className='px-4 py-2 bg-darkgreen text-white rounded hover:bg-green'
							>
								Sí, reanudar
							</button>
						</div>
					</div>
				</div>
			</Dialog>
		)
	},
	// Pregunta si desea reanudar y hace el request PUT pasandole el id y el state
	activateAccModalAdmin: ({ status, setStatus, id, getAccs, token }) => {
		const handleOptionClick = () => {
			requestUtils.activateAccommodationAdmin(id, getAccs, token)
			setStatus(state => ({ ...state, activateAccomodation: false }))
		}

		return (
			<Dialog
				open={status}
				onClose={() =>
					setStatus(state => ({ ...state, activateAccomodation: false }))
				}
				className='relative z-9'
			>
				<div className='fixed inset-0 z-10 flex items-center justify-center backdrop-filter backdrop-blur'>
					<div className='bg-white p-8 rounded-lg shadow-lg max-w-lg'>
						<div className='flex'>
							<span className='mr-5'>{iconsUtils.warning}</span>
							<h2 className='text-xl font-semibold mb-4'>
								Deseas reanudar esta publicación?
							</h2>
						</div>
						<p className='text-gray-700 mb-4'>
							Esto cambiara su estado a activo y se mostrará a tus clientes
							potenciales.
						</p>
						<div className='flex justify-end space-x-2'>
							<button
								onClick={() =>
									setStatus(state => ({
										...state,
										activateAccomodation: false,
									}))
								}
								className='px-4 py-2 text-gray-600 hover:text-gray-800'
							>
								Cancelar
							</button>
							<button
								onClick={handleOptionClick}
								className='px-4 py-2 bg-darkgreen text-white rounded hover:bg-green'
							>
								Sí, reanudar
							</button>
						</div>
					</div>
				</div>
			</Dialog>
		)
	},
	//Pregunta si desea rechazar y hace la request PUT pasandole el id y el state
	cancelReservationModal: ({ status, setStatus, id, token }) => {
		const handleOptionClick = () => {
			requestUtils.rejectReservation(id, token)
			setStatus(state => ({ ...state, cancelReservation: false }))
		}

		return (
			<Dialog
				open={status}
				onClose={() =>
					setStatus(state => ({ ...state, cancelReservation: false }))
				}
				className='relative z-9'
			>
				<div className='fixed inset-0 z-10 flex items-center justify-center backdrop-filter backdrop-blur'>
					<div className=' p-8 rounded-lg shadow-lg max-w-lg'>
						<div className='flex'>
							<span className='mr-5'>{iconsUtils.alert}</span>
							<h2 className='text-xl font-semibold mb-4'>
								Seguro que quieres rechazar esta reservación?
							</h2>
						</div>
						<p className='text-gray-700 mb-4'>
							Esta acción no puede deshacerse, si tu razón está relacionada con
							el precio, podrías contraofertar
						</p>
						<div className='flex justify-end space-x-2'>
							<button
								onClick={() =>
									setStatus(state => ({ ...state, cancelReservation: false }))
								}
								className='font-semibold px-4 py-2 text-gray-600 hover:text-gray-800'
							>
								Cancelar
							</button>
							<button
								onClick={handleOptionClick}
								className='px-4 py-2 bg-darkred text-white rounded hover:bg-red'
							>
								Sí, rechazar
							</button>
						</div>
					</div>
				</div>
			</Dialog>
		)
	},
	// Pregunta si desea aceptar y hace la request PUT pasandole el id y el state
	acceptReservationModal: ({ status, setStatus, id, token }) => {
		const handleOptionClick = () => {
			requestUtils.acceptReservation(id, token)
			setStatus(state => ({ ...state, acceptReservation: false }))
		}

		return (
			<Dialog
				open={status}
				onClose={() =>
					setStatus(state => ({ ...state, acceptReservation: false }))
				}
				className='relative z-9'
			>
				<div className='fixed inset-0 z-10 flex items-center justify-center backdrop-filter backdrop-blur'>
					<div className='bg-lightgreen p-8 rounded-lg shadow-lg max-w-lg'>
						<div className='flex'>
							<span className='mr-5'>{iconsUtils.checkCircle}</span>
							<h2 className='text-xl font-semibold mb-4'>
								Por favor confirma esta acción
							</h2>
						</div>
						<p className='text-gray-700 mb-4'>
							El cliente tendrá 24 horas para realizar el pago.
						</p>
						<div className='flex justify-end space-x-2'>
							<button
								onClick={() =>
									setStatus(state => ({ ...state, acceptReservation: false }))
								}
								className='font-semibold px-4 py-2 text-gray-600 hover:text-gray-800'
							>
								Cancelar
							</button>
							<button
								onClick={handleOptionClick}
								className='px-4 py-2 bg-darkgreen text-white rounded hover:bg-green'
							>
								Sí, aceptar
							</button>
						</div>
					</div>
				</div>
			</Dialog>
		)
	},
	// Pregunta si desea contraofertar --PENDIENTE--
	CounterReservationModal: ({
		status,
		setStatus,
		id,
		name,
		price,
		dates,
		token,
	}) => {
		const [newPrice, setNewPrice] = useState('')
		const [newDates, setNewDates] = useState([])
		const initialDate = new Date(dates[0])
		const finalDate = new Date(dates[1])

		const handleOptionClick = () => {
			requestUtils.counterReservation(id, newPrice, newDates, token)
			setStatus(state => ({ ...state, counterReservation: false }))
		}

		const handleModifyClick = () => {
			// Setear la fecha que deuelve el calendario en ese formato
			setNewDates(['2023-07-25', '2023-07-30'])
		}

		const isButtonDisabled = !newPrice && newDates.length === 0

		return (
			<Dialog
				open={status}
				onClose={() =>
					setStatus(state => ({ ...state, counterReservation: false }))
				}
				className='relative z-9'
			>
				<div className='fixed inset-0 z-10 flex items-center justify-center backdrop-filter backdrop-blur'>
					<div className='relative bg-white p-8 rounded-lg shadow-lg max-w-3xl'>
						<div className='flex items-center pb-5'>
							<span className='mr-5'>{iconsUtils.info}</span>
							<h2 className='text-xl font-semibold'>
								Ingrese los cambios a contraofertar
							</h2>
						</div>
						<div className='flex pb-5'>
							<p className='text-gray-700 mb-4'>
								La oferta actual de {name} es de {price} COP
							</p>
							<input
								min={1}
								type='number'
								value={newPrice}
								onChange={event => setNewPrice(event.target.value)}
								placeholder='Nuevo precio'
								className='max-h-12 border border-gray-300 rounded px-3 py-2 w-50 mr-2'
							/>
						</div>
						<div className='flex'>
							<p className='text-gray-700 mb-4'>
								Para las fechas del {initialDate.getDate()} de{' '}
								{monthUtils.getMonthName(initialDate.getMonth())} del{' '}
								{initialDate.getFullYear()} <br /> al {finalDate.getDate()} de{' '}
								{monthUtils.getMonthName(finalDate.getMonth())} del{' '}
								{finalDate.getFullYear()}
							</p>
							<button
								onClick={handleModifyClick}
								className='absolute right-8 max-h-12 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
							>
								Modificar
							</button>
							<div className='rounded-lg border p-5px'>
								<Calendar />
							</div>
						</div>
						<div className='flex justify-end space-x-2'>
							<button
								onClick={() =>
									setStatus(state => ({
										...state,
										counterReservation: false,
									}))
								}
								className='px-4 py-2 text-gray-600 hover:text-gray-800'
							>
								Cancelar
							</button>
							<button
								onClick={handleOptionClick}
								className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
									isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
								}`}
								disabled={isButtonDisabled}
							>
								Enviar Oferta
							</button>
						</div>
					</div>
				</div>
			</Dialog>
		)
	},
	enableUserModal: ({ status, setStatus, id, getClients, token }) => {
		const handleOptionClick = () => {
			requestUtils.enableUser(id, getClients, token)
			setStatus(state => ({ ...state, enableUser: false }))
		}

		return (
			<Dialog
				open={status}
				onClose={() => setStatus(state => ({ ...state, enableUser: false }))}
				className='relative z-9'
			>
				<div className='fixed inset-0 z-10 flex items-center justify-center backdrop-filter backdrop-blur'>
					<div className='bg-white p-8 rounded-lg shadow-lg max-w-lg'>
						<div className='flex'>
							<span className='mr-5'>{iconsUtils.warning}</span>
							<h2 className='text-xl font-semibold mb-4'>
								Esta acción habilitará a este usuario
							</h2>
						</div>
						<div className='flex justify-end space-x-2'>
							<button
								onClick={() =>
									setStatus(state => ({ ...state, enableUser: false }))
								}
								className='font-semibold px-4 py-2 text-gray-600 hover:text-gray-800'
							>
								Cancelar
							</button>
							<button
								onClick={handleOptionClick}
								className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
							>
								Continuar
							</button>
						</div>
					</div>
				</div>
			</Dialog>
		)
	},
	disableUserModal: ({ status, setStatus, id, getClients, token }) => {
		const handleOptionClick = () => {
			requestUtils.disableUser(id, getClients, token)
			setStatus(state => ({ ...state, disableUser: false }))
		}

		return (
			<Dialog
				open={status}
				onClose={() => setStatus(state => ({ ...state, disableUser: false }))}
				className='relative z-9'
			>
				<div className='fixed inset-0 z-10 flex items-center justify-center backdrop-filter backdrop-blur'>
					<div className='bg-lightyellow p-8 rounded-lg shadow-lg max-w-lg'>
						<div className='flex'>
							<span className='mr-5'>{iconsUtils.warning}</span>
							<h2 className='text-xl font-semibold mb-4'>
								Esta acción deshabilitará a este usuario
							</h2>
						</div>
						<div className='flex justify-end space-x-2'>
							<button
								onClick={() =>
									setStatus(state => ({ ...state, disableUser: false }))
								}
								className='font-semibold px-4 py-2 text-gray-600 hover:text-gray-800'
							>
								Cancelar
							</button>
							<button
								onClick={handleOptionClick}
								className='px-4 py-2 bg-darkred text-white rounded hover:bg-red'
							>
								Continuar
							</button>
						</div>
					</div>
				</div>
			</Dialog>
		)
	},
	sendMailModal: ({ status, setStatus, email }) => {
		const handleOptionClick = () => {
			setStatus(state => ({ ...state, sendMail: false }))
			window.location.href = `mailto:${email}`
		}

		return (
			<Dialog
				open={status}
				onClose={() => setStatus(state => ({ ...state, sendMail: false }))}
				className='relative z-9'
			>
				<div className='fixed inset-0 z-10 flex items-center justify-center backdrop-filter backdrop-blur'>
					<div className='bg-white p-8 rounded-lg shadow-lg max-w-lg'>
						<div className='flex'>
							<span className='mr-5'>{iconsUtils.info}</span>
							<h2 className='text-xl font-semibold mb-4'>
								Enviar correo electrónico a: {email}
							</h2>
						</div>
						<div className='flex justify-end space-x-2'>
							<button
								onClick={() =>
									setStatus(state => ({ ...state, sendMail: false }))
								}
								className='font-semibold px-4 py-2 text-gray-600 hover:text-gray-800'
							>
								Cancelar
							</button>
							<button
								onClick={handleOptionClick}
								className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
							>
								Enviar
							</button>
						</div>
					</div>
				</div>
			</Dialog>
		)
	},
}

export { modals }
