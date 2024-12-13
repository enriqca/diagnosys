<template>
  <b-card class="resultado w-100 mt-3">
    <!-- <QuantidadePagina v-if="selecionarQuantidade" @selecionou="selecionarQuantidadePagina"
      :quantidadePorPagina="quantidadePorPagina" v-show="exibir" /> -->
    <b-table :items="dados" :fields="colunas" :per-page="porPagina" :current-page="paginaAtual"
      @sort-changed="mudarOrdenacao" striped responsive hover v-show="exibir" :no-local-sorting="!emMemoria"
      :sort-by="ordenacaoCampo" :sort-desc="ordenacaoDesc" @row-clicked="handleRowClick">
      <template v-slot:head(selecionadoMassa)="data">
        <span>
          <b-form-checkbox name="selecionarTodos" v-model="selecionarTodosCheckbox" @change="selecionarTodos($event)" />
          {{ data.label ? data.label : 'Selecionar Todos' }}
          <b-form-checkbox style="display: none" name="selecionarTodosTrue" @input="selecionarTodosTrue()" />
        </span>
      </template>
      <template v-slot:cell(selecionado)="data">
        <b-form-radio name="selecionar" v-model="selecionadoLocal" v-if="desabilitaRadioButton ? true : false"
          :value="data.item" @change="quandoSelecionar(data.item)"> </b-form-radio>
      </template>
      <template v-slot:cell(selecionadoMassa)="data">
        <b-form-checkbox name="selecionar" v-model="registrosSelecionadosLocal"
          v-if="desabilitaCheckbox.length > 0 ? verificaCheckbox(data.item) : true" :value="data.item" @change="emitir">
        </b-form-checkbox>
      </template>
      <template #cell(icons)="data">
        <b-row class="d-flex flex-nowrap">
          <b-button variant="link" type="button" class="text-decoration-none botaoNovaConsulta"
            v-if="exibirBotaoNovaConsulta" @click="novaConsulta(data.item)">
            <b-icon icon="plus-circle" class="text-success" />
          </b-button>
          <b-button variant="link" type="button" class="text-decoration-none botaoVisualizarReceita"
            v-if="exibirBotaoVisualizarReceitas" @click="visualizarReceitas(data.item)">
            <b-icon icon="file-earmark-text" class="text-success" />
          </b-button>
        </b-row>
      </template>
    </b-table>
    <!-- PAGINACAO -->
    <!-- <b-row v-show="exibir" v-if="exibirPaginacao">
      <TotalRegistros :primeiro="mostrandoRegistros().primeiro" :ultimo="mostrandoRegistros().ultimo"
        :total="mostrandoRegistros().total" />
      <Paginacao :totalRegistros="quantidadeTotalRegistros" :quantidadePorPagina="quantidadePorPagina"
        @selecionou="selecionarPagina" />
    </b-row> -->
  </b-card>
</template>

<script>
import Paginacao from '@/components/tabela/Paginacao.vue';
import QuantidadePagina from '@/components/tabela/QuantidadePagina.vue';
import TotalRegistros from '@/components/tabela/TotalRegistros.vue';
import { BIconPlusCircle, BIconFileEarmarkText } from "bootstrap-vue";

