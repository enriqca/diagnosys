<template>
  <b-col sm="6">
    <b-pagination v-model="paginaAtual" :total-rows="totalRegistros" :per-page="quantidadePorPagina"
      @change="selecionou" size="sm" align="end"></b-pagination>
  </b-col>
</template>

<script>
export default {
  name: 'Paginacao',
  props: {
    totalRegistros: { type: Number, required: true },
    quantidadePorPagina: { type: Number, required: true },
  },
  data() {
    return {
      paginaAtual: 1,
    };
  },
  methods: {
    selecionou(pagina) {
      this.$emit('selecionou', pagina);
    },
  },
};
</script>

<style scoped></style>
