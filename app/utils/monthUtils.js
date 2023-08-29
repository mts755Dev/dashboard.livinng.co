'use client'
import { useEffect, useState } from 'react'

const monthUtils = {
	// Recibiendo por parámetros año y mes, devuelve todas las fechas de ese mes en ese año especifico en un array, en formato "Julio 25, 2023"
	getDatesOfMonth: (year, month) => {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		]

		const dates = []
		const firstDay = new Date(year, month, 1)
		const lastDay = new Date(year, month + 1, 0)

		for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
			const date = new Date(year, month, i)
			const dateString = `${
				months[month]
			} ${date.getDate()}, ${date.getFullYear()}`
			dates.push(dateString)
		}

		return dates
	},
	// Recibiendo por parametro el numero del mes entre el 0 y el 11, devuelve el nombre del mes en una string
	getMonthName: monthNumber => {
		const months = [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre',
		]

		if (monthNumber >= 0 && monthNumber <= 11) {
			return months[monthNumber]
		} else {
			throw new Error('Número de mes inválido. Debe estar entre 0 y 11.')
		}
	},
	// Funcion transformadora de objeto day, month, year, a array ejm ['December 25, 2023 10:00:000Z', 'December 25, 2023 14:00:000Z']
	transformObjectToArray: obj => {
		const getMonthName = month => {
			const months = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			]
			return months[month]
		}
		const arrivalString = `${getMonthName(obj.arrival.month)} ${
			obj.arrival.day
		}, ${obj.arrival.year} 14:00:000Z`
		const departureString = `${getMonthName(obj.departure.month)} ${
			obj.departure.day
		}, ${obj.departure.year} 11:00:000Z`

		return [arrivalString, departureString]
	},
	// Inversa a la anterior, Funcion transformadora de string ['December 25, 2023 10:00:000Z', 'December 25, 2023 14:00:000Z'] a objeto {{arrival:{day:25, month:11, year:2023}}, departure:{day:25, month:11, year:2023}}
	transformArrayToObject: arr => {
		const arrivalDate = new Date(arr[0])
		const departureDate = new Date(arr[1])

		const arrivalObj = {
			day: arrivalDate.getUTCDate(),
			month: arrivalDate.getUTCMonth(),
			year: arrivalDate.getUTCFullYear(),
		}

		const departureObj = {
			day: departureDate.getUTCDate(),
			month: departureDate.getUTCMonth(),
			year: departureDate.getUTCFullYear(),
		}

		return {
			arrival: arrivalObj,
			departure: departureObj,
		}
	},
	// Hace cuenta regresiva, recibiendo una fecha anterior a la fecha actual
	calculateCountdown: (endDate, hours) => {
		const targetDate = new Date(endDate)
		targetDate.setHours(targetDate.getHours() + hours)

		const now = new Date()
		const difference = targetDate - now

		if (difference <= 0) {
			return {
				hours: 0,
				minutes: 0,
				seconds: 0,
			}
		}

		let totalSeconds = Math.floor(difference / 1000)
		const hoursLeft = Math.floor(totalSeconds / 3600)
		totalSeconds %= 3600
		const minutesLeft = Math.floor(totalSeconds / 60)
		const secondsLeft = totalSeconds % 60

		return {
			hours: hoursLeft,
			minutes: minutesLeft,
			seconds: secondsLeft,
		}
	},

	Countdown: ({ endDate, hours }) => {
		const [countdown, setCountdown] = useState(
			monthUtils.calculateCountdown(endDate, hours),
		)

		useEffect(() => {
			const interval = setInterval(() => {
				const newCountdown = monthUtils.calculateCountdown(endDate, hours)
				setCountdown(newCountdown)
			}, 1000)

			return () => clearInterval(interval)
		}, [endDate, hours])

		return (
			<div className='flex'>
				<p>{countdown.hours.toString().padStart(2, '0')}:</p>
				<p>{countdown.minutes.toString().padStart(2, '0')}:</p>
				<p>{countdown.seconds.toString().padStart(2, '0')}</p>
			</div>
		)
	},
}

export { monthUtils }
