<template>
	<v-card class="w-100">
		<v-card-text>
			<v-row class="justify-space-around">
				<v-list-item v-for="(item, index) in details" :key="index">
					<v-list-item-title class="text-subtitle-1 mb-1">
						{{ item.title }}
					</v-list-item-title>
					<v-list-item-subtitle>{{ item.value }}</v-list-item-subtitle>
				</v-list-item>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
import { Contract } from '@/types/contract'
import { monetary } from '@/utils/Filters'
import { computed, onMounted, reactive } from 'vue'

const props = defineProps<{
	contract: Contract
}>()

const details = computed(() => [
	{ title: 'Aging', value: props.contract.aging },
	{ title: 'Saldo da dívida', value: monetary(props.contract.debtBalance) },
	{ title: 'Acordo', value: 'Quebrado'}
])
</script>

<style scoped>

</style>