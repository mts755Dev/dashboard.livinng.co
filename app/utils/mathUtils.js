const mathUtils = {
	// Crea un array con los numeros desde 1 hasta el numero recibido por parametro
	generateNumberArray: number => {
		return Array.from({ length: number }, (_, index) => index + 1)
	},
	// Dado un objeto con propiedades igual a '', 0, undefined, null, devuelve una copia del objeto solo con las propiedades que tienen valor valido
	filterEmptyProperties: obj => {
		return Object.entries(obj).reduce((acc, [key, value]) => {
			if (
				value !== 0 &&
				value !== '' &&
				value !== null &&
				value !== undefined &&
				value.length !== 0
			) {
				if (typeof value === 'object' && !Array.isArray(value)) {
					const filteredValue = mathUtils.filterEmptyProperties(value)
					if (Object.keys(filteredValue).length > 0) {
						acc[key] = filteredValue
					}
				} else if (Array.isArray(value) && value.length > 0) {
					acc[key] = value
				} else {
					acc[key] = value
				}
			}
			return acc
		}, {})
	},
}

export { mathUtils }
