<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md3></v-flex>
      <v-flex md6>
        <v-card flat>
          <v-card-title primary-title>
            <h1>Registrar usuario</h1>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-layout wrap>
                <v-flex xs12 sm6 md12>
                  <v-text-field
                    v-model="editedItem.clienteFirstName"
                    :rules="rules.clienteFirstName"
                    :counter="30"
                    label="Nombres"
                    outline
                  />
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field
                    v-model="editedItem.clienteLastName"
                    :rules="rules.clienteLastName"
                    :counter="30"
                    label="Apellidos"
                    outline
                  />
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field
                    v-model="editedItem.clienteDni"
                    :rules="rules.clienteDni"
                    :counter="8"
                    label="DNI"
                    type="Number"
                    min="1"
                    outline
                  />
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field
                    v-model="editedItem.clienteEmail"
                    :rules="rules.clienteEmail"
                    :counter="30"
                    label="Email"
                    outline
                  />
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field
                    v-model="editedItem.clientePassword"
                    :rules="rules.clientePassword"
                    :counter="30"
                    type="password"
                    label="Contraseña"
                    outline
                  />
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field
                    v-model="editedItem.clientePhoneNumber"
                    :rules="rules.clientePhoneNumber"
                    :counter="9"
                    type="Number"
                    min="1"
                    label="Telefono"
                    outline
                  />
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn depressed to="/">
              CANCELAR
            </v-btn>
            <v-spacer />
            <v-btn :disabled="!valid" block flat color="accent" @click="save">
              Registrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <!-- {{ message }} -->
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'

export default {
  data: () => ({
    message: null,
    search: '',
    dialog: false,
    headers: [
      { text: 'Nombres', value: 'clienteFirstName' },
      { text: 'Apellidos', value: 'clienteLastName' },
      { text: 'DNI', value: 'clienteDni' },
      { text: 'Email', value: 'clienteEmail' },
      { text: 'Number', value: 'clientePhoneNumber' },
      { text: 'Photo', value: 'clientePhotoURL' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    dataEmployees: [],

    editedIndex: -1,
    editedItem: {
      clienteFirstName: '',
      clienteLastName: '',
      clienteDni: '',
      clienteEmail: '',
      clientePassword: '',
      clientePhoneNumber: '',
      clientePhotoURL:
        'https://firebasestorage.googleapis.com/v0/b/econtainer-app.appspot.com/o/employees%2F12312312?alt=media&token=4d0142fc-dae2-4275-bfd5-4f2dbc94ebe7'
    },
    defaultItem: {
      clienteFirstName: '',
      clienteLastName: '',
      clienteDni: '',
      clienteEmail: '',
      clientePassword: '',
      clientePhoneNumber: '',
      clientePhotoURL:
        'https://firebasestorage.googleapis.com/v0/b/econtainer-app.appspot.com/o/employees%2F12312312?alt=media&token=4d0142fc-dae2-4275-bfd5-4f2dbc94ebe7'
    },
    valid: true,
    rules: {
      clienteFirstName: [
        v => !!v || 'Nombres es necesario',
        v =>
          (v && v.length <= 30) || 'El nombre debe tener menos de 30 caracteres'
      ],
      clienteLastName: [
        v => !!v || 'Apellidos es necesario',
        v =>
          (v && v.length <= 30) ||
          'Los apellidos debe tener menos de 30 caracteres'
      ],
      clienteDni: [
        v => !!v || 'DNI es necesario',
        v => (v && v.length <= 8) || 'El DNI debe tener 8 caracteres',
        v => (v && v.length >= 8) || 'El DNI debe tener 8 caracteres'
      ],
      clienteEmail: [
        v => !!v || 'Email es necesario',
        v => /.+@.+/.test(v) || 'Email debe ser valido',
        v => (v && v.length <= 30) || 'Name must be less than 10 characters'
      ],
      clientePassword: [
        v => !!v || 'Password es necesario',
        v => (v && v.length <= 30) || 'Name must be less than 10 characters'
      ],
      clientePhoneNumber: [
        v => !!v || 'clientePhoneNumber es necesario',
        v =>
          (v && v.length <= 9) ||
          'clientePhoneNumber be less than 9 characters',
        v =>
          (v && v.length >= 9) ||
          'clientePhoneNumber  be less than 9 characters'
      ],
      companyName: [v => !!v || 'Item is required']
    }
  }),

  //   computed: {
  //     loadedEmployees() {
  //       return this.$store.getters.loadedEmployees
  //     }
  //   },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    // this.initialize()
  },

  methods: {
    initialize() {
      console.log('Cargando empleados')
      console.log(this.$store.getters.loadedEmployees)
      this.dataEmployees = this.$store.getters.loadedEmployees
    },

    editItem(item) {
      this.editedIndex = this.dataEmployees.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.dataEmployees.indexOf(item)
      if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
        this.dataEmployees.splice(index, 1)
        axios.delete(process.env.employeesAPI + item.employeeId)
      }
    },
    onInfo(employeeId) {
      this.$router.push({
        path: '/employees/' + employeeId,
        params: { id: employeeId }
      })
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    async save() {
      if (this.editedIndex > -1) {
        axios.put(process.env.employeesAPI + this.editedItem.employeeId, {
          clienteFirstName: this.editedItem.clienteFirstName,
          clienteLastName: this.editedItem.clienteLastName,
          clienteDni: this.editedItem.clienteDni,
          clienteEmail: this.editedItem.clienteEmail.toLowerCase(),
          clientePassword: this.editedItem.clientePassword,
          clientePhoneNumber: '+51' + this.editedItem.clientePhoneNumber,
          clientePhotoURL: this.editedItem.clientePhotoURL,
          clienteMonthyIncome: this.editedItem.clienteDni
        })
        Object.assign(this.dataEmployees[this.editedIndex], this.editedItem)
      } else if (this.$refs.form.validate()) {
        try {
          const res = await axios.post(process.env.clientesAPI, {
            clienteFirstName: this.editedItem.clienteFirstName,
            clienteLastName: this.editedItem.clienteLastName,
            clienteDni: this.editedItem.clienteDni,
            clienteEmail: this.editedItem.clienteEmail.toLowerCase(),
            clientePassword: this.editedItem.clientePassword,
            clientePhoneNumber: '+51' + this.editedItem.clientePhoneNumber,
            clientePhotoURL: this.editedItem.clientePhotoURL,
            clienteMonthyIncome: this.editedItem.clienteDni
          })
          if (res.status === 200) {
            this.message = 'Colaborador creado con exito'
            this.$router.push({
              path: '/ingresar'
            })
          }
        } catch (error) {
          this.message =
            'Error: No se pudo crear Colaborador - Precondición no complida'
        }
      }
      this.close()
    }
  }
}
</script>

<style />
