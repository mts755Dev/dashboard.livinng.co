'use client'
import axios from 'axios'
const URL = 'https://www.api.livinng.co'
import Swal from 'sweetalert2'

const requestUtils = {
	// Recupera todas las accomodation del usuario - segun userID -
	getAccByUser: async (id, token) => {
		try {
			const { data } = await axios.get(`${URL}/host/acc/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return data
		} catch (error) {
			console.error('Error al realizar la petición:', error)
		}
	},
	deleteAccommodation: async (id, getAccs, token) => {
		try {
			await axios.delete(`${URL}/admin/acc/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			getAccs()
			Swal.fire({
				title: 'Advertencia',
				text: 'Alojamiento eliminado',
				icon: 'warning',
				confirmButtonText: 'Aceptar',
				confirmButtonColor: '#17387e',
				width: 400,
			})
		} catch (error) {
			console.error('Error al realizar la petición:', error)
		}
	},
	pauseAccommodationAdmin: async (id, getAccs, token) => {
		try {
			await axios.put(
				`${URL}/admin/acc/disabled`,
				{
					id: id,
					disabled: true,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			getAccs()
			Swal.fire({
				title: 'Advertencia',
				text: 'Alojamiento Pausado',
				icon: 'warning',
				confirmButtonText: 'Aceptar',
				confirmButtonColor: '#17387e',
				width: 400,
			})
		} catch (error) {
			console.error('Error al realizar la petición:', error)
		}
	},
	pauseAccommodation: async (id, getAccs, token) => {
		try {
			await axios.post(
				`${URL}/host/acc/update`,
				{
					id: id,
					disabled: true,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			getAccs()
			Swal.fire({
				title: 'Advertencia',
				text: 'Alojamiento pausado',
				icon: 'warning',
				confirmButtonText: 'Aceptar',
				confirmButtonColor: '#17387e',
				width: 400,
			})
		} catch (error) {
			console.error('Error al realizar la petición:', error)
		}
	},
	activateAccommodationAdmin: async (id, getAccs, token) => {
		try {
			await axios.put(
				`${URL}/admin/acc/disabled`,
				{
					id: id,
					disabled: false,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			getAccs()
			Swal.fire({
				title: 'Advertencia',
				text: 'Alojamiento en línea otra vez',
				icon: 'warning',
				confirmButtonText: 'Aceptar',
				confirmButtonColor: '#17387e',
				width: 400,
			})
		} catch (error) {
			console.error('Error al realizar la petición:', error)
		}
	},
	activateAccommodation: async (id, getAccs, token) => {
		try {
			await axios.post(
				`${URL}/host/acc/update`,
				{
					id: id,
					disabled: false,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			getAccs()
			Swal.fire({
				title: 'Advertencia',
				text: 'Alojamiento en línea otra vez',
				icon: 'warning',
				confirmButtonText: 'Aceptar',
				confirmButtonColor: '#17387e',
				width: 400,
			})
		} catch (error) {
			console.error('Error al realizar la petición:', error)
		}
	},
	acceptReservation: async (id, token) => {
		try {
			await axios.put(
				`${URL}/host/accomodations/modify`,
				{
					reservationId: id,
					stateId: 'Aceptado',
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			Swal.fire({
				title: 'OK',
				text: 'Oferta aceptada',
				icon: 'succes',
				confirmButtonText: 'Aceptar',
				confirmButtonColor: '#17387e',
				width: 400,
			})
		} catch (error) {
			console.error('Error al realizar la petición:', error)
		}
	},
	rejectReservation: async (id, token) => {
		try {
			await axios.put(
				`${URL}/host/accomodations/modify`,
				{
					reservationId: id,
					stateId: 'Rechazado',
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			Swal.fire({
				title: 'Advertencia',
				text: 'Oferta rechazada',
				icon: 'warning',
				confirmButtonText: 'Aceptar',
				confirmButtonColor: '#17387e',
				width: 400,
			})
		} catch (error) {
			console.error('Error al realizar la petición:', error)
		}
	},
	getAllUsers: async token => {
		try {
			const { data } = await axios.get(`${URL}/admin/clients/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return data
		} catch (error) {
			console.error('Error al realizar la petición:', error)
		}
	},
	disableUser: async (id, getClients, token) => {
		try {
			await axios.put(
				`${URL}/admin/clients/disabled`,
				{
					id: id,
					disabled: true,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			getClients()
			Swal.fire({
				title: 'Advertencia',
				text: 'Cliente deshabilitado',
				icon: 'warning',
				confirmButtonText: 'Aceptar',
				confirmButtonColor: '#17387e',
				width: 400,
			})
		} catch (error) {
			console.error('Error al realizar la petición:', error)
		}
	},
	enableUser: async (id, getClients, token) => {
		try {
			await axios.put(
				`${URL}/admin/clients/disabled`,
				{
					id: id,
					disabled: false,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			getClients()
			Swal.fire({
				title: 'Advertencia',
				text: 'Cliente habilitado',
				icon: 'warning',
				confirmButtonText: 'Aceptar',
				confirmButtonColor: '#17387e',
				width: 400,
			})
		} catch (error) {
			console.error('Error al realizar la petición:', error)
		}
	},
	counterReservation: async (id, price, dates, token) => {
		try {
			await axios.put(
				`${URL}/host/reservations`,
				price && dates
					? {
							id: id,
							price: price,
							dates: dates,
							stateId: 'Contraoferta',
					  }
					: price
					? {
							id: id,
							price: price,
							stateId: 'Contraoferta',
					  }
					: {
							id: id,
							dates: dates,
							stateId: 'Contraoferta',
					  },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			Swal.fire({
				title: 'OK!',
				text: 'Reserva Contraofertada exitosamente',
				icon: 'success',
				confirmButtonText: 'Aceptar',
				confirmButtonColor: '#17387e',
				width: 400,
			})
		} catch (error) {
			console.error('Error al realizar la petición:', error)
		}
	},
	getAllHosts: async token => {
		try {
			const { data } = await axios.get(`${URL}/admin/host/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return data
		} catch (error) {
			console.error('Error al realizar la petición:', error)
		}
	},
}

export { requestUtils }
