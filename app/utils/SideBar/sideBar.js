import Category from 'public/Category.svg'
import Home from 'public/Home.svg'
import Document from 'public/Document.svg'
import Star from 'public/Star.svg'
import User from 'public/User.svg'
import Work from 'public/Work.svg'

const ROUTES = {
	ADMIN: [
		{
			id: 'dashboard',
			href: '/admin/dashboard',
			name: 'Dashboard',
			icon: Category,
		},
		{
			id: 'client',
			href: '/admin/clientes',
			name: 'Clientes',
			icon: User,
		},
		{
			id: 'host',
			href: '/admin/anfitriones',
			name: 'Anfitriones',
			icon: Work,
		},
		{
			id: 'accommodation',
			href: '/admin/alojamientos',
			name: 'Alojamientos',
			icon: Home,
		},
		{
			id: 'reservation',
			href: '/admin/reservas',
			name: 'Reservas',
			icon: Document,
		},
		{
			id: 'reviews',
			href: '/admin/comentarios',
			name: 'Comentarios',
			icon: Star,
		},
	],
	HOST: [
		{
			id: 'dashboard',
			href: '/anfitrion/dashboard',
			name: 'Dashboard',
			icon: Category,
		},
		{
			id: 'accommodation',
			href: '/anfitrion/alojamientos',
			name: 'Alojamientos',
			icon: Home,
		},
		{
			id: 'reservation',
			href: '/anfitrion/reservas',
			name: 'Reservas',
			icon: Document,
		},
		{
			id: 'reviews',
			href: '/anfitrion/comentarios',
			name: 'Comentarios',
			icon: Star,
		},
	],
}

export default ROUTES
