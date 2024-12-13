<template>
  <div>
    <div class="w-100 d-flex justify-content-center">
      <b-card class="w-100 mr-10" style="height: 70vh" aling="center">
        <b-container class="mt-4">
          <h1 class="text-left">Agende sua consulta!</h1>
          <b-row class="mt-4">
            <b-col cols="10">
              <TextInput id="pesquisaMedico" name="pesquisaMedico" placeholder="Pesquisar..."
                v-model="pesquisaMedico" />
            </b-col>
            <b-col cols="2">
              <b-button class="btn" variant='info' @click="pesquisarMedico" id="botaoPesquisarMedico">PESQUISAR</b-button>
            </b-col>
          </b-row>
          <b-row class="h-100 mh-100 mt-4">
            <b-col v-for="medico in registros" :key="medico.id" cols="12" md="6" lg="4" class="mb-4">
              <b-card class="medico-card">
                <h5 class="medico-nome">{{ medico.Pessoa.nome }}</h5>
                <p class="medico-info"><strong>CRM:</strong>{{ medico.crm }}</p>
                <p class="medico-info"><strong>Telefone:</strong> {{ medico.Pessoa.telefone }}</p>
                <p class="medico-info"><strong>Email:</strong> {{ medico.Pessoa.email }}</p>
              </b-card>
            </b-col>
            <b-col v-if="registros.length === 0" cols="12" class="text-left">
              <p>Nenhum médico encontrado.</p>
            </b-col>
          </b-row>
        </b-container>
      </b-card>
    </div>
  </div>
</template>



<script>
import Tabela from '@/components/tabela/Tabela.vue';
import TextInput from '@/components/formularios/TextInput.vue';
import {BIconPencilSquare} from "bootstrap-vue";

export default {
  name: 'HomeView',
  components: {
    Tabela, TextInput, BIconPencilSquare
  },
  data() {
    return {
      registros: [],
      nome: "",
      colunas: [
        { key: 'Pessoa.nome', label: 'Nome' },
        { key: 'crm', label: 'CRM' },
        { key: 'Pessoa.email', label: 'Email'},
        { key: 'Pessoa.telefone', label: 'Telefone'},
      ],
      pesquisaMedico: ''
    };
  },
  mounted() {
    this.$http.get(`/medico`).then(res => {
      this.registros = res.data;
    })
  },
  methods: {
    pesquisarMedico() {
      this.$http.get(`/medico/${this.pesquisaMedico}/busca`).then((res) => {
        console.log('res filtro', res.data);
        this.registros = res.data;
      });
    },
  },
};
</script>

<style scoped>
.nav-item {
  border-bottom: 1px solid black;
}

.medico-card {
  padding: 1rem;
  border: 2px solid #dee2e6;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.medico-nome {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.medico-info {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>
