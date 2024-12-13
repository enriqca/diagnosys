<template>
    <div>
      <div class="w-100 d-flex flex-row-reverse">
        <b-card class="w-75 mr-5" style="height: 70vh">
          <b-container>
            <b-row class="d-flex justify-content-center mb-3">
              <h1>Editar usuário</h1>
            </b-row>
            <b-row class="mb-3">
            <b-col cols="6">
              <TextInput id="login" name="login" placeholder="login" v-model="login" />
            </b-col>
            <b-col cols="6">
              <TextInput id="senha" name="senha" placeholder="senha" v-model="senha" />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col cols="6">
              <TextInput id="tipo" name="tipo" placeholder="tipo" v-model="tipo" />
            </b-col>
          </b-row>
            <b-row class="mb-3 d-flex justify-content-center">
                <b-button variant="primary" class="font-weight-bold mr-2" @click="retornar">VOLTAR</b-button>
                <b-button variant="info" class="font-weight-bold mr-2" @click="salvar">SALVAR</b-button>
              <b-button variant="danger" class="font-weight-bold" @click="deletar">DELETAR</b-button>
            </b-row>
          </b-container>
        </b-card>
      </div>
    </div>
  </template>
  
  <script>
  import TextInput from '@/components/formularios/TextInput.vue';
  import { mapState } from 'vuex';
  
  export default {
    name: 'PerfilView',
    components: {
      TextInput
    },
    data() {
      return {
        login: '',
        senha: '',
        tipo: '',
      };
    },
    methods: {
      salvar() {
        this.$http.put(`/usuario/${this.$route.query.id}`, {
          login: this.login,
          senha: this.senha,
          tipo: this.tipo
        }).then(res => {
          console.log('Resposta do PUT:', res);
          this.$router.push({
           path: '/gerenciarUsuarios'
        })
        }).catch(error => {
          console.error('Erro ao salvar:', error);
        });
       
      },
      retornar() {
        this.$router.push({
           path: '/gerenciarUsuarios'
        })
      },
      deletar() {
        this.$http.delete(`/usuario/${this.$route.query.id}`, {
        }).then(res => {
          console.log('Resposta do PUT:', res);
          this.$router.push({
           path: '/gerenciarUsuarios'
        })
        }).catch(error => {
          console.error('Erro ao salvar:', error);
        });
      },
    },
    mounted() {
      this.$http.get(`/usuario/${this.$route.query.id}`).then((res) => {
        const dados = res.data;
        this.login = dados.login;
        this.senha = dados.senha;
        this.tipo = dados.tipo;
      }).catch(error => {
        console.error('Erro ao carregar usuário:', error);
      });
    },
    computed: {
      ...mapState(["user"])
    }
  };
  </script>
  
  <style scoped>
  .nav-item {
    border-bottom: 1px solid black;
  }
  </style>
  