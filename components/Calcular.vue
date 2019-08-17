<template>
  <v-flex md12>
    <v-card flat class="transparent">
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid">
            <v-layout wrap>
              <v-flex xs12 sm6 md3>
                <v-text-field
                  v-model="editedItem.valorVehiculo"
                  :rules="rules.valorVehiculo"
                  :counter="7"
                  min="0"
                  label="Valor Vehiculo"
                  type="number"
                  hint="At least 7 characters"
                  outline
                />
              </v-flex>
              <v-flex xs12 sm6 md3>
                <!-- <v-text-field
                  v-model="editedItem.cuotaInicial"
                  :rules="rules.cuotaInicial"
                  :counter="10"
                  min="0"
                  type="number"
                  label="Cuota Inicial"
                  hint="At least 10 characters"
                  outline
                />-->
                <v-select
                  v-model="editedItem.cuotaInicial"
                  :items="itemsCuotaInicial"
                  :rules="rules.cuotaInicial"
                  item-value="cuotaInicial"
                  item-text="cuotaInicial"
                  label="Cuota Inicial %"
                  required
                  outline
                />
              </v-flex>
              <v-flex xs12 sm6 md2>
                <v-select
                  v-model="editedItem.moneda"
                  :items="itemsMoneda"
                  :rules="rules.moneda"
                  item-value="moneda"
                  item-text="moneda"
                  label="Moneda"
                  required
                  outline
                />
              </v-flex>
              <v-flex xs12 sm6 md2>
                <v-select
                  v-model="editedItem.cuota"
                  :items="itemsCuota"
                  :rules="rules.cuota"
                  item-value="cuota"
                  item-text="cuota"
                  label="Cuotas"
                  required
                  outline
                />
              </v-flex>
              <v-flex xs12 sm6 md2>
                <v-select
                  v-model="editedItem.tasa"
                  :items="itemsTasa"
                  :rules="rules.tasa"
                  item-value="tasa"
                  item-text="tasa"
                  label="Tasas"
                  required
                  outline
                />
              </v-flex>
              <v-flex xs12 sm6 md2>
                <v-select
                  v-model="editedItem.tipoSeguroVehicular"
                  :items="itemsTipoSeguroVehicular"
                  :rules="rules.tipoSeguroVehicular"
                  item-value="tipoSeguroVehicular"
                  item-text="tipoSeguroVehicular"
                  label="Tipo Seguro Vehicular"
                  required
                  outline
                />
              </v-flex>
              <v-flex xs12 sm6 md2>
                <v-text-field
                  v-model="editedItem.costoOportunidad"
                  :rules="rules.costoOportunidad"
                  :counter="2"
                  min="0"
                  max="40"
                  type="number"
                  label="COK %"
                  hint="At least 2 characters"
                  outline
                />
              </v-flex>
              <v-flex xs12 sm6 md2>
                <v-switch
                  v-model="editedItem.periodoGracia"
                  label="Periodo de gracia"
                />
              </v-flex>
              <v-flex v-if="editedItem.periodoGracia" xs12 sm6 md2>
                <v-select
                  v-model="editedItem.tipoPeriodoGracia"
                  :items="itemsTipoPeriodoGracia"
                  :rules="rules.tipoPeriodoGracia"
                  item-value="tipoPeriodoGracia"
                  item-text="tipoPeriodoGracia"
                  label="Tipo Periodo Gracia"
                  required
                  outline
                />
              </v-flex>
              <v-flex v-if="editedItem.periodoGracia" xs12 sm6 md2>
                <v-text-field
                  v-model="editedItem.cuotaIPG"
                  :rules="rules.cuotaIPG"
                  :counter="10"
                  min="1"
                  :max="editedItem.cuota"
                  label="Cuota Inicial Periodo Gracia"
                  type="number"
                  hint="At least 10 characters"
                  outline
                />
              </v-flex>
              <v-flex v-if="editedItem.periodoGracia" xs12 sm6 md2>
                <v-text-field
                  v-model="editedItem.cuotaFPG"
                  :rules="rules.cuotaFPG"
                  :counter="10"
                  :min="editedItem.cuotaIPG"
                  :max="editedItem.cuota"
                  label="Cuota Final Periodo Gracia"
                  type="number"
                  hint="At least 10 characters"
                  outline
                />
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!valid" flat block color="accent" @click="save"
          >Calcular</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-flex v-if="response != null" md12>
      <v-card class="table-border" flat>
        <v-data-table :headers="headers" :items="tabla">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.nuevoSaldo }}</td>
            <td class="text-xs-left">{{ props.item.saldoMostrar }}</td>
            <td class="text-xs-left">{{ props.item.interesCuota }}</td>
            <td class="text-xs-left">{{ props.item.amortizacionCuota }}</td>
            <td class="text-xs-left">{{ props.item.cuotaTotal }}</td>
            <td class="text-xs-left">{{ props.item.van }}</td>
          </template>
          <template slot="no-data">
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
        <!-- <v-data-table :items="finalTabla">
          <template >
            <td class="text-xs-left">{{ finalTabla.nuevoSaldo }}</td>
            <td class="text-xs-left">{{ finalTabla.saldoMostrar }}</td>
            <td class="text-xs-left">{{ props.item.interesCuota }}</td>
            <td class="text-xs-left">{{ props.item.amortizacionCuota }}</td>
            <td class="text-xs-left">{{ props.item.cuotaTotal }}</td>
            <td class="text-xs-left">{{ props.item.van }}</td>
          </template>
        </v-data-table>-->
      </v-card>
    </v-flex>
  </v-flex>
