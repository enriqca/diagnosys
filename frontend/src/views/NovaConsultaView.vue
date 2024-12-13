<template>
  <div>
    <div class="w-100 d-flex flex-row-reverse">
      <b-card class="w-75 mr-5" style="height: 70vh">
        <b-container>
          <b-row class="d-flex justify-content-center">
            <h1>Nova consulta</h1>
          </b-row>
          <b-row class="h-100 mh-100 w-100">
            <b-col cols="12">
              <b-form>
                <b-form-row class="mb-3">
                  <b-col cols="6">
                    <b-form-row>
                      <label for="nomePaciente">Paciente:</label>
                    </b-form-row>
                    <b-form-row>
                      <TextInput id="nomePaciente" name="nomePaciente" placeholder="Nome paciente" v-model="registro.nomePaciente" readonly />
                    </b-form-row>
                  </b-col>
                  <b-col cols="2" class="mr-3">
                    <b-form-row>
                      <label for="data">Data:</label>
                    </b-form-row>
                    <b-form-row>
                      <b-form-input id="data" name="data" type="text" v-model="registro.data"  readonly />
                    </b-form-row>
                  </b-col>
                  <b-col cols="3">
                    <b-form-row>
                      <label for="tipoConsulta">Tipo:</label>
                    </b-form-row>
                    <b-form-row>
                      <b-form-select v-model="registro.tipoConsulta" :options="combos.tipoConsulta.itens" class="mb-3"  id="tipoConsulta"/>
                    </b-form-row>
                  </b-col>
                </b-form-row>
                <b-form-row class="mb-3">
                  <b-col cols="12">
                    <b-form-row>
                      <label for="descricao">Descrição</label>
                    </b-form-row>
                    <b-form-row>
                      <b-form-textarea id="descricao" name="descricao" placeholder="Descrição..." rows="4"
                        max-rows="7"  v-model="registro.descricao"/>
                    </b-form-row>
                  </b-col>
                </b-form-row>
                <b-form-row class="d-flex justify-content-center">
                  <b-button variant="info" @click="registrar" id="botaoRegistrar" >REGISTRAR</b-button>
                </b-form-row>
              </b-form>
            </b-col>

          </b-row>
        </b-container>
      </b-card>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/formularios/TextInput.vue';
import Tabela from '@/components/tabela/Tabela.vue';
import { mapState } from 'vuex';
export default {
  name: 'ConsultasView',
  components: { Tabela, TextInput },
  data() {
    return {
      colunas: [
        { key: 'data', label: 'Data', formatter: val => new Date(val).toLocaleDateString('pt-br') },
        { key: "Medico.Pessoa.nome", label: "Médico" },
        { key: 'descricao', label: "Descrição" },
        { key: 'tipo', label: "Tipo" },
        { key: 'icons', label: '' }
      ],
      registro: {
        nomePaciente: '',
        data: new Date().toLocaleDateString('pt-br'),
        tipoConsulta: '',
        descricao: ''
      },
      combos: {
        tipoConsulta: {
          itens: [
            {value: '', text: 'Selecione...'},
            {value: 'consulta', text: 'Consulta'},
            {value: 'retorno', text: 'Retorno'},
          ]
        }
      }
    }
  },
  methods: {
    registrar() {
      const dados = {
        idPessoa: this.$route.query.paciente,
        idMedico: this.user.id,
        data: this.registro.data,
        tipo: this.registro.tipoConsulta,
        descricao: this.registro.descricao
      };

      this.$http.post(`/medico/consulta`, dados).then(res => {
        console.log('res', res);

        this.$router.push({path: '/consultas'});
      });
    }
  },
  mounted() {
    const idPaciente = this.$route.query.paciente;

    this.$http.get(`/usuario/${idPaciente}`).then(res => {
      const dados = res.data;

      console.log(dados)

      this.registro.nomePaciente = dados.Pessoa.nome;
    });
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>