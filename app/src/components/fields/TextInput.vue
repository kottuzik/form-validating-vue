<template>
  <div>
    <label :for="field.id">{{ field.label }}</label>
    <input
        :id="field.id"
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="validate"
    />
    <span v-if="errors" class="error">{{ errors }}</span>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    field: { type: Object, required: true },
    modelValue: { type: String, required: true },
    errors: { type: String, required: false },
  },
  methods: {
    validate() {
      this.$emit('validate', this.field.id, this.modelValue);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>