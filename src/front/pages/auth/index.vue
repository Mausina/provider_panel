<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-alert type="error" v-if="error">
                {{this.error}}
              </v-alert>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="email"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" v-on:click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>

</template>

<script>
  export default {
    name: 'index',
    props: {
      source: String,
    },
    auth: false,
    data() {
      return {
        email: '',
        password: '',
        error: null
      }
    },
    middleware: 'auth',
    methods: {
      async login() {
        try {
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          }).catch(error => {
            this.error = error.response.data.msg
          });

          this.$router.push('/admin/dashboard')
        } catch (e) {
          console.log(e.response)
          // this.error = e
        }
      }
    }
  }
</script>
