'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useUser from '@/app/store/User'

import datesUtils from '@/app/utils/datesUtils'

export default function Review() {
	const { User } = useUser()
	const [reviews, setReviews] = useState([])

	const getReviews = async () => {
		try {
			const { data } = await axios.post(
				'https://livinng.up.railway.app/host/reviews',
				{ hostId: User.userId },
				{
					headers: {
						Authorization: `Bearer ${User.token}`,
					},
				},
			)
			setReviews(data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		getReviews()
	}, [User])

	const headers = [
		{ title: 'Nombre', style: '' },
		{ title: 'Alojamiento', style: '' },
		{ title: 'Fecha', style: '' },
		{ title: 'Puntuacion', style: '' },
		{ title: 'Comentario', style: 'text-center' },
	]

	console.log(reviews)

	return (
		<>
			<h3>Comentarios</h3>
			<table className='w-full text-14px'>
				<thead>
					<tr className='text-left text-gray-opaque font-medium'>
						{headers?.map(({ title, style }, index) => (
							<th key={index} className={`${style} py-3 border-b`}>
								{title}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{reviews.map((review, index) => (
						<tr key={index} className='p-2 border-b border-bg-gray-100'>
							<td className='py-4'>{review.client}</td>
							<td className='py-4'>{review.accommodation}</td>
							<td className='py-4'>{datesUtils.abrevDate(review.dateTime)}</td>
							<td className='py-4'>
								<span className='flex flex-row items-center gap-2'>
									<Image
										src='https://res.cloudinary.com/dg8awhbvm/image/upload/v1689728692/Proyecto%20JS%20vanilla/Star_siwc1v.png'
										alt={`StarI${index}`}
										width={20}
										height={20}
									/>
									{review.rating.toFixed(2)}
								</span>
							</td>
							<td className='py-4'>
								<div className='comment max-w-[450px] max-h-[150px] px-8 py-4 border border-corporate-blue rounded-[10px] overflow-y-scroll'>
									{review.comentario}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
