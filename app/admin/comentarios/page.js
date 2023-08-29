'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useUser from '@/app/store/User'

import datesUtils from '@/app/utils/datesUtils'

export default function Review() {
	const { User } = useUser()
	const [reviews, setReviews] = useState([])

	const [selectedRating, setSelectedRating] = useState('')
	const ratingOptions = [1, 2, 3, 4, 5]

	const filterRating = async () => {
		try {
			const response = await axios.post(
				'https://www.api.livinng.co/admin/reviews',
				{ rating: selectedRating },
				{
					headers: {
						Authorization: `Bearer ${User.token}`,
					},
				},
			)
			setReviews(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	const getReviews = async () => {
		try {
			const { data } = await axios.get(
				'https://www.api.livinng.co/admin/reviews',
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
	console.log(reviews)

	const headers = [
		{ title: 'Nombre', style: '' },
		{ title: 'Alojamiento', style: '' },
		{ title: 'Fecha', style: '' },
		{ title: 'Puntuacion', style: '' },
		{ title: 'Comentario', style: 'text-center' },
	]

	return (
		<>
			<div className='flex items-center justify-between'>
				<h3>Comentarios</h3>
				<select
					value={selectedRating}
					onChange={e => {
						setSelectedRating(e.target.value)
						filterRating()
					}}
					className=' bg-corporate-blue p-2 border rounded-lg cursor-pointer text-white'
				>
					<option value=''>Rating</option>
					{ratingOptions.map(rating => (
						<option key={rating} value={rating}>
							{rating}
						</option>
					))}
				</select>
			</div>

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
									{review?.rating?.toFixed(2)}
								</span>
							</td>
							<td className='py-4'>
								<div className='comment max-w-[450px] max-h-[100px] px-8 py-4 border border-corporate-blue rounded-[10px] overflow-y-scroll'>
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
