<template>
  <v-container flat>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card flat class="table-border">
          <v-card-title primary-title>
            <h1>Iniciar sesión</h1>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <div>
                <v-text-field
                  v-model="editedItem.employeeEmail"
                  :rules="rules.employeeEmail"
                  :counter="30"
                  label="Email"
                  type="email"
                  name="email"
                  hint="Menos de 30 caracteres"
                  outline
                />
                <v-text-field
                  v-model="editedItem.employeePassword"
                  :rules="rules.employeePassword"
                  :counter="20"
                  type="password"
                  label="Password"
                  name="password"
                  aria-label="password"
                  hint="Menos de 20 caracteres"
                  outline
                />
              </div>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-layout row wrap>
              <v-flex md12>
                <v-btn
                  :disabled="!valid"
                  block
                  flat
                  color="primary"
                  @click="onSubmit"
                  >INICIAR SESIÓN</v-btn
                >
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
        <v-alert :value="value" color="error" icon="warning" outline>{{
          message
        }}</v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    message: '',
    value: false,
    isLogin: true,
    editedItem: {
      employeeEmail: '',
      employeePassword: ''
    },
    valid: true,

    show: false,

    rules: {
      employeeEmail: [
        v => !!v || 'Se necesita email',
        v => /.+@.+/.test(v) || 'e-mail no valido',
        v =>
          (v && v.length <= 30) || 'e-mail debe contener menos de 30 caracteres'
      ],
      employeePassword: [
        v => !!v || 'Se necesita contraseña',
        v =>
          (v && v.length >= 6) ||
          'La contraseña debe contener más de 6 caracteres',
        v =>
          (v && v.length <= 20) ||
          'La contraseña debe contener menos de 20 caracteres'
      ]
    }
  }),
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.value = false
        this.$store
          .dispatch('authenticateUser', {
            isLogin: this.isLogin,
            email: this.editedItem.employeeEmail,
            password: this.editedItem.employeePassword
          })
          .then(res => {
            if (res === 'Error') {
              this.value = true
              this.message = 'Email o contraseña incorrectos'
            }
            // this.$router.push('/main')
          })
          .catch(() => {
            this.message = 'Contraseña o usuario incorrecto'
            console.log('Contraseña o usuario incorrecto')
            // this.$router.push('/')
          })
      }
    }
  }
}
</script>

<style></style>
