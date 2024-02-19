<template>
	<v-card
		class="mx-auto"
		width="200"
		:color="color"
		:variant="variant"
	>
		<template v-slot:title>
			{{ contract.contractNumber }}
		</template>

		<v-card-text>
			<span :class="{ 'text-error': props.contract.indebted }">{{ contract.status }}</span>
			<br>
			<span>{{ contract.product }}</span>
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Contract } from '@/types/contract'

const props = defineProps<{ contract: Contract, selected: boolean }>()

const color = computed(() => props.selected ? 'primary' : 'none')
const variant = computed(() => props.selected ? 'outlined' : 'elevated')
</script>

<style scoped>

</style>