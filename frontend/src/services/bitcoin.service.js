import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";

export const bitcoinService = {
  getRate,
  getMarketPriceHistory,
  getAvgBlockSize,
};

//     Exchange rates https://blockchain.info
// Market price
// History
// https://api.blockchain.info/charts/market-price?
// timespan=5months&format=json&cors=true
// Average block
// size
// https://api.blockchain.info/charts/avg-blocksize?
// timespan=5months&format=json&cors=true
// More to explore https://www.blockchain.com/charts

// In order to prevent the API from getting blocked by too many
// requests during development, save the response as a hard-coded
// object in the service or to local storage. You can switch to using the
// real API when you finish development.

// Some API calls are available with CORS headers. Add a
// &cors=true parameter to the GET request.
// For example:
// https://api.blockchain.info/charts/market-price?
// timespan=5months&format=json &cors=true
//

async function getRate() {
  let rate = localStorage.getItem("rate")
  console.log("rate", rate)
  if (!rate) {
    const response = await fetch(
      `https://blockchain.info/tobtc?currency=USD&value=1&cors=true`
    );
    rate = await response.json()
    console.log("rate", rate)
    localStorage.setItem("rate", JSON.stringify(rate))
    
  }
  return rate
}

async function getMarketPriceHistory() {
  let history = localStorage.getItem("history")
  if (!history) {
    const response = await fetch(
      `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
    );
    history = await response.json()
    localStorage.setItem("history", JSON.stringify(history))
  }
  return history

}

async function getAvgBlockSize() {
  let avgBlockSize = localStorage.getItem("avgBlockSize")
  if (!avgBlockSize) {
    const response = await fetch(
      `https://api.blockchain.info/charts/avg-blocksize?timespan=5months&format=json&cors=true`
    );
    avgBlockSize = await response.json()
  }
  return avgBlockSize

}

