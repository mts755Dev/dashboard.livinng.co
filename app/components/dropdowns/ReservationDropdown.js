import { Fragment, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { AcceptReservation } from '../modals/ReservationsModals'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function ReservationDropdown({
	offer,
	setModalStatus,
	setOffer,
}) {
	return (
		<Menu as='div' className='relative inline-block text-left'>
			<div>
				<Menu.Button
					className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
					onClick={() =>
						setOffer({
							id: offer.id,
							name: offer.name,
							dates: offer.dates,
							price: offer.price,
							total: offer.total,
							nights: offer.nights
						})
					}
				>
					Options
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items className='absolute right-0 z-9 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col'>
					<Menu.Item>
						{({ close }) => (
							<>
								<button
									className={classNames('bg-gray-100 text-gray-900')}
									onClick={() => {
										close()
										setModalStatus(state => ({
											...state,
											acceptReservation: true,
										}))
									}}
								>
									Aceptar
								</button>
							</>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ close }) => (
							<>
								<button
									className={classNames('bg-gray-100 text-gray-900')}
									onClick={() => {
										close()
										setModalStatus(state => ({
											...state,
											rejectReservation: true,
										}))
									}}
								>
									Rechazar
								</button>
							</>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ close }) => (
							<>
								<button
									className={classNames('bg-gray-100 text-gray-900')}
									onClick={() => {
										close()
										setModalStatus(state => ({
											...state,
											counterofferReservation: true,
										}))
									}}
								>
									Contraofertar
								</button>
							</>
						)}
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}