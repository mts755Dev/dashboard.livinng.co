'use client'

import Image from 'next/image'
import Link from 'next/link'
import ROUTES from '../utils/SideBar/sideBar'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useUser from '../store/User'

const SideBar = () => {
	const pathname = usePathname()
	const router = useRouter()
	const { User } = useUser()
	const [MENU, SETMENU] = useState([])

	useEffect(() => {
		if (User.role === 'ANFITRION') SETMENU(ROUTES.HOST)
		else SETMENU(ROUTES.ADMIN)
	}, [User])

	function handleLogout() {
		router.push('/')
		localStorage.removeItem('userData')
	}
	return (
		<>
			<aside
				id='default-sidebar'
				className='flex flex-col justify-between h-screen w-[300px] max-w-lg:bg-blue-200 border-r'
				aria-label='Sidebar'
			>
				<div className='flex-col flex gap-25px h-full'>
					<div className='flex items-center justify-center h-[100px] border-b'>
						<Image
							src='https://res.cloudinary.com/dg8awhbvm/image/upload/v1688585588/Proyecto%20JS%20vanilla/livinng_ico_sgauay.png'
							className='h-[50px] w-auto'
							alt='Your Company'
							width={150}
							height={50}
							priority
						/>
					</div>

					<div className='pl-10 font-bold text-16px'>
						{MENU?.map((e, index) => (
							<Link
								key={index}
								id={e.id}
								href={e.href}
								className={`flex items-center pl-4 h-[60px] gap-6 rounded-l-[10px] dark:text-white hover:bg-gray-200 ${
									e.name.toLowerCase() === pathname.split('/')[2]
										? 'bg-corporate-yellow/75'
										: undefined
								}`}
							>
								<Image src={e.icon} width={28} height={28} alt={e.name} />
								<span>{e.name}</span>
							</Link>
						))}
					</div>
				</div>
				<button
					className='flex justify-center items-center gap-5px py-[30px] font-bold pb- border-t border-gray-900/10 hover:bg-gray-100'
					onClick={handleLogout}
				>
					<Image src='/Logout.svg' alt='Icono' width={24} height={24} />
					Cerrar Sesión
				</button>
			</aside>
		</>
	)
}

export default SideBar
