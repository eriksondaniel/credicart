<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md12>
        <v-card flat class="transparent">
          <v-card-title primary-title>
            <h1>Mis creditos</h1>
            <v-spacer />
            <v-btn depressed block color="accent" to="main/calcule"
              >Simular</v-btn
            >
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-if="loadedCreditos == null">
      <h2>cargando</h2>
    </v-layout>
    <v-layout v-else row wrap>
      <v-flex
        v-for="i in loadedCreditos[0].Creditos"
        :key="i.creditoId"
        md12
        pa-2
      >
        <v-card class="rounded-card white" flat>
          <v-card-title>
            <v-layout row wrap>
              <v-flex md2 class="text-md-center">
                <img
                  src="https://image.flaticon.com/icons/svg/832/832793.svg"
                  alt=""
                  width="50"
                />
                <h3 class="title">#{{ i.creditoId }}</h3>
              </v-flex>
              <v-flex md3>
                <TextSmall
                  sub-title="Valor de vehiculo"
                  :title="String(i.valorVehiculo)"
                />
                <br />
                <TextSmall
                  sub-title="Cuota inicial"
                  :title="String(i.cuotaInicial)"
                />
              </v-flex>
              <v-flex md3>
                <TextSmall sub-title="Tasa" :title="String(i.tasa)" />
                <br />
                <TextSmall
                  sub-title="Tipo Seguro Vehicular"
                  :title="String(i.tipoSeguroVehicular)"
                />
              </v-flex>
              <v-flex md2>
                <TextSmall
                  sub-title="Periodo de gracia"
                  :title="String(formatPeriodo(i.periodoGracia))"
                />
                <br />
                <TextSmall sub-title="Duración" :title="String(i.cuota)" />
              </v-flex>
              <v-flex md2 class="text-md-center">
                <v-btn flat color="cyan" @click="ver(i.creditoId)">Ver</v-btn>
                <v-btn flat color="red" @click="ver(i.creditoId)"
                  >Eliminar</v-btn
                >
              </v-flex>
            </v-layout>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import TextSmall from '@/components/TextSmall'

export default {
  layout: 'main',

  components: {
    TextSmall
  },
  data: () => ({
    message: null,
    search: '',
    dialog: false,
    headers: [
      { text: 'Saldo Inicial', value: 'saldoInicial' },
      { text: 'Saldo Final', value: 'saldoFinal' },
      { text: 'Interes', value: 'interes' },
      { text: 'Amortización', value: 'Amortización' },
      { text: 'Cuota', value: 'Cuota' }
    ],
    dataCreditos: [],

    editedIndex: -1
  }),
  computed: {
    loadedCreditos() {
      console.log('loadedCreditos')
      console.log(this.$store.getters.loadedCreditos)
      return this.$store.getters.loadedCreditos
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    formatPeriodo: date => {
      return date ? 'Otorgado' : 'No torgado'
    },
    initialize() {
      console.log('Cargando tabla')
      this.$store.dispatch('loadCreditos')
      console.log(this.$store.getters.loadedCreditos)
    },

    ver(creditoId) {
      this.$router.push({
        path: '/main/' + creditoId,
        params: { id: creditoId }
      })
    }
  }
}
</script>
<style>
.rounded-card {
  border-radius: 20px;
}
</style>
