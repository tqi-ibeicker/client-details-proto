<template>
	<v-container class="fill-height">
		<v-responsive class="text-center fill-height">
			<v-row>
				<v-col cols="12">
					<v-text-field
						v-model="search"
						label="Buscar"
						prepend-inner-icon="mdi-magnify"
						single-line
						variant="outlined"
						hide-details></v-text-field>
				</v-col>
				<v-col v-for="(contract, i) in contractList" :key="contract.contractNumber" cols="3">
					<ContractCard :contract="contract" :selected="i === selectedIndex"
								  @click="contractSelected(contract, i)" />
				</v-col>
			</v-row>
			<v-row v-if="showingContract">
				<v-col cols="12">
					<ContractDetails :contract="showingContract" />
				</v-col>
				<v-col cols="12">
					<ClientTimeline :timeline="timelineComputed" />
				</v-col>
			</v-row>
		</v-responsive>
	</v-container>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import ContractCard from '@/components/ContractCard.vue'
import { contractList, timeline } from '@/mocks/ContractsExamples'
import { Contract, EventType } from '@/types/contract'
import ClientTimeline from '@/components/ClientTimeline.vue'
import ContractDetails from '@/components/ContractDetails.vue'
import TimelineFilter from '@/components/TimelineFilter.vue'

const search = ref(null as string | null)

const selectedIndex = ref<null | number>(null)
const showingContract = ref<null | Contract>(null)

function contractSelected(contract: Contract, index: number) {
	selectedIndex.value = index
	showingContract.value = contract
}

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
	console.log(`setFilter ${value} ${type}`)
	filters[type] = value
	console.log(filters)
	updateTimeline()
}

</script>

<style scoped>

</style>