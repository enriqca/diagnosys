<template>
  <div>
    <h2>Escolha no calendário ao lado a data.</h2>
    <h1 v-if="data !== null"> Data: {{ formatDate(data) }}</h1>
    <h3 v-if="data !== null"> Horários disponíveis:</h3>
    <div v-if="data !== null" class="grid">
      <button v-for="(hora, index) in horarios" :key="index" :class="{ 'horario': true, 'selected': isSelected(index) }"
        @click="toggleSelected(index)"> {{ hora.hora }}</button>
    </div>
    <div v-if="selectedButtonIndex !== -1" class="button-container">
      <button class="proceed">Prosseguir</button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    data: {
      type: Date,
    }
  },
  setup(props) {
    const horarios = ref([
      { hora: "16:30" },
      { hora: "17:30" },
      { hora: "18:00" }
    ]);
    const selectedButtonIndex = ref(-1);

    watch(() => props.data, (newDate, oldDate) => {
      selectedButtonIndex.value = -1;
    });

    const toggleSelected = (index) => {
      if (selectedButtonIndex.value === index) {
        selectedButtonIndex.value = -1; // Deselect if already selected
      } else {
        selectedButtonIndex.value = index; // Select the clicked button
      }
    };

    const isSelected = (index) => {
      return selectedButtonIndex.value === index;
    };

    const formatDate = (date) => {
      if (!date) return '';
      const d = new Date(date);
      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };

    return {
      horarios,
      formatDate,
      toggleSelected,
      isSelected,
      selectedButtonIndex
    };
  }
};
</script>

<style scoped>
h1 {
  color: #2E2E2E;
  margin-left: 56px;
}

h2 {
  font-weight: 300;
  color: #2E2E2E;
  font-size: 32px;
  margin-left: 56px;
  margin-top: 32px;
}

h3 {
  color: #2E2E2E;
  margin-left: 56px;
  margin-top: 16px;
  font-size: 48px;
}

.grid{
  display: grid;
  margin-left: 32px;
  grid-template-columns: repeat(6, minmax(32px, 1fr));
  max-height: 254px;
  min-height: 254px;
  overflow:auto;
}

.horario{
  font-size: 36px;
  color: #2E2E2E;
  border-radius: 25px;
  background-color: transparent;
  height: 64px;
  width: 128px;
}
.selected{
  color: #FBF9FF;
  background-color: #2E2E2E;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 35px;
  margin-right:  36px;
}

.proceed{
  color: #2E2E2E;
  background-color: #63BCF8;
  border: none;
  font-size: 36px;
  width: 264px;
  height: 64px;
  border-radius: 50px;
  right: 0;
  cursor: pointer;
}

</style>