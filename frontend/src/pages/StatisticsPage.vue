

<script>
import BarChart from "@/cmps/BarChart.vue";
import { bitcoinService } from "@/services/bitcoin.service.js";

export default {
  data() {
    return {
      history: null,
    };
  },
  async created() {
    try {
      this.history = await bitcoinService.getMarketPriceHistory();
    } catch (error) {
      console.log("Error fetching history:", error);
    }
  },
  computed: {
    chartData() {
      if (this.history && this.history.values) {
        return {
          labels: this.history.values.map((value) => value.x),
          datasets: [
            {
              label: "Bitcoin Market Price (USD)",
              backgroundColor: "#f87979",
              data: this.history.values.map((value) => value.y),
            },
          ],
        };
      }
      return null;
    },
  },
  components: { BarChart },
};
</script>

<template>
  <div class="statistics-page">
    <h1>Statistics view</h1>
    <BarChart :chartData="chartData" v-if="history" />
  </div>
</template>

