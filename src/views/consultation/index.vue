<template>
  <layout-container brandTitle="Konsultasi">
    <v-card class="w-full mt-3" outlined>
      <v-data-table
        :headers="tableHeader"
        :items="consultations"
        :items-per-page="5"
        class="elevation-0 w-full"
      >
        <template #[`item.createDate`]="row">
          <span>{{ $helpers.fullDate(row.item.createDate) }}</span>
        </template>
        <template #[`item.action`]="row">
          <v-btn
            @click="$router.push('/consultation/' + row.item.consultationId)"
            color="primary"
            icon
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </layout-container>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ConsultationApi } from "@/api/consultation.api";

@Component
export default class Consultation extends Vue {
  consultationApi = new ConsultationApi();
  $helpers: any;
  dialogFilter = false;
  tableHeader = [
    {
      text: "Klien",
      value: "client.fullname",
      sortable: false,
      width: 250,
    },
    {
      text: "Tanggal",
      value: "createDate",
      sortable: false,
    },
    {
      text: "Status",
      value: "status.statusName",
      sortable: false,
    },
    {
      text: "Action",
      value: "action",
      sortable: false,
    },
  ];

  consultations = [] as any[];

  isLoading = false;

  async fetchConsultation() {
    this.isLoading = true;
    try {
      const resp = await this.consultationApi.get();
      this.consultations = resp.data.data;
    } catch (error) {
    } finally {
      this.isLoading = false;
    }
  }

  mounted() {
    this.fetchConsultation();
  }
}
</script>
