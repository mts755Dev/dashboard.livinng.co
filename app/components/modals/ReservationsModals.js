import moneyUtils from '@/app/utils/moneyUtils'
import { Dialog } from '@headlessui/react'
import axios from 'axios'
import Image from 'next/image'
import Calendar from '../Calendar'
import datesUtils from '@/app/utils/datesUtils'
import Swal from 'sweetalert2'

export function AcceptReservationModal({
	status,
	setStatus,
	offerId,
	getReservations,
	token,
}) {
	const acceptOffer = async offerId => {
		try {
			await axios.put(
				`https://www.api.livinng.co/host/reservations`,
				{
					reservationId: offerId,
					stateId: 'Aceptado',
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			Swal.fire({
				title: 'Ok!',
				text: 'La oferta ha sido aceptada',
				icon: 'success',
				confirmButtonColor: '#17387e',
				confirmButtonText: 'Aceptar',
				width: 400,
			})
			closeModal()
		} catch (error) {
			Swal.fire({
				title: '¡Error!',
				text: error.response.data,
				icon: 'error',
				confirmButtonText: 'Aceptar',
				confirmButtonColor: '#17387e',
				width: 400,
			})
			closeModal()
		}
	}

	const closeModal = event => {
		getReservations()
		setStatus(state => ({ ...state, acceptReservation: false }))
	}

	return (
		<Dialog open={status} onClose={() => closeModal()} className='relative z-9'>
			<div
				className='fixed inset-0 bg-corporate-blue/25 backdrop-filter backdrop-blur'
				aria-hidden='true'
			/>

			<div className='fixed inset-0 flex items-center justify-center'>
				<Dialog.Panel className='flex flex-col mx-auto max-w-2xl bg-lightgreen p-8 rounded-lg shadow-lg'>
					<Dialog.Title className='flex items-center font-semibold'>
						<Image src='/Check.svg' width={20} height={20} alt='check' />
						Por favor confirma esta acción
						<button onClick={() => closeModal()}>
							<Image src='/Close.svg' width={20} height={20} alt='check' />
						</button>
					</Dialog.Title>
					<Dialog.Description>
						El cliente tendrá 24 horas para realizar el pago.
					</Dialog.Description>
					<div className='flex flex-row justify-end'>
						<button
							onClick={() => closeModal()}
							className='font-semibold px-4 py-2hover:text-gray-600'
						>
							Cancelar
						</button>
						<button
							onClick={() => acceptOffer(offerId)}
							className='px-4 py-2 bg-darkgreen text-white rounded hover:bg-green'
						>
							Si, aceptar
						</button>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}
export function RejectReservationModal({
	status,
	setStatus,
	offerId,
	getReservations,
	token,
}) {
	const closeModal = event => {
		getReservations()
		setStatus(state => ({ ...state, rejectReservation: false }))
	}

	const rejectOffer = async offerId => {
		try {
			await axios.put(
				`https://www.api.livinng.co/host/reservations`,
				{
					reservationId: offerId,
					stateId: 'Rechazado',
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			Swal.fire({
				title: 'Ok!',
				text: 'La oferta ha sido rechazada',
				icon: 'info',
				confirmButtonColor: '#17387e',
				confirmButtonText: 'Aceptar',
				width: 400,
			})
			closeModal()
		} catch (error) {
			Swal.fire({
				title: '¡Error!',
				text: error.response.data,
				icon: 'error',
				confirmButtonText: 'Aceptar',
				confirmButtonColor: '#17387e',
				width: 400,
			})
			closeModal()
		}
	}

	return (
		<Dialog open={status} onClose={() => closeModal()} className='relative z-9'>
			<div
				className='fixed inset-0 bg-corporate-blue/25 backdrop-filter backdrop-blur'
				aria-hidden='true'
			/>

			<div className='fixed inset-0 flex items-center justify-center'>
				<Dialog.Panel className='flex flex-col mx-auto max-w-2xl bg-lightred p-8 rounded-lg shadow-lg'>
					<Dialog.Title className='flex items-center font-semibold'>
						<Image src='/Alert.svg' width={20} height={20} alt='check' />
						Seguro quieres rechazar esta oferta?
						<button onClick={() => closeModal()}>
							<Image src='/Close.svg' width={20} height={20} alt='check' />
						</button>
					</Dialog.Title>
					<Dialog.Description>
						Esta acción no puede deshacerse.
					</Dialog.Description>
					<div className='flex flex-row justify-end'>
						<button
							onClick={() => closeModal()}
							className='font-semibold px-4 py-2hover:text-gray-600'
						>
							Cancelar
						</button>
						<button
							onClick={() => rejectOffer(offerId)}
							className='px-4 py-2 bg-darkred text-white rounded hover:bg-red'
						>
							Si, rechazar
						</button>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}
export function CounterofferReservationModal({
	status,
	setStatus,
	offer,
	setOffer,
	getReservations,
	token,
}) {
	const closeModal = event => {
		getReservations()
		setStatus(state => ({ ...state, counterofferReservation: false }))
	}
	const counterOffer = async offerId => {
		try {
			await axios.put(
				`https://www.api.livinng.co/host/reservations`,
				{
					reservationId: offerId,
					dates: [offer.dates[0], offer.dates[1]],
					offer: {
						nights: offer.offer.nights,
						price: Number(offer.offer.price),
						total: Number(offer.offer.total),
					},
					stateId: 'Contraofertado',
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			Swal.fire({
				title: 'Ok!',
				text: 'La oferta ha sido Contraofertada',
				icon: 'info',
				confirmButtonColor: '#17387e',
				confirmButtonText: 'Aceptar',
				width: 400,
			})
			closeModal()
		} catch (error) {
			Swal.fire({
				title: '¡Error!',
				text: error.response.data,
				icon: 'error',
				confirmButtonText: 'Aceptar',
				confirmButtonColor: '#17387e',
				width: 400,
			})
			closeModal()
		}
	}

	return (
		<Dialog open={status} onClose={() => closeModal()} className='relative z-9'>
			<div
				className='fixed inset-0 bg-corporate-blue/25 backdrop-filter backdrop-blur'
				aria-hidden='true'
			/>

			<div className='fixed inset-0 flex items-center justify-center'>
				<Dialog.Panel className='flex flex-col mx-auto bg-white p-8 rounded-lg shadow-lg gap-10px'>
					<Dialog.Title className='flex items-center font-semibold justify-between'>
						<Image src='/Alert.svg' width={20} height={20} alt='check' />
						Ingrese los cambios a contraofertar
						<button onClick={() => closeModal()}>
							<Image src='/Close.svg' width={20} height={20} alt='check' />
						</button>
					</Dialog.Title>
					<Dialog.Description as='section' className='flex flex-row gap-25px'>
						<Calendar dates={offer.dates} setDates={setOffer} />
						<article className='flex flex-col max-w-[250px] gap-15px'>
							<div className='flex flex-col gap-5px'>
								<h4 className='text-20px'>Oferta actual</h4>
								<span>
									{`${moneyUtils.formatCOP(offer.price)} x noche`} <br />
									{`Total: ${moneyUtils.formatCOP(offer.total)} x ${
										offer.nights
									} noches`}
									<br />
									{`${datesUtils.abrevDate(
										offer.dates[0],
									)} a ${datesUtils.abrevDate(offer.dates[1])}`}
								</span>
							</div>
							<div>
								<h4 className='text-20px'>Nuevo Precio</h4>
								<input
									min={1}
									type='number'
									value={offer.offer?.price}
									onChange={e =>
										setOffer(state => ({
											...state,
											offer: {
												...state.offer,
												price: e.target.value,
												total: e.target.value * state.nights,
											},
										}))
									}
									placeholder='Ingrese un precio nuevo'
									className='max-h-12 border border-gray-300 rounded px-3 py-2 w-50 mr-2'
								/>
							</div>
							<div className='flex flex-col gap-5px'>
								<h4 className='text-20px'>Precio final</h4>
								{offer.offer?.price && (
									<span>
										{`${moneyUtils.formatCOP(offer.offer?.price)} x noche`}{' '}
										<br />
										{offer.offer?.total &&
											`Total: ${moneyUtils.formatCOP(offer.offer?.total)} x ${
												offer.offer.nights || offer.nights
											} noches`}
										<br />
										{/* {`${datesUtils.abrevDate(
											offer.dates[0],
										)} a ${datesUtils.abrevDate(offer.dates[1])}`} */}
									</span>
								)}
							</div>
						</article>
					</Dialog.Description>
					<div className='flex flex-row justify-end'>
						<button
							onClick={() => closeModal()}
							className='font-semibold px-4 py-2hover:text-gray-600'
						>
							Cancelar
						</button>
						<button
							onClick={() => counterOffer(offer.id)}
							className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-red'
						>
							Enviar contraoferta
						</button>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}
