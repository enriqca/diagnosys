<template>
  <b-col sm="6">
    <div class="registros">
      <strong>
        Listando registros de
        {{ primeiro }}
        a
        {{ ultimo }}
        de
        {{ total }}
      </strong>
    </div>
  </b-col>
</template>

<script>
export default {
  name: 'TotalRegistros',
  props: {
    primeiro: { type: Number, required: true },
    ultimo: { type: Number, required: true },
    total: { type: Number, required: true },
  },
};
</script>

<style scoped></style>
