import useUser from '@/app/store/User'
import { Dialog } from '@headlessui/react'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'

export default function AddTypes({ status, setStatus }) {
	const { User } = useUser()
	const [inputs, setInputs] = useState({
		types: [],
		services: [],
		sizes: [],
	})
	const [confirm, setConfirm] = useState(false)

	const closeModal = event => {
		setStatus(state => ({ ...state, addTypes: false }))
		setInputs({
			types: [],
			services: [],
			sizes: [],
		})
		setConfirm(false)
	}

	const handleChange = (e, type) => {
		setInputs(state => ({ ...state, [type]: e.split(' ') }))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const headers = {
				Authorization: `Bearer ${User.token}`,
			}
			if (inputs.services.length > 0) {
				const { data } = await axios.post(
					'https://www.api.livinng.co/admin/services',
					{ services: inputs.services },
					{
						headers,
					},
				)
				console.log(data)
			}
			if (inputs.types.length > 0) {
				const { data } = await axios.post(
					'https://www.api.livinng.co/admin/acctype',
					{ acctype: inputs.types },
					{
						headers,
					},
				)
				console.log(data)
			}
			if (inputs.sizes.length > 0) {
				const { data } = await axios.post(
					'https://www.api.livinng.co/admin/size',
					{ size: inputs.sizes },
					{
						headers,
					},
				)
				console.log(data)
			}
			closeModal()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Dialog open={status} onClose={() => closeModal()} className='relative z-9'>
			<div
				className='fixed inset-0 bg-corporate-blue/25 backdrop-filter backdrop-blur'
				aria-hidden='true'
			/>

			<div className='fixed inset-0 flex items-center justify-center'>
				<Dialog.Panel className='flex flex-col mx-auto bg-white p-8 pb-4 rounded-lg shadow-lg gap-10px'>
					<Dialog.Title className='flex items-center font-semibold justify-between'>
						Añada nuevas caracteristicas para los alojamientos
						<button onClick={() => closeModal()}>
							<Image src='/Close.svg' width={20} height={20} alt='check' />
						</button>
					</Dialog.Title>
					<Dialog.Description
						as='section'
						className='grid grid-cols-2 gap-25px'
					>
						{[
							{
								type: 'services',
								title: 'Añada nuevos servicios',
							},
							{
								type: 'types',
								title: 'Añada un nuevo tipo',
							},
							{
								type: 'sizes',
								title: 'Añada un nuevo tamaño',
							},
						].map(({ type, title }) => (
							<article
								className='flex flex-col items-center gap-5px'
								key={type}
							>
								<label className='w-full'>{title}</label>
								<input
									type='text'
									className='px-4 py-2 border rounded-[5px] text-12px'
									placeholder='Separados con espacio para añadir varios'
									onChange={e => handleChange(e.target.value, type)}
									value={inputs[type].join(' ')}
								/>
							</article>
						))}
						<article className='flex flex-col justify-center gap-5px'>
							{confirm ? (
								<>
									<p className='text-16px flex flex-col'>
										Esta accion añadira nuevos:
									</p>
									<div className='flex flex-row justify-between'>
										{[
											{
												type: 'services',
												title: 'Servicios',
											},
											{
												type: 'types',
												title: 'Tipos',
											},
											{
												type: 'sizes',
												title: 'Tamaños',
											},
										].map(
											({ type, title }) =>
												inputs[type].length > 0 && (
													<div className='flex flex-col' key={title}>
														<p className='text-14px text-left'>{title}</p>
														{inputs[type].map(e => (
															<span className='text-12px' key={e}>
																{`• ${e}`}
															</span>
														))}
													</div>
												),
										)}
									</div>
									<input
										type='submit'
										value='Añadir'
										className='px-4 py-3 text-14px hover:bg-corporate-blue/25 hover:text-black bg-corporate-blue text-white w-fit rounded-[5px] mx-auto'
										onClick={e => handleSubmit(e)}
									/>
								</>
							) : (
								<button
									className='px-4 py-3 text-14px hover:bg-corporate-yellow/25 bg-corporate-yellow/75 w-fit rounded-[5px] mx-auto'
									onClick={() => setConfirm(true)}
								>
									Continuar
								</button>
							)}
						</article>
					</Dialog.Description>
					<span className='text-12px text-center bg-gray-100 py-4'>
						Separa los valores con espacios para añadir varios
					</span>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}
