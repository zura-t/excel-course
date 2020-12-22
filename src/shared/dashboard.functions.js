import { storage } from "../core/utils"

function toHTML(k) {
	const model = storage(k)
	const id = k.split(':')[1]
	return `
	<li class="db__record">
		<a href="#excel/${id}">${model.title}</a>
		<strong>
		${new Date(model.openedDate).toLocaleDateString()}
		${new Date(model.openedDate).toLocaleTimeString()}
		</strong>
	</li>
	`
}

// excel: 12312
// excel: 1233321
function getAllKeys() {
	const keys = []
	for (let j = 0; j < localStorage.length; j++) {
		const key = localStorage.key(j)
		if (!key.includes('excel')) {
			continue
		}
		keys.push(key)
	}
	return keys
}

export function createRecordsTable() {
	const keys = getAllKeys()
	console.log('keys', keys);


	if (!keys.length) {
		return `<p>Вы пока не создали ни одной таблицы</p>`
	}

	return `
		<div class="db__list-header">
			<span>Название</span>
			<span>Дата открытия</span>
		</div>

		<ul class="db__list">
		${keys.map(toHTML).join('')}
		</ul>
		`
}