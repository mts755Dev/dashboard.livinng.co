import { create } from 'zustand'

const useUser = create(set => ({
	User: {
		userId: undefined,
		role: undefined,
		token: undefined,
		name: undefined
	},
	setUser: data => set(({ User }) => ({ User: data })),
}))

export default useUser
