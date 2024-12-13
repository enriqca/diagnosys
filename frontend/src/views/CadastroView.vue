<template>
  <div class="d-flex align-items-center justify-content-center" style="min-height: 100vh;">
    <b-container>
      <b-card style="height: 80vh">
        <b-row>
          <b-col cols="6">
            <b-row class="justify-content-center mt-3 p-x-3">
              <h1>Diagnosys</h1>
            </b-row>
            <b-row class="mt-3">
              <p>
                Bem-vindo ao Sistema de Gestão de Consultas e Receitas Médicas!
              </p>
              <p>
                Nosso aplicativo foi desenvolvido especialmente para facilitar o
                agendamento e gerenciamento de consultas médicas, tanto para
                pacientes quanto para médicos. Com uma interface intuitiva e
                recursos avançados, oferecemos uma solução completa para atender
                às suas necessidades de saúde.
              </p>
            </b-row>
            <b-row class="bg-alert">
              <img src="/imgs/image_1.png" width="100%" height="100%" alt="" />
            </b-row>
          </b-col>
          <b-col cols="6">
            <b-row class="justify-content-center mt-3 px-3">
              <h1>Cadastro</h1>
            </b-row>
            <b-row class="justify-content-center mt-3">
              <b-form class="w-75">
                <div v-if="etapa == 1">
                  <b-form-row class="mb-3">
                    <TextInput placeholder="Nome" id="nome" name="nome" v-model="nome" />
                  </b-form-row>
                  <b-form-row class="mb-3">
                    <TextInput placeholder="RG" id="rg" name="rg" v-model="rg" />
                  </b-form-row>
                  <b-form-row class="mb-3">
                    <TextInput placeholder="CPF" id="cpf" name="cpf" v-model="cpf" />
                  </b-form-row>
                  <b-form-row class="mb-3">
                    <TextInput id="email" name="email" placeholder="Email" v-model="email" />
                  </b-form-row>
                  <b-form-row>
                    <b-col cols="6">
                      <b-row class="w-100 d-flex justify-content-center">
                        <b-button id="botaoConfirmar" class="px-3" variant="outline-secondary" @click="cancelar"> 
                          Cancelar
                        </b-button>
                      </b-row>
                    </b-col>
                    <b-col cols="6">
                      <b-row class="w-100 d-flex justify-content-center">
                        <b-button id="botaoProsseguir" class="px-3" variant="info" @click="prosseguir">
                          Prosseguir
                        </b-button>
                      </b-row>
                    </b-col>
                  </b-form-row>
                </div>
                <div v-if="etapa == 2">
                  <b-form-row class="mb-3">
                    <TextInput id="login" name="login" placeholder="Login" v-model="login" />
                  </b-form-row>
                  <b-form-row class="mb-3">
                    <TextInput id="senha" name="senha" placeholder="Senha" v-model="senha" />
                  </b-form-row>
                  <b-form-row class="mb-3">
                    <TextInput id="confirmarSenha" name="confirmarSenha" placeholder="Confirmar senha" v-model="confirmaSenha" />
                  </b-form-row>
                  <b-form-row>
                    <b-col cols="6">
                      <b-row class="w-100 d-flex justify-content-center">
                        <b-button id="botaoRetornar" class="px-3" variant="outline-secondary" @click="retornar">
                          Retornar
                        </b-button>
                      </b-row>
                    </b-col>
                    <b-col cols="6">
                      <b-row class="w-100 d-flex justify-content-center">
                        <b-button id="botaoCadastrar" class="px-3" variant="info" @click="cadastrar">
                          Cadastrar
                        </b-button>
                      </b-row>
                    </b-col>
                  </b-form-row>
                </div>
              </b-form>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import TextInput from "@/components/formularios/TextInput.vue";
import axios from 'axios';

export default {
  components: {
    TextInput,
  },
  data() {
    return {
      etapa: 1,
      nome: "",
      rg: "",
      cpf: "",
      genero: "",
      telefone: "",
      email: "",
      login: "",
      senha: "",
      confirmaSenha: ""
    };
  },
  computed: {
    dadosPreenchidos() {
      return (
        this.nome !== "" &&
        this.sobrenome !== "" &&
        this.cpf !== ""
      );
    },
    dadosPreenchidos2() {
      return (
        this.email !== "" &&
        this.senha !== "" &&
        this.confirmarSenha !== ""
      );
    },
  },
  methods: {
    prosseguir() {
      if (this.dadosPreenchidos) {
        this.etapa = 2;
      } else {
        alert("Preencha todos os campos obrigatórios.");
      }
    },
    retornar() {
      this.etapa = 1;
    },
    cancelar(){
      this.$router.push("/login")
    },
    cadastrar() {
      this.$store
        .dispatch("register", { nome: this.nome, cpf: this.cpf, email: this.email, senha: this.senha, rg: this.rg, telefone: this.telefone, login: this.login })
        .then(() => {
          this.$router.push("/login")
        })
        .catch(err => console.log(err));
        
      // this.$http.post('/register', {nome: this.nome, cpf: this.cpf, email: this.email, senha: this.senha, rg: this.rg, telefone: this.telefone, login: this.login}).then(res => {
      //   console.log('res', res);
      // })
    },
    async cadastrarUsuario() {
      try {
        const response = await axios.post('http://localhost:3000/usuario', {
          nome: this.nome,
          sobrenome: this.sobrenome,
          cpf: this.cpf,
          genero: this.genero,
          login: this.email,
          email: this.email,
          senha: this.senha,
          idPessoa: Math.floor(Math.random() * 1000000) + 1
        });

        console.log('Cadastro realizado com sucesso:', response.data);
        this.$router.push({
        path: "/login",
      });
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
      }
      
    },
  },
};
</script>

<style scoped>
#botaoConfirmar,
#botaoProsseguir,
#botaoRetornar 
 {
  border-radius: 50px;
}

</style>
