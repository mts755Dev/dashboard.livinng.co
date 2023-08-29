'use client'
import { useState, useEffect } from 'react'
import { buttonUtils } from '../../utils/buttonUtils'
import { iconsUtils } from '@/app/utils/iconsUtils'
import { modals } from '@/app/utils/modals'
import { requestUtils } from '@/app/utils/requestUtils'
import useUser from '@/app/store/User'

export default function Clients() {
	const { User } = useUser()
	const [clients, setClients] = useState([])
	// estado para abrir los modales
	const [modalState, setModalState] = useState({
		enableUser: false,
		disableUser: false,
		sendMail: false,
	})
	const [sendToModal, setSendToModal] = useState('')

	const [selectedStatus, setSelectedStatus] = useState('all')

	const filteredClients = clients?.filter(client => {
		if (selectedStatus === 'all') {
			return true
		} else if (selectedStatus === 'active') {
			return !client.disabled
		} else if (selectedStatus === 'inactive') {
			return client.disabled
		}
	})

	// Recupera todas los clientes de la app - segun userAdmin - Pendiente implementar con login
	const getClients = async () => {
		try {
			const data = await requestUtils.getAllUsers(User.token)
			setClients(data)
		} catch (error) {
			console.error('Error while fetching user clients:', error)
		}
	}
	useEffect(() => {
		getClients()
	}, [])

	// Ejemplo -- Borrar cuando funcione la ruta --

	// Encabezados de la tabla
	const headers = [
		'Nombre',
		'Correo electronico',
		// 'Celular',
		// 'Última reservación',
		'Estado',
		'Acciones',
	]
	// Opciones del obton desplegable
	const buttonOptions = ['Deshabilitar', 'Habilitar', 'Contactar']
	// Iconos del boton desplegable
	const buttonIcons = [iconsUtils.close, iconsUtils.check, iconsUtils.mail]
	const buttonColors = ['lightred', 'lightgreen', 'gray']

	// Maneja las opciones seleccionadas en la accion de las accomodations y abre los modales
	const handleClickOption = (option, id, email) => {
		setSendToModal({ id: id, email: email })
		console.log(option)
		if (option === 'Deshabilitar') {
			setModalState(state => ({
				...state,
				disableUser: true,
			}))
			console.log(`Abrir modal de Deshabilitar ${id}`)
		}
		if (option === 'Habilitar') {
			setModalState(state => ({ ...state, enableUser: true }))
			console.log(`Abrir el modal de Eliminar ${id}`)
		}
		if (option === 'Contactar') {
			setModalState(state => ({
				...state,
				sendMail: true,
			}))
			console.log(`Abrir el modal de Pausar ${id}`)
		}
	}

	return (
		<>
			<div className='flex items-center justify-between'>
				<h3>Clientes</h3>
				<select
					id='status'
					value={selectedStatus}
					className=' bg-corporate-blue p-2 border lg rounded-lg cursor-pointer text-white'
					onChange={e => setSelectedStatus(e.target.value)}
				>
					<option value='all'>Todos</option>
					<option value='active'>Activo</option>
					<option value='inactive'>Inactivo</option>
				</select>
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
					{/* Reemplazar ejemplo por clients cuando este funcional la ruta */}
					{filteredClients?.map(user => (
						<tr key={user.id}>
							<td className='py-4 border-b'>{user.name}</td>
							<td className='py-4 border-b'>{user.email}</td>
							{/* <td className='py-4 border-b'>{user.phone}</td> */}
							{/* <td className='py-4 border-b'>${'user.lastReservation'}</td> */}
							<td className='py-4 border-b'>
								{/* Aquí utilizamos una condición para aplicar estilos */}
								<span
									className={`rounded-full px-2 py-1 text-xs font-medium ${
										user.disabled === false ? 'text-green-500' : 'text-red'
									}`}
								>
									{`${user.disabled === true ? 'Inactivo' : 'Activo'}`}
								</span>
							</td>
							<td className='py-4 border-b'>
								<buttonUtils.DropdownMenu
									title='Elegir'
									options={buttonOptions}
									handleClick={handleClickOption}
									id={user.id}
									icons={buttonIcons}
									colors={buttonColors}
									email={user.email}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<modals.enableUserModal
				status={modalState.enableUser}
				setStatus={setModalState}
				id={sendToModal.id}
				getClients={getClients}
				token={User.token}
			/>
			<modals.disableUserModal
				status={modalState.disableUser}
				setStatus={setModalState}
				id={sendToModal.id}
				getClients={getClients}
				token={User.token}
			/>
			<modals.sendMailModal
				status={modalState.sendMail}
				setStatus={setModalState}
				id={sendToModal.id}
				email={sendToModal.email}
				token={User.token}
			/>
		</>
	)
}
