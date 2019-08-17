<template>
  <v-app>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      right
      width="500"
      flat
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>-->
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
      flat
      class="indigo darken-3 white--text"
    >
      <v-btn flat class="primary white--text" to="/">Credicart</v-btn>

      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat class="white--text" to="simular">Simular</v-btn>
        <v-btn flat class="white--text" to="registrar">Registrar</v-btn>
        <v-btn flat class="white--text" to="ingresar">Ingresar</v-btn>
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
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Simular',
          to: '/simular'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Finanzas'
    }
  }
}
</script>
