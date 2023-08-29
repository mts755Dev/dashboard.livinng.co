const moneyUtils = {
	formatCOP: num => {
		num = num?.toString()
		var pattern = /(-?\d+)(\d{3})/
		while (pattern.test(num)) num = num.replace(pattern, '$1.$2')
		return num + ' COP'
	},
}

export default moneyUtils
