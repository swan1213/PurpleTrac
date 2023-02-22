// We haven't added icon's computed property because it makes this mixin coupled with UI
export const togglePasswordVisibility = {
  data() {
    return {
      passwordFieldType: 'password',
      passwordFieldType2: 'password',
      passwordFieldType3: 'password',
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    togglePasswordVisibility2() {
      this.passwordFieldType2 = this.passwordFieldType2 === 'password' ? 'text' : 'password'
    },
    togglePasswordVisibility3() {
      this.passwordFieldType3 = this.passwordFieldType3 === 'password' ? 'text' : 'password'
    },
  },
}

export const _ = null
