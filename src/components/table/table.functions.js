import { range } from '@core/utils'

export function shouldResize(event) {
	return event.target.dataset.resize
}

export function isCell(event) {
	return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
	const target = $target.id(true)
	const current = $current.id(true)

	const columns = range(current.column, target.column)
	const rows = range(current.row, target.row)

	return columns.reduce((acc, column) => {
		rows.forEach(row => acc.push(`${row}:${column}`))
		return acc
	}, [])
}

export function nextSelector(key, { row, column }, rowsCount = 20) {
	const MIN_VALUE = 0
	const MAX_VALUE_C = 25
	const MAX_VALUE_R = rowsCount - 1

	switch (key) {
		case 'Enter':
		case 'ArrowDown':
			row = row + 1 > MAX_VALUE_R ? MAX_VALUE_R : row + 1
			break
		case 'Tab':
		case 'ArrowRight':
			column = column + 1 > MAX_VALUE_C ? MAX_VALUE_C : column + 1
			break
		case 'ArrowLeft':
			column = column - 1 < MIN_VALUE ? MIN_VALUE : column - 1
			break
		case 'ArrowUp':
			row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
			break
	}

	return `[data-id="${row}:${column}"]`
}