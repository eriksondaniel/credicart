<template>
  <v-layout row wrap>
    <v-flex md12>
      <v-card flat>
        <v-card-title primary-title>
          <v-layout row wrap>
            <v-flex md6>
              <TextSmall
                sub-title="Valor de vehiculo"
                :title="String(dataCredito.valorVehiculo)"
              />
              <TextSmall
                sub-title="Cuota inicial"
                :title="String(dataCredito.cuotaInicial)"
              />
              <TextSmall
                sub-title="Periodo de gracia"
                :title="String(formatPeriodo(dataCredito.periodoGracia))"
              />
            </v-flex>
            <v-flex md6>
              <TextSmall
                sub-title="Duración"
                :title="String(dataCredito.cuota)"/>
              <TextSmall
                sub-title="Fecha de creación"
                :title="String(formatDate(dataCredito.createdAt))"
            /></v-flex>
          </v-layout>
          <v-spacer></v-spacer>
          <v-btn flat color="red" to="/main">Atras</v-btn>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex v-if="dataCredito == null">
      <h2>Cargando</h2>
    </v-flex>
    <v-flex v-else xs12 sm12 md12>
      <v-card class="table-border" flat>
        <v-data-table :headers="headers" :items="dataCreditoTabla.tabla">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">
              {{ props.item.nuevoSaldo }}
            </td>
            <td class="text-xs-left">{{ props.item.nuevoSaldo3 }}</td>
            <td class="text-xs-left">{{ props.item.interesCuota }}</td>
            <td class="text-xs-left">{{ props.item.amortizacionCuota }}</td>
            <td class="text-xs-left">{{ props.item.cuotaTotal }}</td>
          </template>
          <template slot="no-data">
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios'
import TextSmall from '@/components/TextSmall'

export default {
  layout: 'main',

  components: {
    TextSmall
  },
  data: () => ({
    message: null,
    dialog: false,
    headers: [
      { text: 'SALDO INICIAL', value: 'saldoInicial' },
      { text: 'SALDO FINAL', value: 'saldoFinal' },
      { text: 'INTERES', value: 'interes' },
      { text: 'AMORTIZACIÓN', value: 'Amortización' },
      { text: 'CUOTA', value: 'Cuota' }
    ],
    dataCredito: [],
    dataCreditoTabla: [],
    dataCreditoResult: []
  }),
  computed: {
    loadedEmployees() {
      console.log(this.$store.getters.loadedEmployees)
      return this.$store.getters.loadedEmployees
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    formatPeriodo: date => {
      return date ? 'Otorgado' : 'No torgado'
    },

    formatDate: date => {
      const monthNames = [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'set',
        'pct',
        'nov',
        'dic'
      ]
      const dateobj = new Date(date)
      const day = dateobj.getDate()
      const monthIndex = dateobj.getMonth()
      const year = dateobj.getFullYear()
      const hour = dateobj.getHours()
      const minute = dateobj.getMinutes()
      const min = (minute < 10 ? '0' : '') + minute
      return (
        day +
        ' ' +
        monthNames[monthIndex] +
        ' ' +
        year +
        ' - ' +
        hour +
        ':' +
        min
      )
    },
    initialize() {
      this.fetchCredito()
    },
    async fetchCredito() {
      this.id = this.$route.params.id
      console.log(this.id)
      try {
        const res = await axios.get(process.env.creditosAPI + this.id)
        // this.$store.commit('setRoute', res.data)
        this.dataCredito = res.data
        const resTabla = await axios.post(
          process.env.calculaAPI,
          this.dataCredito
        )
        console.log(resTabla)
        this.dataCreditoTabla = resTabla.data.responseTabla
        console.log(this.dataCreditoTabla)
      } catch (e) {
        return e
      }
    }
  }
}
</script>
