<template>
  <form @submit.prevent="handleSubmit">
    <div v-for="field in schema.fields" :key="field.id" class="form-group">
      <component
          :is="getFieldComponent(field)"
          :field="field"
          v-model="formData[field.id]"
          :errors="errors[field.id]"
          @validate="validateField"
      ></component>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import TextInput from './fields/TextInput.vue';
import NumberInput from './fields/NumberInput.vue';
export default {
  name: "DynamicForm",
  components: {
    TextInput,
    NumberInput,
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: this.createFormData(),
      errors: {},
    };
  },
  methods: {
    // Initialize form data
    createFormData() {
      const data = {};
      this.schema.fields.forEach((field) => {
        if (field.type === 'group') {
          data[field.id] = this.createGroupData(field.fields);
        } else {
          data[field.id] = '';
        }
      });
      return data;
    },
    createGroupData(fields) {
      const data = {};
      fields.forEach((field) => {
        data[field.id] = '';
      });
      return data;
    },
    // Map JSON field type to Vue components
    getFieldComponent(field) {
      const componentMap = {
        text: 'TextInput',
        number: 'NumberInput',
        email: 'EmailInput',
        select: 'SelectInput',
        group: 'FieldGroup',
      };
      return componentMap[field.type] || 'div';
    },
    // Validate individual field
    validateField(fieldId, value) {
      const field = this.findFieldById(fieldId);
      if (!field) return;

      let error = '';
      if (field.required && !value) {
        error = `${field.label} is required`;
      } else if (field.validation) {
        if (field.validation.pattern && !new RegExp(field.validation.pattern).test(value)) {
          error = `${field.label} is invalid`;
        }
        if (field.validation.min !== undefined && value < field.validation.min) {
          error = `${field.label} must be at least ${field.validation.min}`;
        }
        if (field.validation.max !== undefined && value > field.validation.max) {
          error = `${field.label} must be less than ${field.validation.max}`;
        }
      }

      this.errors = { ...this.errors, [fieldId]: error };
      return !error;
    },
    findFieldById(id) {
      const find = (fields) => fields.find((field) => field.id === id);
      return find(this.schema.fields) || find(this.schema.fields.flatMap((f) => f.fields || []));
    },
    // Validate and submit the form
    handleSubmit() {
      const isValid = Object.keys(this.formData).every((key) => this.validateField(key, this.formData[key]));
      if (isValid) {
        console.log('Form submitted:', this.formData);
      } else {
        console.error('Form has errors:', this.errors);
      }
    },
  },
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
.error {
  color: red;
  font-size: 0.9em;
}
</style>