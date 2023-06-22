<template>
  <apex-chart
    width="100%"
    type="pie"
    class="mt-4"
    :options="options"
    :series="series"
  ></apex-chart>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class PageDashboardChartOrderCategory extends Vue {
  options = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Clothing", "Electronic", "Furniture", "Office", "Digital"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  series = [44, 55, 13, 43, 22];
}
</script>
