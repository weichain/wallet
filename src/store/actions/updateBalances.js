import Bluebird from 'bluebird'

export const updateBalances = async ({ state, commit, getters }, { network, walletId }) => {
  const assets = state.enabledAssets[network][walletId]
  await Bluebird.map(assets, async asset => {
    let addresses = []
    try {
      addresses = await getters.client(network, walletId, asset).wallet.getUsedAddresses()
    } catch (error) {
      console.log(error)
    }

    const balance = addresses.length === 0
      ? 0
      : (await getters.client(network, walletId, asset).chain.getBalance(addresses)).toNumber()

    commit('UPDATE_BALANCE', { network, walletId, asset, balance })
  }, { concurrency: 1 })
}
