import React, { useState } from 'react'
import { AcceptReservation } from '../components/modals/ReservationsModals'

const buttonUtils = {
	// Funcion manejadora del boton de incremento
	handleIncrement: (prop, setFunction) => {
		setFunction(prevFilters => {
			let updatedValue = parseInt(prevFilters[prop]) || 0
			updatedValue++
			return {
				...prevFilters,
				[prop]: updatedValue,
			}
		})
	},
	// Funcion manejadora del boton de decremento o reduccion
	handleDecrement: (prop, setFunction) => {
		setFunction(prevFilters => {
			let updatedValue = parseInt(prevFilters[prop]) || 0
			if (updatedValue > 0) {
				updatedValue--
			}
			return {
				...prevFilters,
				[prop]: updatedValue,
			}
		})
	},
	// Funcion manejadora de selector de rating
	handleRatingChange: (value, state, setState) => {
		if (value === state.rating) {
			setState({
				...state,
				rating: '',
			})
		} else {
			setState({
				...state,
				rating: value,
			})
		}
	},
	// Genera un dropdown button dandole el titulo comos tring y las opciones como array
	DropdownMenu: ({ title, options, handleClick, id, icons, colors, email, modal }) => {
		const [isOpen, setIsOpen] = useState(false)
		const toggleMenu = () => {
			setIsOpen(!isOpen)
		}
		const handleOptionClick = option => {
			email ? handleClick(option, id, email) : handleClick(option, id) // Llamamos a la función handleClick pasándole la opción seleccionada y el id
			setIsOpen(false) // Cerramos el menú desplegable después de hacer clic en una opción
		}

		return (
			<div className='relative inline-block text-left'>
				<div>
					<button
						type='button'
						className='inline-flex w-full justify-center gap-x-1.5 rounded-full bg-gray px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
						id='menu-button'
						aria-expanded={isOpen}
						aria-haspopup='true'
						onClick={toggleMenu}
					>
						{title}
						<svg
							className='h-5 w-5 text-gray-400'
							viewBox='0 0 20 20'
							fill='currentColor'
							aria-hidden='true'
						>
							<path
								fillRule='evenodd'
								d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
								clipRule='evenodd'
							/>
						</svg>
					</button>
				</div>

				{isOpen && (
					<>
						{/* <AcceptReservation
							status={modal.acceptReservation}
							setStatus={setModal}
							id={id}
						/> */}
						<div
							className='absolute right-0 z-1 mt-2 w-56 origin-top-right rounded-3xl bg-white focus:outline-none'
							role='menu'
							aria-orientation='vertical'
							aria-labelledby='menu-button'
							tabIndex='-1'
						>
							<div className='py-1' role='none'>
								{options.map((option, index) => (
									<button
										onClick={() => handleOptionClick(option)}
										key={`menu-item-${index}`}
										className={`flex flex-wrap items-center w-full bg-${
											// colors[index]
											undefined
										} hover:bg-opacity-80 text-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 block px-4 py-2 text-sm ${
											index === 0
												? 'rounded-t-3xl'
												: index === options.length - 1
												? 'rounded-b-3xl'
												: ''
										}`}
										role='menuitem'
										tabIndex='-1'
										id={id}
									>
										{option}
										{/* {icons[index]} */}
									</button>
								))}
							</div>
						</div>
					</>
				)}
			</div>
		)
	},
}

export { buttonUtils }
