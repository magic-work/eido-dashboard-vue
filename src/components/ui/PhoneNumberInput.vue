<template>
  <div class="phone-input-container">
    <InputText type="tel" v-model="phoneNumber" @input="formatPhoneNumber" placeholder="(123) 456-7890"/>
  </div>
</template>

<script setup>
import {  computed } from 'vue';
import InputText from 'primevue/inputtext';

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const phoneNumber = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const formatPhoneNumber = (event) => {
  let input = event.target.value.replace(/\D/g, '');
  let formatted = '';

  if (input.length > 0) {
    input = input.substring(0, 10);
    const areaCode = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (input.length < 4) {
      formatted = `(${areaCode}`;
    } else if (input.length < 7) {
      formatted = `(${areaCode}) ${middle}`;
    } else {
      formatted = `(${areaCode}) ${middle}-${last}`;
    }
  }

  event.target.value = formatted;
  phoneNumber.value = formatted;
};
</script>
