import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";

export const bitcoinService = {
  getRate,
  getMarketPriceHistory,
  getAvgBlockSize,
}

const BITCOIN_KEY = "bitcoinData"
const bitcoinData = utilService.loadFromStorage(BITCOIN_KEY) || {}

async function getRate() {
  let rate = bitcoinData.rate
  // console.log("bitcoinRate", rate)
  if (!rate) {
    const response = await fetch(
      `https://blockchain.info/tobtc?currency=USD&value=1&cors=true`
    );
    rate = await response.json()
    bitcoinData.rate = rate
    // console.log("bitcoinRate", rate)
    utilService.saveToStorage(BITCOIN_KEY, bitcoinData)
    
  }
  // console.log("bitcoinRate", rate)
  return rate
}

async function getMarketPriceHistory() {
  let history = bitcoinData.history
  if (!history) {
    try {
    const response = await fetch(
      `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
    )
    history = await response.json()
    bitcoinData.history = history
    utilService.saveToStorage(BITCOIN_KEY, bitcoinData)
  
  } catch (err) {
      console.log("err", err)
    }
    
  }
  // console.log("history", history)
  return history

}

async function getAvgBlockSize() {
  let avgBlockSize = bitcoinData.avgBlockSize
  if (!avgBlockSize) {
    const response = await fetch(
      `https://api.blockchain.info/charts/avg-blocksize?timespan=5months&format=json&cors=true`
    )
    avgBlockSize = await response.json()
    bitcoinData.avgBlockSize = avgBlockSize
    utilService.saveToStorage(BITCOIN_KEY, bitcoinData)
  }
  return avgBlockSize

}

