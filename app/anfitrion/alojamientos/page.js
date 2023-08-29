'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { buttonUtils } from '../../utils/buttonUtils'
import { iconsUtils } from '@/app/utils/iconsUtils'
import { modals } from '@/app/utils/modals'
import { requestUtils } from '@/app/utils/requestUtils'

import moneyUtils from '@/app/utils/moneyUtils'
import useUser from '@/app/store/User'
import Link from 'next/link'

export default function Accomodations() {
	const [userAccs, setUserAccs] = useState([])
	const { User } = useUser()
	// estado para abrir los modales
	const [modalState, setModalState] = useState({		
		activateAccomodation: false,
		pauseAccomodation: false,
		editAccomodation: false,
	})
	const [idToModal, setIdToModal] = useState('')

	// Recupera todas las accomodation del usuario - segun userId
	const getAccs = async () => {
		try {
			const data = await requestUtils.getAccByUser(User.userId, User.token)
			setUserAccs(data)
		} catch (error) {
			console.error('Error while fetching user accommodations:', error)
		}
	}
	useEffect(() => {
		getAccs()
	}, [User])

	// Encabezados de la tabla
	const headers = [
		'Imagen',
		'Nombre',
		'Ubicación',
		'Tipo',
		'Precio sugerido',
		'Puntuacion',
		'Estado',
		'Acciones',
	]
	// Opciones del obton desplegable
	const buttonOptions = ['Editar', 'Pausar', 'Reanudar']
	// Iconos del boton desplegable
	const buttonIcons = [
		iconsUtils.Edit,		
		iconsUtils.pause,
		iconsUtils.play,
	]
	const buttonColors = ['gray', 'lightred', 'lightyellow', 'lightgreen']

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

	console.log(userAccs)

	return (
		<>
			<div className='flex flex-row justify-between items-center'>
				<h3>Alojamientos</h3>
				<Link
					href='alojamientos/publicar'
					className='flex gap-5px border-b hover:text-gray-opaque'
				>
					Publicar Alojamiento
					<Image src='/+.svg' alt='More' width={10} height={10} />
				</Link>
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
					{userAccs?.map(accomodation => (
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
							<td className='py-6 border-b'>{accomodation.type}</td>
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
								<span
									className={`rounded-full px-2 py-1 text-xs font-medium ${
										accomodation.disabled === false
											? 'text-green-500'
											: 'text-red'
									}`}
								>
									{accomodation.disabled === false ? 'Activo' : 'Inactivo'}
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
			<modals.activateAccModal
				status={modalState.activateAccomodation}
				setStatus={setModalState}
				id={idToModal}
				getAccs={getAccs}
				token={User.token}
			/>
			<modals.pauseAccModal
				status={modalState.pauseAccomodation}
				setStatus={setModalState}
				id={idToModal}
				getAccs={getAccs}
				token={User.token}
			/>
			<modals.EditAccModal
				status={modalState.editAccomodation}
				setStatus={setModalState}
				id={idToModal}
				token={User.token}
			/>
		</>
	)
}
