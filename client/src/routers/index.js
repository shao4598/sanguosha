import Landlords from '@/views/Landlords.vue'
import Login from '@/views/Login.vue'

export default [
	{
		path: '/Landlords/:id',
		component: Landlords,
	},
	{
		path: '/',
		component: Login,
	},
]
