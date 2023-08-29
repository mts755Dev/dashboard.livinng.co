'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'

import { monthUtils } from '@/app/utils/monthUtils'
import datesUtils from '@/app/utils/datesUtils'
import moneyUtils from '@/app/utils/moneyUtils'

import {
	AcceptReservationModal,
	CounterofferReservationModal,
	RejectReservationModal,
} from '@/app/components/modals/ReservationsModals'
import ReservationDropdown from '@/app/components/dropdowns/ReservationDropdown'
import useUser from '@/app/store/User'

export default function Reservations() {
	const { User } = useUser()
	const [reservations, setReservations] = useState([])
	const [offer, setOffer] = useState({
		id: '',
		name: '',
		dates: [],
		price: null,
	})
	const [modalState, setModalState] = useState({
		acceptReservation: false,
		rejectReservation: false,
		counterofferReservation: false,
	})

	const [filteredReservations, setFilteredReservations] = useState([])
	const [filterStatus, setFilterStatus] = useState('')
	const [sortOrder, setSortOrder] = useState('')

	useEffect(() => {
		const filterAndSortReservations = () => {
			let filteredData = [...reservations]

			if (filterStatus) {
				filteredData = filteredData.filter(
					reservation => reservation.stateId === filterStatus,
				)
			}

			if (sortOrder === 'asc') {
				filteredData.sort((a, b) => a.price - b.price)
			} else if (sortOrder === 'desc') {
				filteredData.sort((a, b) => b.price - a.price)
			}
			setFilteredReservations(filteredData)
		}
		filterAndSortReservations()
	}, [filterStatus, sortOrder, reservations])

	const getReservations = async () => {
		try {
			const { data } = await axios.post(
				'https://www.api.livinng.co/host/reservations',
				{
					hostId: User.userId,
				},
				{
					headers: {
						Authorization: `Bearer ${User.token}`,
					},
				},
			)
			setReservations(data)
			setFilteredReservations(data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getReservations()
	}, [User.userId])

	// Encabezados de la tabla
	const headers = [
		'Nombre',
		'Alojamiento',
		'Fechas',
		'Personas',
		'Total',
		'Estado',
		'Restante',
		'Acciones',
	]
	return (
		<>
			<div className='flex items-center justify-between'>
				<h3>Reservas</h3>
				<div className='flex gap-6'>
					<select
						value={filterStatus}
						onChange={e => setFilterStatus(e.target.value)}
						className=' bg-corporate-blue p-2 mt-3 border lg rounded-lg cursor-pointer text-white'
					>
						<option value=''>Todas</option>
						<option value='Aceptado'>Aceptado</option>
						<option value='Pendiente'>Pendiente</option>
						<option value='Rechazado'>Rechazado</option>
						<option value='Contraofertado'>Contraofertado</option>
					</select>

					<select
						value={sortOrder}
						onChange={e => setSortOrder(e.target.value)}
						className=' bg-corporate-blue p-2 mt-3 border lg rounded-lg cursor-pointer text-white'
					>
						<option value=''>Precio</option>
						<option value='asc'>ascendente</option>
						<option value='desc'>descendente</option>
					</select>

					{/* <select
					value={countdownOrder}
					onChange={e => setCountdownOrder(e.target.value)}
					className=' bg-corporate-blue p-2 mt-3 border lg rounded-lg cursor-pointer text-white'
				>
					<option value=''>Tiempo</option>
					<option value='asc'> ascendente</option>
					<option value='desc'> descendente</option>
				</select> */}
				</div>
			</div>
			<table className='w-full'>
				<thead>
					<tr className='text-left text-gray-opaque font-medium'>
						{headers?.map((header, index) => (
							<th key={index} className='py-3 border-b'>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{filteredReservations?.map(
						({
							id,
							name,
							email,
							accommodation,
							dates,
							price,
							total,
							stateId,
							adults,
							childs,
							dateTime,
							nights,
						}) => (
							<>
								<tr key={id}>
									<td className='py-4 border-b'>{name}</td>
									<td className='py-4 border-b'>{accommodation}</td>
									<td className='py-4 border-b'>
										{datesUtils.abrevDate(dates[0])} <br />
										{datesUtils.abrevDate(dates[1])}{' '}
									</td>
									<td className='py-4 border-b'>
										{`${adults} Adultos`} <br />{' '}
										{childs ? childs + ' Niños' : ''}
									</td>
									<td className='py-4 border-b'>
										{moneyUtils.formatCOP(total)} <br />
										{`x ${nights} Noches`}
									</td>
									<td className='py-4 border-b w-fit'>
										<span
											className={`rounded-full z-1 px-4 py-2 text-xs text-white font-medium opacity-75 ${
												stateId === 'Aceptado'
													? 'bg-green-500'
													: stateId === 'Pendiente'
													? 'bg-yellow-500'
													: stateId === 'Rechazado'
													? 'bg-red/75'
													: stateId === 'Contra oferta'
													? 'bg-orange-300'
													: 'bg-blue-300'
											}`}
										>
											{stateId}
										</span>
									</td>
									<td className='py-4 border-b'>
										{stateId === 'Confirmado' ||
										stateId === 'Rechazado' ? undefined : (
											<monthUtils.Countdown endDate={dateTime} hours={24} />
										)}
									</td>
									<td className='py-4 border-b'>
										<ReservationDropdown
											offer={{ id, name, dates, price, total, nights }}
											setModalStatus={setModalState}
											setOffer={setOffer}
										/>
									</td>
								</tr>
							</>
						),
					)}
				</tbody>
			</table>
			<AcceptReservationModal
				offerId={offer.id}
				status={modalState.acceptReservation}
				setStatus={setModalState}
				getReservations={getReservations}
				token={User.token}
			/>
			<RejectReservationModal
				offerId={offer.id}
				status={modalState.rejectReservation}
				setStatus={setModalState}
				getReservations={getReservations}
				token={User.token}
			/>
			<CounterofferReservationModal
				offer={offer}
				setOffer={setOffer}
				setStatus={setModalState}
				getReservations={getReservations}
				status={modalState.counterofferReservation}
				token={User.token}
			/>
		</>
	)
}
