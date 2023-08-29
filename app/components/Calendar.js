import { monthUtils } from '../utils/monthUtils'
import { mathUtils } from '../utils/mathUtils'
import { buttonUtils } from '../utils/buttonUtils'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function Calendar({ setDates, dates }) {
	// Booleano para hacer foco al dia de arrival seleccionado
	const [arrivalButtonFoccus, setArrivalButtonFoccus] = useState(false)
	const [departureButtonFoccus, setDepartureButtonFoccus] = useState(false)

	// Devuelve fecha actual
	const currenDate = new Date()
	const currentMonth = currenDate.getMonth()
	const currentYear = currenDate.getFullYear()
	const currentDay = currenDate.getDate()
	const daysOfWeek = ['mon', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab']

	// Estado para renderizar los dias
	const [monthAndYear, setMonthAndYear] = useState({
		year: currenDate.getFullYear(),
		month: currenDate.getMonth(),
	})
	// Estado para guardar y enviar fechas seleccionadas
	const [selectedDates, setSelectedDates] = useState({
		arrival: { day: '', month: '', year: '' },
		departure: { day: '', month: '', year: '' },
	})
	// Manejador incremento de año
	const handleYearIncrement = () => {
		setMonthAndYear({
			year: monthAndYear.year + 1,
			month: 0,
		})
	}
	// Manejador decremento de año
	const handleYearDecrement = () => {
		setMonthAndYear({
			year: monthAndYear.year - 1,
			month: 11,
		})
	}
	// Estado para marcar ocupacion
	// const [occupancy, setOccupancy] = useState([])

	// devuelve un array con todas las fechas de un mes como string, en formato 'Enero 25, 2023'
	const datesOfMonth = monthUtils.getDatesOfMonth(
		monthAndYear.year,
		monthAndYear.month,
	)
	// Mismo array pero del mes previo - Se valida por si hay cambio de año
	let datesOfMonthPrev = []
	if (monthAndYear.month === 0) {
		datesOfMonthPrev = monthUtils.getDatesOfMonth(monthAndYear.year - 1, 11)
	} else {
		datesOfMonthPrev = monthUtils.getDatesOfMonth(
			monthAndYear.year,
			monthAndYear.month - 1,
		)
	}
	// Mismo array pero del mes siguiente - Se valida por si hay cambio de año
	let datesOfMonthNext = []
	if (monthAndYear.month === 11) {
		datesOfMonthNext = monthUtils.getDatesOfMonth(monthAndYear.year + 1, 0)
	} else {
		datesOfMonthNext = monthUtils.getDatesOfMonth(
			monthAndYear.year,
			monthAndYear.month + 1,
		)
	}
	// Devuelve el nombre del mes actual
	const monthName = monthUtils.getMonthName(monthAndYear.month)

	// Devuelve un array con los dias del mes del 1 al ultimo
	const daysOfMonth = mathUtils.generateNumberArray(datesOfMonth.length)
	const daysOfMonthPrev = mathUtils.generateNumberArray(datesOfMonthPrev.length)
	const daysOfMonthNext = mathUtils.generateNumberArray(datesOfMonthNext.length)

	// Devuelve el numero del dia de la semana correspondiente a una fecha
	const date = new Date(datesOfMonth[0])
	const dayOfWeek = date.getDay() + 1
	const datePrev = new Date(datesOfMonthPrev[datesOfMonthPrev.length - 1])
	const dayOfWeekPrev = datePrev.getDay()
	const dateNext = new Date(datesOfMonthNext[0])
	const dayOfWeekNext = dateNext.getDay()

	// Devuelve los ultimos dias del mes anterior, si caben en la vista actual
	let lastDaysPrevMonth = []
	if (dayOfWeekPrev < 6) {
		lastDaysPrevMonth = daysOfMonthPrev.slice(-dayOfWeekPrev - 1)
	} else {
		lastDaysPrevMonth = false
	}
	// Devuelve los primeros dias del mes siguiente, si caben en la vista actual
	let firstDaysNextMonth = []
	if (dayOfWeekNext > 0) {
		firstDaysNextMonth = daysOfMonthNext.slice(0, 7 - dayOfWeekNext)
	} else {
		firstDaysNextMonth = false
	}

	// Funcion transformadora de objeto day, month, year, a array ejm ['December 25, 2023 14:00:000Z', 'December 25, 2023 11:00:000Z']
	const arraySelectedDates = monthUtils.transformObjectToArray(selectedDates)

	const showAlert = () => {
		Swal.fire({
			title: 'Error al seleccionar fecha',
			text: 'Debes seleccionar una fecha posterior para tu salida',
			icon: 'warning',
			confirmButtonColor: '#17387e',
			confirmButtonText: 'Aceptar',
			width: 400,
		})
	}

	// Funcion manejadora de eventos
	const handleClick = value => {
		if (selectedDates.arrival.day === '') {
			return setSelectedDates({
				...selectedDates,
				arrival: {
					day: value,
					month: monthAndYear.month,
					year: monthAndYear.year,
				},
			})
		} else if (
			selectedDates.departure.day === '' &&
			selectedDates.arrival.day === value &&
			selectedDates.arrival.month === monthAndYear.month &&
			selectedDates.arrival.year === monthAndYear.year
		) {
			return setSelectedDates({
				...selectedDates,
				arrival: { day: '', month: '', year: '' },
			})
		} else if (
			selectedDates.arrival.day >= value &&
			selectedDates.arrival.month === monthAndYear.month &&
			selectedDates.arrival.year === monthAndYear.year
		) {
			showAlert()
		} else if (
			selectedDates.departure.year === monthAndYear.year &&
			selectedDates.departure.month === monthAndYear.month &&
			selectedDates.departure.day === value
		) {
			return setSelectedDates({
				...selectedDates,
				departure: { day: '', month: '', year: '' },
			})
		} else {
			return setSelectedDates({
				...selectedDates,
				departure: {
					day: value,
					month: monthAndYear.month,
					year: monthAndYear.year,
				},
			})
		}
	}

	// Funcion que maneja el boton confirmar fechas
	const confirmHandler = () => {
		const fechaInicio = new Date(arraySelectedDates[0])
		const fechaFin = new Date(arraySelectedDates[1])

		// Calcula la diferencia en milisegundos entre las dos fechas
		const diferenciaMilisegundos = fechaFin - fechaInicio

		// Convierte la diferencia a días dividiéndola por el número de milisegundos en un día
		const diferenciaDias = Math.ceil(
			diferenciaMilisegundos / (1000 * 60 * 60 * 24),
		)

		setSelectedDates(monthUtils.transformArrayToObject(arraySelectedDates))
		setDates(state => ({ ...state, dates: arraySelectedDates }))
		setDates(state => ({
			...state,
			offer: {
				...state.offer,
				nights: diferenciaDias,
				price: state.price,
				total:
					state.price * diferenciaDias || state.offer.price * diferenciaDias,
			},
		}))
		return arraySelectedDates
	}
	// Funcion que maneja el boton cancelar
	const cancelHandler = () => {
		// setStatus(false)
		setSelectedDates({
			arrival: { day: '', month: '', year: '' },
			departure: { day: '', month: '', year: '' },
		})
		setSelectedDates({
			arrival: { day: '', month: '', year: '' },
			departure: { day: '', month: '', year: '' },
		})
	}
	// Setea el booleano para hacer foco a los dias seleccionados
	useEffect(() => {
		setArrivalButtonFoccus(
			selectedDates.arrival.month === monthAndYear.month &&
				selectedDates.arrival.year === monthAndYear.year,
		)
		setDepartureButtonFoccus(
			selectedDates.departure.month === monthAndYear.month &&
				selectedDates.departure.year === monthAndYear.year,
		)
	}, [selectedDates, monthAndYear])

	useEffect(() => {
		if (selectedDates.arrival.day)
			setSelectedDates({
				arrival: {
					day: selectedDates.arrival.day,
					month: selectedDates.arrival.month - 1,
					year: selectedDates.arrival.year,
				},
				departure: {
					day: selectedDates.departure.day,
					month: selectedDates.departure.month - 1,
					year: selectedDates.departure.year,
				},
			})
		return () => {
			setSelectedDates({
				arrival: { day: '', month: '', year: '' },
				departure: { day: '', month: '', year: '' },
			})
		}
	}, [])

	return (
		<>
			<div className='flex w-[250px] flex-col gap-5px'>
				<div className='flex items-center justify-center gap-5px'>
					<button
						className='disabled:opacity-25'
						disabled={
							currentMonth === monthAndYear.month &&
							currentYear === monthAndYear.year
						}
						onClick={
							monthAndYear.month === 0
								? () => handleYearDecrement()
								: () => buttonUtils.handleDecrement('month', setMonthAndYear)
						}
					>
						<i className='fi fi-rr-angle-small-left float-right	'>{'<'}</i>
					</button>
					<div>{`${monthName} - ${monthAndYear.year}`}</div>
					<button
						onClick={
							monthAndYear.month === 11
								? () => handleYearIncrement()
								: () => buttonUtils.handleIncrement('month', setMonthAndYear)
						}
					>
						<i className='fi fi-rr-angle-small-right float-left'>{'>'}</i>
					</button>
				</div>

				<div className='grid-rows-7 grid grid-flow-row grid-cols-7'>
					{daysOfWeek.map(day => (
						<div key={day} className='mb-5px flex items-center justify-center'>
							<p>{day}</p>
						</div>
					))}

					{lastDaysPrevMonth
						? lastDaysPrevMonth.map(day => (
								<div
									key={day}
									className={`${
										selectedDates.arrival.month < monthAndYear.month &&
										monthAndYear.month <= selectedDates.departure.month
											? ' bg-blue-300'
											: ''
									} mx-auto flex aspect-square h-full w-25px flex-col items-center justify-center rounded-full`}
								>
									<button
										className='opacity-25'
										disabled={
											currentMonth === monthAndYear.month &&
											currentYear === monthAndYear.year
										}
										onClick={() =>
											buttonUtils.handleDecrement('month', setMonthAndYear)
										}
										name='prevDays'
									>
										{day}
									</button>
								</div>
						  ))
						: ''}
					{daysOfMonth.map((day, index) => (
						<div
							key={day}
							className={`mx-auto flex aspect-square h-full w-25px flex-col items-center justify-center rounded-full col-start-${
								index === 0 ? dayOfWeek : 'auto'
							} ${
								(arrivalButtonFoccus && selectedDates.arrival.day === day) ||
								(departureButtonFoccus &&
									day <= selectedDates.departure.day &&
									day >= selectedDates.arrival.day) ||
								(!arrivalButtonFoccus &&
									departureButtonFoccus &&
									day <= selectedDates.departure.day) ||
								(arrivalButtonFoccus &&
									day >= selectedDates.arrival.day &&
									selectedDates.departure.month > monthAndYear.month)
									? 'bg-blue-300'
									: 'bg-white'
							}`}
						>
							<button
								className='disabled:opacity-25'
								disabled={
									currentDay >= day &&
									currentMonth === monthAndYear.month &&
									currentYear === monthAndYear.year
								}
								name={day}
								value={day}
								onClick={() => handleClick(day)}
							>
								{day}
							</button>
						</div>
					))}
					{firstDaysNextMonth
						? firstDaysNextMonth.map((day, index) => (
								<div
									key={day}
									className={`mx-auto flex aspect-square h-full w-25px flex-col items-center justify-center rounded-full col-start-${
										index === 0 ? dayOfWeekNext : 'auto'
									}${
										arrivalButtonFoccus &&
										selectedDates.departure.month > monthAndYear.month
											? ' bg-blue-300'
											: ''
									}`}
								>
									<button
										className='opacity-25'
										onClick={() =>
											buttonUtils.handleIncrement('month', setMonthAndYear)
										}
										name='nextDays'
									>
										{day}
									</button>
								</div>
						  ))
						: ''}
				</div>
				{selectedDates.arrival.day && (
					<p className='text-left text-[12px]'>
						{`Check In: ${selectedDates.arrival.day} de 
						${monthUtils.getMonthName(selectedDates.arrival.month)}`}
						<br />
						{selectedDates.departure.day &&
							`Check out: ${selectedDates.departure.day} de 
							${monthUtils.getMonthName(selectedDates.departure.month)}`}
					</p>
				)}
				<div className='mt-10px flex justify-center gap-25px'>
					<button onClick={() => cancelHandler()} className='hover:text-red'>
						Borrar
					</button>
					<button
						className='rounded-xl bg-blue-900 px-10px py-3 text-white disabled:opacity-25'
						onClick={() => confirmHandler()}
						disabled={
							''
							// selectedDates.departure.day === selectedDates.departure.day &&
							// true
						}
					>
						Confirmar
					</button>
				</div>
			</div>
		</>
	)
}
