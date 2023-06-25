
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Bar },
    props: ['chartData'],
    data() {
      return {
        // barData: this.chartData,
        chartOptions: {
          responsive: true
        }
      }
    },
    onCreated() {
      console.log('chartData', chartData)
    }
}
  
  </script>
  <template>
    <Bar v-if="chartData"
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
    <style>
    #my-chart-id {
      max-width: 400px;
      margin: 35px auto;
    }
    </style>
