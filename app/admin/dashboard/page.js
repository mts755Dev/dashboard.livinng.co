'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import useUser from '@/app/store/User'
import moneyUtils from '@/app/utils/moneyUtils'
import datesUtils from '@/app/utils/datesUtils'

export default function Dashboard() {
	const { User } = useUser()
	const URL = 'https://www.api.livinng.co'

	const [reservations, setAllReservation] = useState([])
	const [reviews, setAllReviews] = useState([])
	const [totalPrice, setTotalPrice] = useState(0)

	const fetchAllReservations = async () => {
		try {
			const { data } = await axios.post(
				`${URL}/admin/reservations`,
				{},
				{
					headers: {
						Authorization: `Bearer ${User.token}`,
					},
				},
			)
			setAllReservation(data)

			const totalPrice = data.reduce((count, e) => {
				if (e.state === 'confirmado') {
					return count + e.price
				}
				return count
			}, 0)
			setTotalPrice(totalPrice)
		} catch (error) {
			console.error('Error while fetching user reservations:', error)
		}
	}

	const fetchAllReviews = async () => {
		try {
			const { data } = await axios(`${URL}/admin/reviews`, {
				headers: {
					Authorization: `Bearer ${User.token}`,
				},
			})
			console.log(data)
			setAllReviews(data)
		} catch (error) {
			console.error('Error while fetching user reviews:', error)
		}
	}

	const headers = ['Usuario', 'Hospedaje', 'Precio por noche', 'Fecha', 'Total']

	const headersReviews = ['Usuario', 'Hospedaje', 'Fechas', 'Puntuación']

	useEffect(() => {
		fetchAllReservations()
		fetchAllReviews()
	}, [User])

	return (
		<div>
			<div className='w-full flex justify-between mb-10'>
				<div className='bg-pink-100 rounded-lg p-5 flex flex-col justify-between'>
					<div className='flex gap-5 items-center mb-5 justify-center min-w-[240px] '>
						<Image src='/Download.svg' width={24} height={24} alt='Icono' />
						<h2>Ventas Totales</h2>
					</div>
					<p className='text-center mb-5'>{moneyUtils.formatCOP(totalPrice)}</p>
				</div>

				<div className='bg-yellow-100 rounded-lg p-5 flex flex-col justify-between'>
					<div className='flex gap-5 items-center mb-5 justify-center min-w-[240px]'>
						<Image src='/Call.svg' width={24} height={24} alt='Icono' />
						<h2>Reservas Totales</h2>
					</div>
					<p className='text-center mb-5'>{reservations?.length}</p>
				</div>

				<div className='bg-green-100 rounded-lg p-5 flex flex-col justify-between'>
					<div className='flex gap-5 items-center mb-5 justify-center min-w-[240px]'>
						<Image src='/Star.svg' width={24} height={24} alt='Icono' />
						<h2>Reviews Totales</h2>
					</div>
					<p className='text-center mb-5'>{reviews?.length}</p>
				</div>
			</div>
			<div className='grid grid-rows-2 gap-10px'>
				<section className='flex flex-col justify-between items-center gap-15px'>
					<article className='w-full h-full'>
						<h3 className='font-bold w-full text-18px'>Todas las reservas</h3>
						<table className='w-full'>
							<thead>
								<tr className='text-left text-gray-opaque font-medium'>
									{headers?.map((element, index) => (
										<th key={index} className='py-4 border-b'>
											{element}
										</th>
									))}
								</tr>
							</thead>

							<tbody>
								{reservations?.slice(0, 5)?.map((element, index) => (
									<tr key={index}>
										<td className='py-4 border-b'>{element?.name}</td>
										<td className='py-4 border-b'>{element?.accommodation}</td>
										<td className='py-4 border-b'>
											{moneyUtils.formatCOP(element?.price)}
										</td>
										<td className='py-4 border-b'>{`${datesUtils.abrevDate(
											element?.dates[0],
										)} - ${datesUtils.abrevDate(element?.dates[1])}`}</td>
										<td className='py-4 border-b'>
											{moneyUtils.formatCOP(element?.total)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</article>
					<Link href='/anfitrion/reservas' className='text-gray-400'>
						Ver todas
					</Link>
				</section>
				<section className='flex flex-col items-center gap-15px'>
					<article className='w-full h-fit'>
						<h3 className='font-bold w-full text-18px'>Últimas reviews</h3>
						<table className='w-full'>
							<thead>
								<tr className='text-left text-gray-opaque font-medium'>
									{headersReviews?.map((element, index) => (
										<th key={index} className='py-4 border-b'>
											{element}
										</th>
									))}
								</tr>
							</thead>

							<tbody>
								{reviews?.slice(0, 5)?.map((element, index) => (
									<tr key={index}>
										<td className='py-4 border-b'>{element.client}</td>
										<td className='py-4 border-b'>{element.accommodation}</td>
										<td className='py-4 border-b'>
											{datesUtils.abrevDate(element.dateTime)}
										</td>
										<td className='py-4 border-b'>
											<span className='flex items-center gap-2 leading-none'>
												<Image
													alt='Star'
													src='/Star.svg'
													width={16}
													height={16}
												/>
												{element.rating.toFixed(2)}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</article>
					<Link href='/anfitrion/comentarios' className='text-gray-400'>
						Ver todas
					</Link>
				</section>
			</div>
		</div>
	)
}
