<template>
  <v-container grid-list-md>
    <v-layout column wrap>
      <v-flex md12>
        <v-card flat class="transparent">
          <v-card-title primary-title>
            <h1>Simular</h1>
            <v-spacer></v-spacer>
            <v-btn flat depressed color="success" to="/main">atrás</v-btn>
          </v-card-title>
        </v-card>
      </v-flex>
      <Calcular />
    </v-layout>
  </v-container>
</template>

<script>
import Calcular from '@/components/Calcular'

export default {
  layout: 'main',

  components: {
    Calcular
  }
}
</script>
