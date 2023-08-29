import Image from 'next/image'
import { usePathname } from 'next/navigation'
import useUser from '../store/User'

export default function SearchBar() {
	const pathname = usePathname()
	const { User } = useUser()
	return (
		<>
			<h3 className='font-montserrat font-medium text-20px'>
				Bienvenido, {User.name}.
			</h3>

			{/* {pathname.split('/')[2] === 'dashboard' ? (
				<h3 className='font-montserrat font-medium text-20px'>Bienvenido, {User.name}.</h3>
			) : (
				<div className='flex flex-row items-center border h-45px rounded-full px-25px w-full justify-between max-w-[450px]'>
					<input placeholder='Busque dinamicamente' />
					<Image src='/Search.svg' width={20} height={20} alt='search icon' />
				</div>
			)} */}
		</>
	)
}
