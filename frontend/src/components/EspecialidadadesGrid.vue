<template>
  <div class="grid">
    <button
      v-for="(especialidade, index) in especialidades"
      :key="index"
      class="especialidade"
      @click="emitDescricao(especialidade.descricao)"
    >
      <img src="../assets/iconEspecialidade.png" class="icon">
      {{ especialidade.descricao }}
    </button>
  </div>
</template>


  <script>
  export default {
    props: {
      especialidades: {
        type: Array,
        required: true
      }
    },
    methods: {
    emitDescricao(descricao) {
      this.$emit('opcao-selecionada', descricao);
    }
  }
  }
  </script>
  
  <style scoped>
.grid {
  margin-left: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr)); 
  gap: 8px;
  margin-bottom: 8px;
}

.especialidade{
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background-color: #9FD1C2;
  width: 225px;
  height: 215px;
  border-radius: 25px;
  font-size: 22px;
  cursor: pointer;
}


.icon{
  margin-top: 4px;
  margin-bottom:  2px;
}
  </style>
  