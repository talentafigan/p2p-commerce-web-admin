<template>
  <layout-container brandTitle="Student">
    <v-dialog v-model="dialogDetail" width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h6">Detail Student</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card class="px-6 py-5">
          <div class="d-flex justify-space-between align-center flex-row">
            <span class="text-subtitle-2">Nama Lengkap</span>
            <span class="text-subtitle-2">{{
              clientDetail.fullname ? clientDetail.fullname : "-"
            }}</span>
          </div>
          <div class="d-flex mt-4 justify-space-between align-center flex-row">
            <span class="text-subtitle-2">Username</span>
            <span class="text-subtitle-2">{{
              clientDetail.username ? clientDetail.username : "-"
            }}</span>
          </div>
          <div class="d-flex mt-4 justify-space-between align-center flex-row">
            <span class="text-subtitle-2">Email</span>
            <span class="text-subtitle-2">{{
              clientDetail.email ? clientDetail.email : "-"
            }}</span>
          </div>
          <div class="d-flex mt-4 justify-space-between align-center flex-row">
            <span class="text-subtitle-2">Nomor telepon</span>
            <span class="text-subtitle-2">{{
              clientDetail.phone ? clientDetail.phone : "-"
            }}</span>
          </div>
          <div class="d-flex mt-4 justify-space-between align-center flex-row">
            <span class="text-subtitle-2">Status</span>
            <span class="text-subtitle-2">{{
              clientDetail.user ? clientDetail.user?.status.statusName : "-"
            }}</span>
          </div>
          <div class="d-flex mt-4 justify-space-between align-center flex-row">
            <span class="text-subtitle-2">Saldo</span>
            <span>{{ $helpers.currencyFormat(clientDetail.balance) }} Koin</span>
          </div>
        </v-card>
      </v-card>
    </v-dialog>
    <v-card class="w-full mt-3" outlined>
      <v-data-table
        :headers="tableHeader"
        :items="client"
        :items-per-page="5"
        class="elevation-0 w-full"
      >
        <template #[`item.balance`]="row">
          <span class="text-subtitle-2"
            >{{ $helpers.currencyFormat(row.item.balance) }} Koin</span
          >
        </template>
        <template #[`item.createDate`]="row">
          <span class="text-subtitle-2">{{
            $helpers.fullDate(row.item.createDate)
          }}</span>
        </template>
        <template #[`item.action`]="row">
          <v-btn @click="onClickDetail(row.item.clientId)" color="primary" icon>
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
import { ClientApi } from "@/api/client.api";

@Component
export default class Mentor extends Vue {
  clientApi = new ClientApi();
  $helpers: any;
  tableHeader = [
    {
      text: "Nama",
      value: "fullname",
      sortable: false,
    },
    {
      text: "Username",
      value: "username",
      sortable: false,
    },
    {
      text: "Email",
      value: "email",
      sortable: false,
    },
    {
      text: "Nomor telepon",
      value: "phone",
      sortable: false,
    },
    {
      text: "Tanggal Daftar",
      value: "createDate",
      sortable: false,
    },
    {
      text: "Saldo",
      value: "balance",
      sortable: false,
    },
    {
      text: "Status",
      value: "user.status.statusName",
      sortable: false,
    },
    {
      text: "Aksi",
      value: "action",
      sortable: false,
    },
  ];

  dialogDetail = false;

  client = [] as any[];

  clientDetail = {} as any;

  $snackbar: any;

  isLoading = false;

  async fetchMentor() {
    this.isLoading = true;
    try {
      const resp = await this.clientApi.get();
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.client = resp.data.data;
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$snackbar.open({
        text: errorMessage,
      });
    } finally {
      this.isLoading = false;
    }
  }

  openId() {
    const openId = this.$route.query.openId as any;
    if (openId) {
      this.onClickDetail(openId);
    }
  }

  async onClickDetail(id: any) {
    try {
      const resp = await this.clientApi.getDetail(id);
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.clientDetail = resp.data.data;
      this.dialogDetail = true;
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$snackbar.open({
        text: errorMessage,
      });
    }
  }

  mounted() {
    this.fetchMentor();
    this.openId()
  }
}
</script>
