<template>
  <div>
    <div class="w-100 d-flex flex-row-reverse">
      <b-card class="w-75 mr-5" style="height: 70vh">
        <b-container>
          <b-row class="d-flex justify-content-center">
            <h1>Consultas</h1>
          </b-row>
          <b-row>
          </b-row>
          <b-row>
            <Tabela class="pre-scrollable" style="max-height: 50vh;" v-if="user.tipo == 'M'" :colunas="colunas"
              :dados="registros" ordenacaoCampo="id" :totalRegistros="registros.length" :novaConsulta="novaConsulta"
              :visualizarReceitas="visualizarReceitas" />
            <Tabela v-else class="pre-scrollable" style="max-height: 50vh;" :colunas="colunas" :dados="registros"
              ordenacaoCampo="id" :totalRegistros="registros.length" />
          </b-row>
        </b-container>
      </b-card>
    </div>
  </div>
</template>

<script>
import Tabela from '@/components/tabela/Tabela.vue';
import { mapState } from 'vuex';
export default {
  name: 'ConsultasView',
  components: {Tabela},
  data() {
    return {
      colunas: [
        {key: 'data', label: 'Data', formatter: val => new Date(val).toLocaleDateString('pt-br')},
        {key: "Medico.Pessoa.nome", label: "Médico"},
        {key: 'descricao', label: "Descrição"},
        { key: 'tipo', label: "Tipo", formatter: val => val.charAt(0).toUpperCase() + val.slice(1) },
        {key: 'icons', label: ''}
      ],
      registros: [],
    }
  },
  methods: {
    novaConsulta(item) {
      this.$router.push({
        path: '/novaConsulta',
        query: {
          paciente: item.id
        }
      });
    },
    visualizarReceitas(item) {
      this.$router.push({
        path: '/receitas',
        query: {
          paciente: item.id
        }
      });
    }
  },
  mounted() {
    let url = '';
    if(this.user.tipo == 'M') {
      url = `/pessoa`;

      this.colunas = [
        {key: 'nome', label: 'Nome'},
        {key: 'cpf', label: 'CPF'},
        {key: 'telefone', label: 'Telefone'},
        {key: 'icons', label: ''}
      ];
    } else {
      url = `/usuario/${this.user.id}/consulta`;
    }

    this.$http.get(url).then(res => {
      const dados = res.data;

      this.registros = dados;
    })
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>