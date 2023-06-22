<template>
  <layout-container brandTitle="Dashboard">
    <v-row dense no-gutters class="ma-0 w-full">
      <v-col cols="12">
        <v-card outlined class="px-5 py-5">
          <v-row dense class="ma-0 w-full">
            <v-col cols="12">
              <span class="text-h6">Summary report</span>
              <v-row class="w-full mt-3 ma-0">
                <v-col v-for="(item, Index) in analytics" :key="Index" md="3">
                  <page-dashboard-card-analytic v-bind="item" />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense no-gutters class="ma-0 mt-4 w-full">
      <v-col cols="12">
        <v-card outlined class="px-5 py-5">
          <v-row class="ma-0 w-full">
            <v-col cols="12">
              <span class="text-h6">Most sales product</span>
              <v-card rounded="0" outlined class="w-full mt-4">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Product Name</th>
                        <th>Category</th>
                        <th>Transaction</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in mostSalesProduct" :key="item.name">
                        <td>{{ item.name }}</td>
                        <td>{{ item.category }}</td>
                        <td>{{ item.sales }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </layout-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ProductData from "@/utils/data/products.json";

@Component
export default class Index extends Vue {
  analytics = [
    {
      color: "#E1BEE7",
      title: "Consultation",
      content: "300",
      description: "+5% of previous month",
    },
    {
      color: "#FFF59D",
      title: "Transaction",
      content: "240",
      description: "1.239 All time transaction",
    },
    {
      color: "#E8EAF6",
      title: "Total student",
      content: "2.300",
      description: "+174 New student",
    },
    {
      color: "#E1BEE7",
      title: "Total mentor",
      content: "950",
      description: "+38 New mentor",
    },
  ];

  mostSalesProduct = [
    {
      name: "Kelas Pemorograman Dasar",
      category: "Computer Science",
      sales: "3.299",
    },
    {
      name: "Kelas Digital Marketing",
      category: "Business",
      sales: "2.388",
    },
    {
      name: "Kelas Hukum & Administrasi Bisnis",
      category: "Business",
      sales: "388",
    },
  ];
}
</script>
