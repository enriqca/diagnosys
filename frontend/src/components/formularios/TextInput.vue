<template>
  <b-row class="w-100">
    <b-col cols="12" md="12">
      <b-form-input
        :type="inputType"
        v-model="text"
        :id="id"
        :name="name"
        :maxlength="length"
        :placeholder="placeholder ? placeholder : ''"
        :readonly="readonly"
        :lazy="lazy || false"
        :state="valid"
        :formatter="formatter"
        :autocomplete="autocomplete"
      ></b-form-input>
      <b-form-invalid-feedback :id="id" v-if="!valid">
        {{ invalidText }}
      </b-form-invalid-feedback>
      <div class="d-flex justify-content-between">
        <b-form-text inline :id="id" v-if="helperText">
          {{ helperText }}
        </b-form-text>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "TextInput",
  data() {
    return {
      text: "",
      inputType: "text", // Default to text input
      autocomplete: "on", // Default to enable autocomplete
    };
  },
  watch: {
    text() {
      this.$emit("input", this.text);
    },
    value() {
      this.text = this.value;
    },
    passwordInput(newValue) {
      // Update input type based on passwordInput prop change
      this.inputType = newValue ? "password" : "text";
      // Update autocomplete attribute to 'off' for password input
      this.autocomplete = newValue ? "off" : "on";
    },
  },
  updated() {
    this.text = this.value;
  },
  created() {
    this.text = this.value;
    // Determine initial input type based on props
    this.inputType = this.passwordInput ? "password" : "text";
    // Set initial autocomplete attribute
    this.autocomplete = this.passwordInput ? "off" : "on";
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    helperText: {
      type: String,
    },
    length: {
      type: String,
    },
    required: {
      type: Boolean,
    },
    placeholder: {
      type: String,
    },
    readonly: {
      type: Boolean,
    },
    value: {
      type: [String, Number],
    },
    lazy: {
      type: Boolean,
    },
    invalid: {
      type: Boolean,
    },
    invalidText: {
      type: String,
    },
    valid: {
      type: Boolean,
      default: null,
    },
    formatter: {
      type: Function,
      default: (val) => val,
    },
    passwordInput: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
