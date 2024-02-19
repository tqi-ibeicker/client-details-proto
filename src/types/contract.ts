export type Contract = {
	contractNumber: string,
	status: string,
	indebted: boolean,
	product: string,
	aging: number,
	debtBalance: number,
}

export type EventType = 'ruler' | 'indebtedAdd' | 'indebtedRemove' | 'agreement'

export type ContractEvent = {
	id: number,
	name: string,
	value?: number,
	dateTime: Date,
	dueDate?: Date,
	paidBy?: number,
	aging?: number,
	type: EventType,
}

export type ContractTimeline = {
	events: ContractEvent[]
}

export const TypeMaps: Record<EventType, any> = {
	'indebtedAdd': {
		'text': 'Dt. Venc.',
		'property': 'dueDate'
	},
	'indebtedRemove': {
		'text': 'Dt. Venc.',
		'property': 'dueDate'
	},
	'ruler': {
		'text': 'Aging',
		'property': 'aging'
	},
	'agreement': {
		'text': 'Vlr. Total',
		'property': 'value'
	},
}