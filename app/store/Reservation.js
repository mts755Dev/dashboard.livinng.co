import { create } from 'zustand'

export const useReservation = create(set => ({
	selectDates: {
		arrival: { day: '', month: '', year: '' },
		departure: { day: '', month: '', year: '' },
	},
	setSelectDates: prop =>
		set(({ selectDates }) => {
			return {
				selectDates: prop,
			}
		}),
	dataReservation: {
		userId: null,
		accommodationId: '',
		dates: [],
		people: {
			childs: 0,
			adults: 0,
		},
		offer: {
			nights: 0,
			price: null,
			total: 0,
		},
		contact: {
			name: '',
			email: '',
			phone: '',
		},
	},
	decrement: prop =>
		set(({ dataReservation }) => {
			let updatedValue = +dataReservation.people[prop]
			if (updatedValue > 0) updatedValue--
			return {
				dataReservation: {
					...dataReservation,
					people: {
						...dataReservation.people,
						[prop]: updatedValue,
					},
				},
			}
		}),
	increment: prop =>
		set(({ dataReservation }) => {
			let updatedValue = +dataReservation.people[prop]
			if (updatedValue < 9) updatedValue++
			return {
				dataReservation: {
					...dataReservation,
					people: {
						...dataReservation.people,
						[prop]: updatedValue,
					},
				},
			}
		}),
	setOffer: (name, value) =>
		set(({ dataReservation }) => {
			const nights = name === 'nights' ? value : dataReservation.offer.nights
			const price = name === 'price' ? value : dataReservation.offer.price
			const updateTotal = nights * price
			return {
				dataReservation: {
					...dataReservation,
					offer: {
						...dataReservation.offer,
						total: updateTotal,
						[name]: value,
					},
				},
			}
		}),
	setLocation: prop =>
		set(({ dataReservation }) => ({
			dataReservation: { ...dataReservation, accommodationId: prop },
		})),
	setContact: (name, prop) =>
		set(({ dataReservation }) => ({
			dataReservation: {
				...dataReservation,
				contact: { ...dataReservation.contact, [name]: prop },
			},
		})),
	setDate: prop =>
		set(({ dataReservation }) => {
			return {
				dataReservation: {
					...dataReservation,
					dates: prop,
				},
			}
		}),
	setUser: prop =>
		set(({ dataReservation }) => {
			return {
				dataReservation: {
					...dataReservation,
					userId: prop,
				},
			}
		}),
}))