</template>
<script>
import axios from 'axios'

export default {
  data: () => ({
    message: null,
    search: '',
    dialog: false,
    headers: [
      { text: 'SALDO INICIAL', value: 'saldoInicial' },
      { text: 'SALDO FINAL', value: 'saldoFinal' },
      { text: 'INTERES', value: 'interes' },
      { text: 'AMORTIZACIÓN', value: 'Amortización' },
      { text: 'CUOTA', value: 'Cuota' },
      { text: 'VAN', value: 'van' }
    ],
    itemsCuotaInicial: [15, 20, 25, 30],
    itemsMoneda: ['Soles', 'Dolares'],
    itemsCuota: [6, 12, 18, 24, 36],
    itemsTasa: ['TEA', 'TNA'],
    itemsTipoSeguroVehicular: ['Alto riesgo', 'Medio riesgo', 'Bajo riesgo'],
    itemsTipoPeriodoGracia: ['Total', 'Parcial'],

    editedItem: {
      valorVehiculo: '',
      cuotaInicial: '',
      moneda: '',
      cuota: '',
      tasa: '',
      tipoSeguroVehicular: '',
      costoOportunidad: '',
      periodoGracia: false,
      tipoPeriodoGracia: '',
      cuotaIPG: 0,
      cuotaFPG: 0,

      clienteId: null
    },
    defaultItem: {
      valorVehiculo: '',
      cuotaInicial: '',
      moneda: '',
      cuota: '',
      tasa: '',
      tipoSeguroVehicular: '',
      costoOportunidad: '',
      periodoGracia: false,
      tipoPeriodoGracia: '',
      cuotaIPG: 0,
      cuotaFPG: 0,
      clienteId: null
    },
    valid: true,
    rules: {
      valorVehiculo: [
        v => !!v || 'Se requiere el valor del vehiculo',
        v =>
          (v && v.length <= 7) ||
          'El valor del vehiculo debe tener menos de 10 caracteres',
        v => v >= 1 || 'El valor del vehiculo debe tener menos de 10 caracteres'
      ],

      cuotaInicial: [v => !!v || 'Item is required'],

      moneda: [v => !!v || 'Item is required'],
      cuota: [v => !!v || 'Item is required'],
      tasa: [v => !!v || 'Item is required'],
      tipoSeguroVehicular: [v => !!v || 'Item is required'],
      costoOportunidad: [
        v => !!v || 'Se requiere el periodo de gracia',
        v =>
          (v && v.length <= 2) ||
          'El periodo de gracia debe tener menos de 10 caracteres',
        v => v >= 1 || 'El periodo de gracia debe tener menos de 10 caracteres'
      ],

      tipoPeriodoGracia: [v => !!v || 'Item is required'],
      cuotaIPG: [
        v => !!v || 'Se requiere la cuota inicial',
        v =>
          (v && v.length <= 10) ||
          'La cuota inicial debe tener menos de 10 caracteres'
      ],
      cuotaFPG: [
        v => !!v || 'Se requiere la cuota inicial',
        v =>
          (v && v.length <= 10) ||
          'La cuota inicial debe tener menos de 10 caracteres'
      ]
    },

    response: null,
    tabla: null,
    finalTabla: null
  }),

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.editedItem.clienteId = localStorage.getItem('clienteId')
    },

    close() {
      this.dialog = false
    },

    async save() {
      if (this.$refs.form.validate()) {
        try {
          const res = await axios.post(process.env.calculaAPI, {
            valorVehiculo: this.editedItem.valorVehiculo,
            cuotaInicial: this.editedItem.cuotaInicial,
            moneda: this.editedItem.moneda,
            cuota: this.editedItem.cuota,
            tasa: this.editedItem.tasa,
            tipoSeguroVehicular: this.editedItem.tipoSeguroVehicular,
            costoOportunidad: this.editedItem.costoOportunidad,
            periodoGracia: this.editedItem.periodoGracia,
            tipoPeriodoGracia: this.editedItem.tipoPeriodoGracia,
            cuotaIPG: this.editedItem.cuotaIPG,
            cuotaFPG: this.editedItem.cuotaFPG
          })
          console.log(res.status)
          console.log(res.data)
          this.response = res.data
          this.tabla = res.data.responseTabla.tabla
          this.finalTabla = res.data.responseTabla.finalTabla

          if (this.editedItem.clienteId != null) {
            try {
              const resc = await axios.post(process.env.creditosAPI, {
                valorVehiculo: this.editedItem.valorVehiculo,
                cuotaInicial: this.editedItem.cuotaInicial,
                moneda: this.editedItem.moneda,
                cuota: this.editedItem.cuota,
                tasa: this.editedItem.tasa,
                tipoSeguroVehicular: this.editedItem.tipoSeguroVehicular,
                costoOportunidad: this.editedItem.costoOportunidad,
                periodoGracia: this.editedItem.periodoGracia,
                tipoPeriodoGracia: this.editedItem.tipoPeriodoGracia,
                cuotaIPG: this.editedItem.cuotaIPG,
                cuotaFPG: this.editedItem.cuotaFPG,
                clienteId: this.editedItem.clienteId
              })
              console.log(resc)
              console.log('Credito registrado satisfactoraimente')
            } catch (error) {
              console.log(error)
            }
          }

          if (res.status === 200) {
            this.message = 'Credito creado con exito'
            // this.$router.push({
            //   path: '/main'
            // })
          }
        } catch (error) {
          this.message =
            'Error: No se pudo crear Creditos - Precondición no complida'
        }
      }
    }
  }
}
</script>
<style />