export default {
  name: 'Tabela',
  components: {
    QuantidadePagina,
    Paginacao,
    TotalRegistros,
    BIconPlusCircle,
    BIconFileEarmarkText
  },
  props: {
    emMemoria: { type: Boolean, default: false },
    dados: {
      type: Array,
      default: () => {
        return [];
      },
      required: true,
    },
    colunas: {
      type: Array,
      default: () => {
        return [];
      },
      required: true,
    },
    totalRegistros: { type: Number, required: false, default: 0 },
    ordenacaoCampo: { type: String, required: true },
    ordenacaoDesc: { type: Boolean, default: false },
    paginaAtual: { type: Number, default: 1 },
    quantidadePorPagina: { type: Number, default: 5 },
    exibirExpansao: { type: Boolean, default: true },
    selecionarQuantidade: { type: Boolean, default: true },
    editar: { type: Function },
    permissaoEditar: { type: String, default: '' },
    visualizar: { type: Function },
    download: { type: Function },
    permissaoVisualizar: { type: String, default: '' },
    excluir: { type: Function },
    permissaoExcluir: { type: String, default: '' },
    registrosSelecionados: { type: Array, default: () => [] },
    exibirPaginacao: { type: Boolean, default: true },
    desabilitaCheckbox: { type: Array, default: () => [] },
    desabilitaRadioButton: { type: Boolean, default: true },
    inicializaMarcado: { type: Boolean, default: false },
    sempreVisivel: { type: Boolean, default: false },
    selecionado: { type: Object },
    novaConsulta: {type: Function},
    visualizarReceitas: {type: Function},
  },
  data() {
    return {
      selecionarTodosCheckbox: false,
      registrosSelecionadosLocal: this.registrosSelecionados,
      paginaAtualLocal: 1,
      quantidadePorPaginaLocal: this.quantidadePorPagina,
      ordenacaoCampoLocal: this.ordenacaoCampo,
      ordenacaoDescLocal: this.ordenacaoDesc,
      exibir: true,
      selecionadoLocal: {},
    };
  },
  computed: {
    collapsed() {
      return this.exibir ? 'collapsed' : '';
    },
    quantidadeTotalRegistros() {
      return this.emMemoria ? this.dados.length : this.totalRegistros;
    },
    porPagina() {
      return this.emMemoria ? this.quantidadePorPagina : 0;
    },
    exibirBotaoNovaConsulta() {
      return typeof this.novaConsulta !== 'undefined';
    },
    exibirBotaoVisualizarReceitas() {
      return typeof this.visualizarReceitas !== 'undefined';
    }
  },
  methods: {
    limparSelecionarTodos() {
      this.selecionarTodosCheckbox = false;
      this.registrosSelecionadosLocal = [];
      this.$emit('selecionouCheckbox', this.registrosSelecionadosLocal);
    },
    selecionarTodos(todos) {
      if (todos) {
        this.registrosSelecionadosLocal = this.dados;
        this.$emit('selecionouCheckbox', this.registrosSelecionadosLocal);
        this.$emit('selecionouTodos', true);
      } else {
        this.registrosSelecionadosLocal = [];
        this.$emit('selecionouCheckbox', this.registrosSelecionadosLocal);
        this.$emit('selecionouTodos', false);
      }
    },
    selecionarTodosTrue() {
      this.selecionarTodosCheckbox = true;
      this.selecionarTodos(true);
    },
    emitir() {
      this.$emit('selecionouCheckbox', this.registrosSelecionadosLocal);
    },
    quandoSelecionar(item) {
      this.selecionadoLocal = item;
      this.$emit('selecionouRadio', this.selecionadoLocal);
    },
    mostrandoRegistros() {
      return {
        primeiro: this.dados.length ? (this.paginaAtual - 1) * this.quantidadePorPagina + 1 : 0,
        ultimo:
          (this.paginaAtual - 1) * this.quantidadePorPagina + this.quantidadePorPagina >= this.quantidadeTotalRegistros
            ? this.quantidadeTotalRegistros
            : (this.paginaAtual - 1) * this.quantidadePorPagina + this.quantidadePorPagina,
        total: this.quantidadeTotalRegistros,
      };
    },
    handleRowClick(item) {
      this.$emit('linha-clicada', item);
    },
    selecionarQuantidadePagina(event) {
      this.quantidadePorPaginaLocal = event;
      this.paginaAtualLocal = 1;
      this.executouMudanca();
    },
    selecionarPagina(pagina) {
      this.paginaAtualLocal = pagina;
      this.executouMudanca();
    },
    mudarOrdenacao(contexto) {
      if (contexto.sortBy) {
        this.ordenacaoCampoLocal = contexto.sortBy;
        this.ordenacaoDescLocal = contexto.sortDesc;
      } else {
        this.ordenacaoCampoLocal = this.ordenacaoCampo;
        this.ordenacaoDescLocal = this.ordenacaoDesc;
      }
      this.executouMudanca();
    },
    executouMudanca() {
      this.selecionarTodosCheckbox = false;
      //this.selecionarTodos(this.selecionarTodosCheckbox);
      this.$emit('mudou', {
        paginaAtual: this.paginaAtualLocal,
        quantidadePorPagina: this.quantidadePorPaginaLocal,
        ordenacaoCampo: this.ordenacaoCampoLocal,
        ordenacaoDesc: this.ordenacaoDescLocal,
        registrosSelecionados: this.registrosSelecionadosLocal,
      });
    },
    verificaCheckbox(item) {
      const verificacoes = [];
      for (const verificacao of this.desabilitaCheckbox) {
        if (typeof verificacao === 'string') {
          verificacoes.push(!!item[verificacao]);
        } else if (typeof verificacao === 'function') {
          verificacoes.push(verificacao(item));
        }
      }

      return !verificacoes.includes(true);
    },
  },
  watch: {},
  mounted() {
    if (this.inicializaMarcado) {
      this.selecionarTodosCheckbox = true;
      this.selecionarTodos(this.dados);
    }

    this.selecionadoLocal = this.selecionado;
  },
  updated() {
    this.registrosSelecionadosLocal = this.registrosSelecionados;
    if (this.quantidadeTotalRegistros == 1 && this.dados.length == 1) {
      this.quandoSelecionar(this.dados[0]);
    } else {
      this.selecionadoLocal = {};
    }
  },
};
</script>

<style scoped></style>
