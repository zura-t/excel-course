const CODES = {
	A: 65,
	Z: 90
}

function createCell(_, index) {
	return `
	<div class="cell" contenteditable data-column="${index}"></div>
	`
}

function toColumn(column, index) {
	return `
		<div class="column" data-type="resizable" data-column="${index}">
		${column}
		<div class="column-resize" data-resize="column"></div>
		</div>
	`
}

function createRow(content = '', num = '') {
	const resize = num ? '<div class="row-resize" data-resize="row"></div>' : ''
	return `<div class="row" data-type="resizable">
	<div class="row-info">
	${num}
	${resize}
	</div>
	<div class="row-data">${content}</div>
	</div>
	`
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
	const columnsCount = CODES.Z - CODES.A + 1
	const rows = []

	const columns = new Array(columnsCount)
		.fill('')
		.map(toChar)
		.map(toColumn)
		.join('')

	const cells = new Array(columnsCount)
		.fill('')
		.map(createCell)
		.join('')


	rows.push(createRow(columns))

	for (let i = 0; i < rowsCount; i++) {
		rows.push(createRow(cells, i + 1))
	}

	return rows.join('')
}