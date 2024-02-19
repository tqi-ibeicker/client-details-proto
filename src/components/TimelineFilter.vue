<template>
	<v-row>
		<v-col
			cols="3"
			sm="3"
			md="3"
		>
			<v-checkbox
				v-model="showIndebted"
				hide-details
				@change="checked($event, 'indebtedRemove')"
			>
				<template #label>
					<v-icon icon="mdi-circle-multiple-outline"></v-icon>
					Inadimplência
				</template>
			</v-checkbox>
		</v-col>
		<v-col
			cols="3"
			sm="3"
			md="3"
		>
			<v-checkbox
				v-model="showRuler"
				hide-details
				@change="checked($event, 'ruler')"
			>
				<template #label>
					<v-icon icon="mdi-ruler"></v-icon>
					Régua
				</template>
			</v-checkbox>
		</v-col>
		<v-col
			cols="3"
			sm="3"
			md="3"
		>
			<v-checkbox
				v-model="showAgreement"
				hide-details
				@change="checked($event, 'agreement')"
			>
				<template #label>
					<v-icon icon="mdi-check-outline"></v-icon>
					Acordo
				</template>
			</v-checkbox>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">

import { ref } from 'vue'

const showIndebted = ref(true)
const showRuler = ref(true)
const showAgreement = ref(true)

const emit = defineEmits(['checked'])

function checked(event: any, type: string) {
	if (type == 'indebtedRemove') {
		emit('checked', event.target.checked, 'indebtedAdd')
	}
	emit('checked', event.target.checked, type)
}
</script>

<style scoped>

</style>