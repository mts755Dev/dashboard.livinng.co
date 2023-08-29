import Image from 'next/image'
import SearchBar from './SearchBar'

export default function NavBar() {
	return (
		<nav className='w-full h-ful flex flex-row items-center px-50px border-b justify-between'>
			{/* <h1>Buenos dias, Usuario!</h1> */}
			<SearchBar />
			<div className='flex gap-20px'>
				<Image
					src='/Notification.svg'
					width={24}
					height={24}
					alt='notification'
				/>
				<Image
					src='https://res.cloudinary.com/dg8awhbvm/image/upload/v1689083757/Proyecto%20JS%20vanilla/Ellipse_2_rnjdhm.png'
					width={60}
					height={60}
					alt='rounded logo'
				/>
			</div>
		</nav>
	)
}
