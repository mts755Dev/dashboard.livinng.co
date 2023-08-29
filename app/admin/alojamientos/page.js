'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { buttonUtils } from '../../utils/buttonUtils'
import { iconsUtils } from '@/app/utils/iconsUtils'
import { modals } from '@/app/utils/modals'

import moneyUtils from '@/app/utils/moneyUtils'
import useUser from '@/app/store/User'
import axios from 'axios'
import AddTypes from '@/app/components/modals/AddTypes'

export default function Accomodations() {
	const URL = 'https://www.api.livinng.co'
	const [accommodations, setAccommodations] = useState([])
	const { User } = useUser()
	// estado para abrir los modales
	const [modalState, setModalState] = useState({
		deleteAccomodation: false,
		addTypes: false,
	})
	const [idToModal, setIdToModal] = useState('')

	const handleSortByRating = event => {
		const sortedAccommodations = [...accommodations]
		sortedAccommodations.sort((a, b) => {
			if (event.target.value === 'asc') {
				return a.rating - b.rating
			} else {
				return b.rating - a.rating
			}
		})
		setAccommodations(sortedAccommodations)
	}

	const handleSortByPrice = event => {
		const sortedAccommodations = [...accommodations]
		sortedAccommodations.sort((a, b) => {
			if (event.target.value === 'asc') {
				return a.price - b.price
			} else {
				return b.price - a.price
			}
		})
		setAccommodations(sortedAccommodations)
	}

	const filterAccommodations = async () => {
		try {
			const response = await axios.post(
				'https://www.api.livinng.co/admin/acc/filter',
				{ rating },
				{
					headers: {
						Authorization: `Bearer ${User.token}`,
					},
				},
			)
			setAccommodations(response.data)
		} catch (error) {
			console.error('Error al filtrar los alojamientos:', error)
		}
	}

	// Recupera todas las accomodation del usuario - segun userId
	const getAccs = async () => {
		try {
			const { data } = await axios(`${URL}/user/acc`)
			console.log(data)
			setAccommodations(data)
		} catch (error) {
			console.error('Error while fetching user accommodations:', error)
		}
	}
	useEffect(() => {
		getAccs()
	}, [])

	// Encabezados de la tabla
	const headers = [
		'Imagen',
		'Nombre',
		'Ubicación',
		// 'Tipo',
		'Precio sugerido',
		'Puntuacion',
		'Acciones',
	]
	// Opciones del obton desplegable
	const buttonOptions = ['Eliminar']
	// Iconos del boton desplegable
	const buttonIcons = [iconsUtils.delete, iconsUtils.pause, iconsUtils.play]
	// Colores del boton desplegable
	const buttonColors = ['lightred', 'lightyellow', 'lightgreen']

	// Maneja las opciones seleccionadas en la accion de las accomodations y abre los modales
	const handleClickOption = (option, id) => {
		setIdToModal(id)
		console.log(option)
		if (option === 'Editar') {
			setModalState(state => ({
				...state,
				editAccomodation: true,
			}))
		}
		if (option === 'Eliminar') {
			setModalState(state => ({ ...state, deleteAccomodation: true }))
		}
		if (option === 'Pausar') {
			setModalState(state => ({
				...state,
				pauseAccomodation: true,
			}))
		}
		if (option === 'Reanudar') {
			setModalState(state => ({
				...state,
				activateAccomodation: true,
			}))
		}
	}

	return (
		<>
			<div className='flex items-center justify-between'>
				<h3>Alojamientos</h3>
				<div className='flex gap-6 items-center'>
					<button
						className='flex items-center gap-5px border-b hover:text-gray-opaque'
						onClick={() =>
							setModalState(state => ({ ...state, addTypes: true }))
						}
					>
						Añadir nuevo tipo
						<Image src='/+.svg' alt='More' width={10} height={10} />
					</button>
					<select
						onChange={handleSortByRating}
						className=' bg-corporate-blue p-2  border lg rounded-lg cursor-pointer text-white'
					>
						<option value=''>Rating</option>
						<option value='asc'>Ascendente</option>
						<option value='desc'>Descendente</option>
					</select>
					<select
						onChange={handleSortByPrice}
						className=' bg-corporate-blue p-2  border lg rounded-lg cursor-pointer text-white'
					>
						<option value=''>Precio</option>
						<option value='asc'>Ascendente</option>
						<option value='desc'>Descendente</option>
					</select>
				</div>
			</div>

			<table className='w-full text-14px'>
				<thead>
					<tr className='text-left text-gray-opaque font-medium'>
						{headers?.map((header, index) => (
							<th key={index} className='py-4 border-b'>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{accommodations?.map(accomodation => (
						<tr key={accomodation.id}>
							<td className='py-6 border-b'>
								<Image
									key={accomodation.name}
									src={accomodation.image[0]}
									alt={accomodation.name}
									className='aspect-square rounded-[20px] bg-gray-100'
									width={100}
									height={100}
								/>
							</td>
							<td className='py-6 border-b'>{accomodation.name}</td>
							<td className='py-6 border-b'>{accomodation.location}</td>
							{/* <td className='py-6 border-b'>{accomodation.type}</td> */}
							<td className='py-6 border-b'>
								{moneyUtils.formatCOP(accomodation.price)}
							</td>
							<td className='py-6 border-b'>
								<span className='flex items-center gap-5px'>
									{iconsUtils.star}
									{accomodation.rating.toFixed(2)}
								</span>
							</td>
							<td className='py-6 border-b'>
								<buttonUtils.DropdownMenu
									title='Elegir'
									options={buttonOptions}
									handleClick={handleClickOption}
									id={accomodation.id}
									icons={buttonIcons}
									colors={buttonColors}
									modal={modalState}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<modals.deleteAccModal
				status={modalState.deleteAccomodation}
				setStatus={setModalState}
				id={idToModal}
				getAccs={getAccs}
				token={User.token}
			/>
			<AddTypes
				status={modalState.addTypes}
				setStatus={setModalState}
			/>
		</>
	)
}
