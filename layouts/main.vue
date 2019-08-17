<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      right
      width="500"
      flat
    >
      <v-toolbar flat class="transparent" />
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img :src="user.avatar" />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            <h3 class="success--text">{{ user.title }}</h3>
          </v-list-tile-title>
          <v-list-tile-sub-title>
            <h4 class="font-weight-regular grey--text text--darken-1">
              {{ user.subtitle }}
            </h4>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile />
      <v-divider inset light />
      <v-list>
        <v-list-tile router exact>
          <v-list-tile-action>
            <v-icon>{{ iconHelp }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-regular" v-text="titleHelp" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile>
          <h1>1. ¿Qué es Credicart?</h1>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile>
          <p>
            Es un simulador para calculos de las cuotas a pagar por un crédito
            vehicular inteligente.
          </p>
        </v-list-tile>
      </v-list>

      <v-list>
        <v-list-tile>
          <h1>2. Qué tipo de tasas se utilizan?</h1>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile>
          <p>
            En Creditcart se utilizan dos tasas para realizar los calculos que
            son las siguientes: Tasa Nominal Anual (TNA): InterÈs de 12.89% que
            capitaliza m·s de una vez al aÒo. Tasa efectiva anual (TEA): Tasa de
            13.49% a la que efectivamente est· colocado el capital.
          </p>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile>
          <h1>3. ¿Qué es periodo de gracia?</h1>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile>
          <p>
            El período de gracia es un intervalo de tiempo durante el cual no se
            pagan las cuotas del préstamo o crédito que solicitaste. El período
            de gracia puede ser una ventaja si estos en una mala situaciÛn
            económica y no puedes pagar tus deudas algunos meses.
          </p>
        </v-list-tile>
      </v-list>
      <v-list-tile />
      <v-list>
        <v-list-tile router exact @click="onLogout">
          <v-list-tile-action>
            <v-icon>{{ iconLogout }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title
              class="font-weight-regular"
              v-text="titleLogout"
            />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
      flat
      class="indigo darken-3 white--text"
    >
      <v-btn flat class="white--text" to="/main">Credicart</v-btn>
      <v-spacer />
      <v-toolbar-side-icon class="white--text" @click="drawer = !drawer">
        <v-icon light>live_help</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat class="white--text" @click="onLogout">Salir</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>-->
  </v-app>
</template>

<script>
export default {
  middleware: ['check-auth', 'auth'],

  data() {
    return {
      user: {
        avatar: '',
        title: '',
        subtitle: ''
      },
      clipped: false,
      drawer: true,
      fixed: false,
      iconLogout: 'input',
      titleLogout: 'Salir',
      iconHelp: 'live_help',
      titleHelp: 'Ayuda',

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Finanzas'
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    initialize() {
      this.user.avatar = localStorage.getItem('imageURL')
      this.user.title = localStorage.getItem('clienteFirstName')
      this.user.subtitle = localStorage.getItem('clienteLastName')
    }
  }
}
</script>
