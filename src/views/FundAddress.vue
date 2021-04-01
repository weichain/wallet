<template>
  <div class="fund-address">
    <NavBar showMenu="true" showBack="true" backPath="/wallet" backLabel="Back">
      <span class="wallet_header"><strong>Fund your account </strong></span>
    </NavBar>
    <div class="wrapper form">
      <div class="form-group info">
        Initialize your account by sending at least 1 NEAR to the one-time
        funding address below. Return to this screen once your funds have been
        deposited to finish creating your account.
      </div>
      <div class="form-group">
        <label for="name">One-time-funding address</label>
        <div class="address">{{ generateAddress }}</div>
      </div>
      <div class="wrapper_bottom">
        <div class="button-group">
          <router-link :to="`/activate-address`"
            ><button class="btn btn-light btn-outline-primary btn-lg">
              Cancel
            </button></router-link
          >
          <button class="btn btn-primary btn-lg" @click="copy(generateAddress)">
            Copy Address
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { mapState } from "vuex";
import { parseSeedPhrase } from "near-seed-phrase";
import { KeyPair } from "near-api-js";

export default {
  components: {
    NavBar
  },
  props: ["fundingAddress"],
  computed: {
    ...mapState(["wallets", "activeWalletId"]),
    wallet: function() {
      return this.wallets.find(wallet => wallet.id === this.activeWalletId);
    },
    seedList: function() {
      return this.wallet.mnemonic;
    },
    generateAddress: function() {
      const { secretKey } = parseSeedPhrase(this.seedList, "m/44'/397'/0'");
      const keyPair = KeyPair.fromString(secretKey);
      const implicitAccountId = Buffer.from(keyPair.publicKey.data).toString(
        "hex"
      );
      return implicitAccountId;
    }
  },
  methods: {
    async copy(text) {
      await navigator.clipboard.writeText(text);
    }
  }
};
</script>

<style lang="scss">
.fund-address {
  display: flex;
  flex-direction: column;
  min-height: 0;

  .form-group {
    margin-bottom: 30px;
  }
  .address {
    word-wrap: break-word;
    background: lightgrey;
    padding: 10px;
  }
}
</style>
