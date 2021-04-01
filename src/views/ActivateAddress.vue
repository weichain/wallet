<template>
  <div class="activate-address">
    <NavBar showMenu="true" showBack="true" backPath="/wallet" backLabel="Back">
      <span class="wallet_header"><strong>Reserve Account ID</strong></span>
    </NavBar>
    <div class="wrapper form">
      <div class="wrapper_top">
        <div class="form-group">
          <span
            >Enter an Account ID to use with your NEAR account. Your Account ID
            will be used for all NEAR operations, including sending and
            receiving assets.</span
          >
        </div>
        <div class="form-group">
          <label for="name">Account ID</label>
          <input
            type="text"
            v-model="name"
            class="form-control form-control-sm"
            id="name"
            placeholder="Example: satoshi"
            autocomplete="off"
            required
            :disabled="autofilled"
          />
        </div>
        <div class="form-group reserve-name-rules">
          <span>Your account ID can contain any of the following:</span>
          <span>- Lowercase characters (a-z)</span>
          <span>- Digits (0-9)</span>
          <span>- Characters (_-) can be used as separators</span>
          <span>Your account ID CANNOT contain:</span>
          <span>- Characters "@" or "."</span>
        </div>
      </div>
      <div class="wrapper_bottom">
        <div class="button-group">
          <router-link :to="`/wallet`"
            ><button class="btn btn-light btn-outline-primary btn-lg">
              Cancel
            </button></router-link
          >
          <button
            class="btn btn-primary btn-lg"
            @click="createAccount()"
            :disabled="false"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      name: null
    };
  },
  computed: {
    canCreate() {
      return false;
    }
  },
  methods: {
    async createAccount() {
      this.$router.replace(
        "/fund-address/aa4f186f48e9261fcb5d49b0be5a82faff9ce8b2c4abf595d096d1eb6063d670"
      );
    }
  }
};
</script>

<style lang="scss">
.activate-address {
  display: flex;
  flex-direction: column;
  min-height: 0;

  .form-group {
    margin-bottom: 30px;
  }

  .reserve-name-rules {
    display: flex;
    align-items: baseline;
    flex-flow: column;
  }
}
</style>
