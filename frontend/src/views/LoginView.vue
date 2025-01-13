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
            <b-row class="justify-content-center mt-3 p-x-3">
              <img src="/imgs/image_1.png" width="35%" alt="" />
            </b-row>
          </b-col>
          <b-col cols="6">
            <b-row class="justify-content-center mt-3 px-3">
              <h1>Entrar</h1>
            </b-row>
            <b-row class="justify-content-center mt-3">
              <b-form class="w-75">
                <b-form-row class="mb-3">
                  <TextInput id="login" name="login" placeholder="Login" v-model="login" />
                </b-form-row>
                <b-form-row class="mb-3">
                  <TextInput id="senha" name="senha" placeholder="Senha" v-model="senha" />
                </b-form-row>
                <b-form-row>
                  <b-row class="w-100 mb-3">
                    <b-col cols="12">
                      <b-button id="botaoEntrar" class="px-3 w-100" variant="info" @click="entrar">
                        Entrar
                      </b-button>
                    </b-col>
                  </b-row>
                  <b-row class="w-100 mb-3">
                    <b-col cols="12">
                      <b-button id="botaoCadastrar" class="px-3 w-100" variant="outline-secondary" @click="cadastrar">
                        Cadastrar
                      </b-button>
                    </b-col>
                  </b-row>
                </b-form-row>
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


export default {
  components: {
    TextInput,
  },
  data() {
    return {
      login: '',
      senha: ''
    };
  },
  methods: {
    entrar() {
      this.$store
        .dispatch("login", { login: this.login, senha: this.senha })
        .then(() => {
          this.$router.push({path: "/"})
        })
        .catch(err => console.log(err));
    },
    cadastrar(){
      this.$router.push({
        path: '/cadastro'
      })
    }
  },
};
</script>

<style scoped>

#botaoEntrar,
#botaoCadastrar{
  border-radius: 25px;
}
</style>
