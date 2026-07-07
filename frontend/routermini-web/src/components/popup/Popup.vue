<template>
  <div v-if="modelValue" class="modal-overlay">
    <section class="modal-card">
      <h2>Dados do veículo</h2>
      <p class="subtitle">Informe o veículo que fará esta rota.</p>

      <label>
        Placa
        <input v-model="plate" type="text" placeholder="ABC1D23" />
      </label>

      <label>
        Marca
        <input v-model="brand" type="text" placeholder="Toyota" />
      </label>

      <label>
        Modelo
        <input v-model="model" type="text" placeholder="Corolla" />
      </label>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <div class="modal-actions">
        <button type="button" class="cancel-button" @click="close">
          Cancelar
        </button>

        <button type="button" @click="confirm">
          Salvar viagem
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';

    const props = defineProps<{
        modelValue: boolean;
    }>();

    const emit = defineEmits<{
    'update:modelValue': [value: boolean];
    confirm: [
        vehicle: {
            plate: string;
            brand: string;
            model: string;
        },
    ];
    }>();

    const plate = ref('');
    const brand = ref('');
    const model = ref('');
    const errorMessage = ref('');

    watch(() => props.modelValue,
        (isOpen) => {
            if (isOpen) {
                errorMessage.value = '';
            }
        },
    );

    function close() {
        emit('update:modelValue', false);
    }

    function confirm() {

        errorMessage.value = '';

        if (!plate.value.trim() || !brand.value.trim() || !model.value.trim()) {
            errorMessage.value = 'Informe placa, marca e modelo.';
            return;
        }

        emit('confirm', {
            plate: plate.value.trim().toUpperCase(),
            brand: brand.value.trim(),
            model: model.value.trim(),
        });

        plate.value = '';
        brand.value = '';
        model.value = '';
    }
</script>


<style scoped>
    .modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 1000;
        background: rgba(15, 23, 42, 0.65);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
    }

    .modal-card {
        width: min(460px, 100%);
        background: white;
        border-radius: 20px;
        padding: 28px;
        box-shadow: 0 24px 60px rgba(15, 23, 42, 0.25);
        display: grid;
        gap: 16px;
    }

    .modal-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
    }

    .cancel-button {
        background: #64748b;
    }

    .cancel-button:hover {
        background: #475569;
    }
    
</style>