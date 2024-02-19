import moment from 'moment/moment'

export function monetary(value: number) {
	return value.toFixed(2)
}

export function dateTime(date: Date) {
	return moment(date).format('DD/MM/YYYY HH:mm')
}

export function day(date: Date) {
	return moment(date).format('DD/MM/YYYY')
}

export function exactDateTime(date: Date) {
	return moment(date).format('YYYY-MM-DD HH:mm:ss.SSS')
}