<template>
	<v-table class="w-100">
		<template #top >
			<TimelineFilter v-show="showFilters" @checked="setFilter" class="bg-grey-lighten-3"/>
		</template>
		<thead class="bg-grey-lighten-3">
		<tr>
			<th class="text-center">
				<v-icon icon="mdi-filter-outline" @click="showFilters = !showFilters"/>
			</th>
			<th>Evento</th>
			<th></th>
			<th></th>
			<th>Valor</th>
			<th>Data/Hora</th>
		</tr>
		</thead>
		<tbody>
		<tr v-for="(event, i) in computedTimeline" :key="i" :class="rowClass(i)">
			<td>
				<v-icon :icon="icon(event)" />
			</td>
			<td class="text-start">
				<v-icon icon="mdi-plus-box" size="small" color="grey-lighten-1"/> {{ event.name }}
			</td>
			<td class="text-end text-disabled tangent-right">{{ getText(event) }}:</td>
			<td class="text-start tangent-left">{{ getValue(event) }}</td>
			<td v-if="event.value">
				<span :class="valueClass(event)">{{ monetary(event.value) }}</span>
				<span v-if="event.paidBy" @mouseover="highlightPaidBy(event.paidBy)" @mouseleave="highlightedRow = -1">
					<v-icon title="Pago" icon="mdi-currency-usd-off" />
				</span>
				<span v-else>
					<v-icon />
				</span>
			</td>
			<td v-else></td>
			<td><span :title="exactDateTime(event.dateTime)">{{ dateTime(event.dateTime) }}</span></td>
		</tr>
		</tbody>
	</v-table>
</template>

<script setup lang="ts">
import { ContractEvent, ContractTimeline, EventType } from '@/types/contract'
import { computed, reactive, ref } from 'vue'
import { exactDateTime, dateTime, monetary, day } from '@/utils/Filters'
import { TypeMaps } from '@/types/contract'
import TimelineFilter from '@/components/TimelineFilter.vue'
import { timeline } from '@/mocks/ContractsExamples'

const props = defineProps<{
	timeline: ContractEvent[]
}>()

const showFilters = ref(false)

function valueClass(event: ContractEvent) {
	return { 'text-error': event.name === 'Inadimplência' }
}

function icon(event: ContractEvent) {
	if (event.type == 'ruler') {
		return 'mdi-ruler'
	} else if (event.type == 'agreement') {
		return 'mdi-check-outline'
	} else {
		return 'mdi-circle-multiple-outline'
	}
}

// Filtro
const filters: Record<EventType, boolean> = {
	'agreement': true,
	'ruler': true,
	'indebtedAdd': true,
	'indebtedRemove': true
}

const filtersReactive = reactive(filters)

const timelineComputed = reactive([...timeline.events])

function updateTimeline() {
	timelineComputed.splice(0)
	timelineComputed.push(...timeline.events.filter(t => filtersReactive[t.type]))
}

function setFilter(value: boolean, type: EventType) {
	filtersReactive[type] = value
	console.log(filters)
	updateTimeline()
}

const computedTimeline = computed(() => {
	const ret = props.timeline.filter(t => filtersReactive[t.type])
	console.log(ret, props.timeline)
	return ret
})

// Destacar linha
const highlightedRow = ref(-1)

function rowClass(rowNum: number) {
	if (rowNum == highlightedRow.value) {
		return { 'bg-blue-lighten-5': true }
	}
}

function highlightPaidBy(id: number) {
	highlightedRow.value = computedTimeline.value.findIndex((i) => i.id === id)
}

function getText(event: ContractEvent) {
	return TypeMaps[event.type].text
}

function getValue(event: ContractEvent) {
	const valuePropertyName = TypeMaps[event.type]['property']
	const value = event[valuePropertyName]
	if (value == null) {
		return 'NULL'
	}
	if (valuePropertyName == 'value') {
		return monetary(value)
	} else if (valuePropertyName == 'dueDate') {
		return day(value)
	} else {
		return value
	}
}

</script>

<style scoped>
.tangent-right {
	padding-right: 0;
}

.tangent-left {
	padding-left: 0;
}
</style>