<template>
  <b-row class="numero-de-linhas">
    <b-col cols="12" class="text-right" style="white-space: nowrap">
      Exibir &nbsp;
      <b-form-select class="col-1" size="sm" v-model="quantidadePorPaginaLocal" @change="selecionou" :options="[
        { value: 5, text: '5' },
        { value: 10, text: '10' },
        { value: 20, text: '20' },
      ]"></b-form-select>
      &nbsp; linhas
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'QuantidadePagina',
  props: {
    quantidadePorPagina: { type: Number, required: false, default: 5 },
  },
  data() {
    return {
      quantidadePorPaginaLocal: this.quantidadePorPagina,
    };
  },
  methods: {
    selecionou(event) {
      this.quantidadePorPaginaLocal = event
      this.$emit('selecionou', this.quantidadePorPaginaLocal);
    },
  }
};
</script>

<style scoped></style>
