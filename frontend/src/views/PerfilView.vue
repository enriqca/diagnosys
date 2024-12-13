<template>
  <div>
    <div class="w-100 d-flex flex-row-reverse">
      <b-card class="w-75 mr-5" style="height: 70vh">
        <b-container>
          <b-row class="d-flex justify-content-center mb-3">
            <h1>Seu perfil</h1>
          </b-row>
          <b-row class="mb-3">
            <b-col cols="6">
              <TextInput id="nome" name="nome" placeholder="Nome" v-model="nome" />
            </b-col>
            <b-col cols="6">
              <TextInput id="sobrenome" name="sobrenome" placeholder="Sobrenome" v-model="sobrenome" />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col cols="6">
              <TextInput id="cpf" name="cpf" placeholder="CPF" v-model="cpf" />
            </b-col>
            <b-col cols="6">
              <TextInput id="rg" name="rg" placeholder="RG" v-model="rg" />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col cols="6">
              <TextInput id="email" name="email" placeholder="Email" v-model="email" />
            </b-col>
            <b-col cols="6">
              <TextInput id="telefone" name="telefone" placeholder="Telefone" v-model="telefone" />
            </b-col>
          </b-row>
          <b-row class="mb-3 d-flex justify-content-center">
            <b-button variant="info" class="font-weight-bold" @click="salvar">SALVAR</b-button>
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
      nome: "",
      sobrenome: "",
      email: "",
      cpf: "",
      rg: "",
      telefone: ""
    };
  },
  methods: {
    perfil() {
      this.$router.push({
        path: '/perfil'
      })
    },
    salvar() {
      this.$http.put(`/usuario/${this.user.id}`, {nome: this.nome, rg: this.rg, telefone: this.telefone}).then(res => {
        console.log('res', res);
      })
    }
  },
  mounted() {
    this.$http.get(`/usuario/${this.user.id}`).then((res) => {
      console.log("res", res);
      const dados = res.data;

      this.nome = dados.Pessoa.nome;
      this.email = dados.Pessoa.email;  
      this.cpf = dados.Pessoa.cpf;
      this.rg = dados.Pessoa.rg;
      this.telefone = dados.Pessoa.telefone;
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
