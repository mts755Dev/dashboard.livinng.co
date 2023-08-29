const datesUtils = {
	abrevDate: date => {
		const abrevMonths = [
			'Ene',
			'Feb',
			'Mar',
			'Abr',
			'Jun',
			'Jul',
			'Ago',
			'Sep',
			'Oct',
			'Nov',
			'Dic',
		]
		const dateObj = new Date(date)

		const month = abrevMonths[dateObj.getMonth() - 1]
		const day = dateObj.getDate()
		const year = dateObj.getFullYear()

		return `${month} ${day}, ${year}`
	},
}

export default datesUtils
