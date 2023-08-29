'use client'
import { useState, useEffect } from 'react'
import { modals } from '@/app/utils/modals'
import { requestUtils } from '@/app/utils/requestUtils'
import datesUtils from '@/app/utils/datesUtils'
import useUser from '@/app/store/User'

export default function Hosts() {
	const { User } = useUser()
	const [userClients, setUserClients] = useState([])
	// estado para abrir los modales
	const [modalState, setModalState] = useState({
		sendMail: false,
	})
	const [selectedClient, setSelectedClient] = useState({
		id: '',
		email: '',
		name: '',
	})

	// Recupera todas los clientes de la app - segun userAdmin - Pendiente implementar con login
	useEffect(() => {
		const fetchAllHosts = async () => {
			try {
				const data = await requestUtils.getAllHosts(User.token)
				console.log(data)
				setUserClients(data)
			} catch (error) {
				console.error('Error while fetching user clients:', error)
			}
		}

		fetchAllHosts()
	}, [])

	// Encabezados de la tabla
	const headers = ['Nombre', 'Contacto', 'Acciones']

	// Maneja las opciones seleccionadas en la accion de las accomodations y abre los modales
	const handleContactClick = (id, email, name) => {
		setSelectedClient({ id, email, name })
		setModalState(state => ({ ...state, sendMail: true }))
	}

	return (
		<>
			<div>
				<h3>Anfitriones</h3>
			</div>
			<table className='w-full'>
				<thead>
					<tr className='text-left text-gray-opaque font-medium'>
						{headers?.map((header, index) => (
							<th key={index} className='border-b'>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{/* Reemplazar ejemplo por userHosts cuando este funcional la ruta */}
					{userClients?.map(user => (
						<tr key={user.id}>
							<td className='py-4 border-b'>{user.name}</td>
							<td className='px-2 grid-cols-1 grid border-b'>
								<div className='py-4'>Correo: {user.email}</div>
								<div className='py-4'>Celular: {user.phone}</div>
							</td>
							{/* <td className='px-2 py-4 border-b'>
								{datesUtils.abrevDate(user.dates)}
							</td>
							<td className='px-2 grid-cols-1 grid border-b'>
								<td className='py-4'>
									Alojamientos: {user.alojamientos?.length}
								</td>
								<td className='py-4'>
									Reservaciones: {user.reservations?.length}
								</td>
							</td> */}
							<td className='py-4 border-b'>
								<button
									className='px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
									type='button'
									title='Contactar'
									onClick={() =>
										handleContactClick(user.id, user.email, user.name)
									}
									id={user.id}
									value={user.email}
								>
									Contactar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<modals.sendMailModal
				status={modalState.sendMail}
				setStatus={setModalState}
				id={selectedClient.id}
				email={selectedClient.email}
				name={selectedClient.name}
			/>
		</>
	)
}
