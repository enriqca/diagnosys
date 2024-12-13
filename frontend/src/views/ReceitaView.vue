<template>
  <div>
    <div class="w-100 d-flex flex-row-reverse">
      <b-card class="w-75 mr-5" style="height: 70vh">
        <b-container>
          <b-row class="d-flex justify-content-center">
            <h1>Receitas</h1>
          </b-row>
          <b-row class="h-100 mh-100">
            <Tabela :colunas="colunas" :dados="registros" ordenacaoCampo="id" :totalRegistros="registros.length" />
          </b-row>
        </b-container>
      </b-card>
    </div>
  </div>
</template>

<script>
import Tabela from '@/components/tabela/Tabela.vue';
import {mapState } from 'vuex';
export default {
  name: 'ReceitaView',
  components: { Tabela },
  data() {
    return {
      colunas: [
        { key: 'nome', label: 'Nome'},
        { key: 'descricao', label: "Descrição" },
      ],
      registros: [],

    }
  },
  methods: {},
  mounted() {

    this.$http.get(`/usuario/${this.user.id}/receita`).then(res => {
      const dados = res.data;

      this.registros = dados;
    })
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>