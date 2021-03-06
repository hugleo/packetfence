<template>
    <b-form @submit.prevent="login">
        <component :is="modal?'b-modal':'b-card'" v-model="modalVisibility"
          static lazy no-close-on-esc no-close-on-backdrop hide-header-close no-body>
            <template v-slot:[headerSlotName]>
                <h4 class="mb-0" v-t="'Login to PacketFence Administration'"></h4>
            </template>
            <component :is="modal?'div':'b-card-body'">
                <b-alert :variant="message.level" :show="message.text" fade>
                    {{ message.text }}
                </b-alert>
                <b-form-group :label="$t('Username')" label-for="username" label-cols="4">
                    <b-form-input id="username" type="text" v-model="username" v-focus required :readonly="showModal === true"></b-form-input>
                </b-form-group>
                <b-form-group :label="$t('Password')" label-for="password" label-cols="4">
                    <b-form-input id="password" type="password" v-model="password" required></b-form-input>
                </b-form-group>
            </component>
            <template v-slot:[footerSlotName] class="justify-content-start">
                <pf-button-save type="submit" variant="primary" :isLoading="isLoading" :disabled="!validForm">{{ $t('Login') }}</pf-button-save>
                <b-link class="ml-2" variant="outline-secondary" @click="logout" v-if="showModal === true">{{ $t('Use a different username') }}</b-link>
            </template>
        </component>
    </b-form>
</template>

<script>
import pfButtonSave from '@/components/pfButtonSave'

export default {
  name: 'pf-form-login',
  components: {
    pfButtonSave
  },
  data () {
    return {
      username: '',
      password: '',
      message: {},
      modalVisibility: false
    }
  },
  props: {
    modal: {
      type: Boolean,
      default: false
    },
    showModal: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    headerSlotName () {
      return this.modal ? 'modal-header' : 'header'
    },
    footerSlotName () {
      return this.modal ? 'modal-footer' : 'footer'
    },
    isLoading () {
      return this.$store.getters['session/isLoading']
    },
    validForm () {
      return this.username.length > 0 && this.password.length > 0 && !this.isLoading
    }
  },
  mounted () {
    if (this.$route.path === '/logout') {
      this.$store.dispatch('session/logout').then(() => {
        this.message = { level: 'info', text: this.$i18n.t('You have logged out') }
      })
    } else if (this.$route.path === '/expire' || this.$route.params.expire) {
      this.$store.dispatch('session/logout').then(() => {
        this.message = { level: 'warning', text: this.$i18n.t('Your session has expired') }
      })
    } else if (this.$store.state.session.username) {
      this.username = this.$store.state.session.username
    }
  },
  watch: {
    showModal (value) {
      if (this.modal) {
        this.modalVisibility = value
        if (value) {
          // Token has expired
          this.username = this.$store.state.session.username
          this.password = ''
          this.message = { level: 'warning', text: this.$i18n.t('Your session has expired') }
        }
      }
    }
  },
  methods: {
    login () {
      this.message = false
      this.$store.dispatch('session/login', { username: this.username, password: this.password }).then(response => {
        this.$emit('login', response)
      }, error => {
        if (error.response) {
          this.message = { level: 'danger', text: error.response.data.message }
        } else if (error.request) {
          this.message = { level: 'danger', text: this.$i18n.t('A networking error occurred. Is the API service running?') }
        }
      })
    },
    logout () {
      this.$store.dispatch('session/logout').then(() => {
        this.$router.push('/logout')
      })
    }
  }
}
</script>
