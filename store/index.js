import axios from 'axios'
import Cookie from 'js-cookie'
export const strict = false

export const state = () => ({
  token: null,
  loadedCreditos: null,
  loadedCredito: null
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  },
  setCreditos(state, creditos) {
    state.loadedCreditos = creditos
  },
  setCredito(state, credito) {
    state.loadedCredito = credito
  }
}

export const actions = {
  // Empleados
  async loadCreditos(vuexContext, context) {
    console.log('Api loadCreditos')
    const clienteId = localStorage.getItem('clienteId')
    console.log(clienteId)
    console.log(process.env.creditosClienteAPI)

    try {
      const res = await axios.get(process.env.creditosClienteAPI + clienteId)
      console.log(res)
      vuexContext.commit('setCreditos', res.data)
      return res.data
    } catch (e) {
      return context.error(e)
    }
  },

  async loadedCredito(vuexContext, context) {
    console.log('Api loadCredito')
    try {
      const res = await axios.get('http://localhost:4000/creditosCliente/1')
      console.log(res)
      vuexContext.commit('setCreditos', res.data)
      return res.data
    } catch (e) {
      return context.error(e)
    }
  },

  authenticateUser(vuexContext, authData) {
    let authUrl =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
      process.env.fbApiKey
    if (!authData.isLogin) {
      authUrl =
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
        process.env.fbApiKey
    }
    // Verify password and email to Firebase
    return this.$axios
      .$post(authUrl, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(result => {
        vuexContext.commit('setToken', result.idToken)
        localStorage.setItem('token', result.idToken)
        localStorage.setItem(
          'tokenExpiration',
          new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
        )
        Cookie.set('jwt', result.idToken)
        Cookie.set(
          'expirationDate',
          new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
        )
        axios
          .post(process.env.loginAPI, {
            email: result.email,
            idToken: result.idToken
          })
          .then(res => {
            localStorage.setItem('clienteId', res.data.result.clienteId)
            localStorage.setItem('clienteUid', res.data.result.clienteUid)
            localStorage.setItem(
              'clienteFirstName',
              res.data.result.clienteFirstName
            )
            localStorage.setItem(
              'clienteLastName',
              res.data.result.clienteLastName
            )
            localStorage.setItem('clienteEmail', res.data.result.clienteEmail)
            localStorage.setItem('imageURL', res.data.result.clientePhotoURL)
            this.$router.push('/main')
          })
          .catch(err => err.Status)
      })
      .catch(e => e.name)
  },

  // Función que es llamada en el por el middleware al iniciar cada page
  initAuth(vuexContext, req) {
    let token
    let expirationDate
    if (req) {
      if (!req.headers.cookie) {
        return
      }
      const jwtCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('jwt='))
      if (!jwtCookie) {
        return
      }
      token = jwtCookie.split('=')[1]
      expirationDate = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('expirationDate='))
        .split('=')[1]
    } else {
      token = localStorage.getItem('token')
      expirationDate = localStorage.getItem('tokenExpiration')
    }

    if (new Date().getTime() > +expirationDate || !token) {
      console.log('No token or invalid token')
      vuexContext.dispatch('logout')
      return
    }

    if (process.client) {
      vuexContext.commit('setToken', token)
    }

    // Valida al pasar por cada page si la data ya fue obtenida
    // if (vuexContext.getters.loadedProjectsCustomer.length === 0) {
    //   vuexContext.dispatch('loadProjectsCustomer')
    // }
  },

  logout(vuexContext) {
    vuexContext.commit('clearToken')
    Cookie.remove('jwt')
    Cookie.remove('expirationDate ')
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiration')
    localStorage.removeItem('companyName')
    localStorage.removeItem('customerId')
    localStorage.removeItem('employeeFirstName')
    localStorage.removeItem('employeeId')
    localStorage.removeItem('clienteId')
    localStorage.removeItem('clienteUid')
    localStorage.removeItem('clienteFirstName')
    localStorage.removeItem('clienteEmail')
    localStorage.removeItem('imageURL')
  },

  setCreditos(vuexContext, creditos) {
    vuexContext.commit('setCreditos', creditos)
  },
  setToken(vuexContext, token) {
    vuexContext.commit('setToken', token)
  },
  setLogoutTimer(vuexContext, duration) {
    setTimeout(() => {
      vuexContext.commit('clearToken')
    }, duration)
  }
}
export const getters = {
  loadedCreditos(state) {
    return state.loadedCreditos
  },
  loadedCredito(state) {
    return state.loadedCredito
  },
  isAuthenticated(state) {
    return state.token != null
  }
}
