<template>
  <layout-container brandTitle="Mentor">
    <v-dialog v-model="dialogDetail" width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h6">Detail Mentor</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card class="px-6 py-5">
          <div class="d-flex justify-center align-center flex-row">
            <v-avatar size="100">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </div>
          <div class="d-flex mt-4 justify-space-between align-center flex-row">
            <span class="text-subtitle-2">Nama Lengkap</span>
            <span class="text-subtitle-2">{{
              sellerDetail.fullname ? sellerDetail.fullname : "-"
            }}</span>
          </div>
          <div class="d-flex mt-4 justify-space-between align-center flex-row">
            <span class="text-subtitle-2">Username</span>
            <span class="text-subtitle-2">{{
              sellerDetail.username ? sellerDetail.username : "-"
            }}</span>
          </div>
          <div class="d-flex mt-4 justify-space-between align-center flex-row">
            <span class="text-subtitle-2">Email</span>
            <span class="text-subtitle-2">{{
              sellerDetail.email ? sellerDetail.email : "-"
            }}</span>
          </div>
          <div class="d-flex mt-4 justify-space-between align-center flex-row">
            <span class="text-subtitle-2">Nomor telepon</span>
            <span class="text-subtitle-2">{{
              sellerDetail.phone ? sellerDetail.phone : "-"
            }}</span>
          </div>
          <div class="d-flex mt-4 justify-space-between align-center flex-row">
            <span class="text-subtitle-2">Status</span>
            <span class="text-subtitle-2">{{
              sellerDetail.status?.statusName
                ? sellerDetail.status?.statusName
                : "-"
            }}</span>
          </div>
          <div class="d-flex mt-4 justify-space-between align-center flex-row">
            <span class="text-subtitle-2">Transaksi berhasil</span>
            <span>{{ $helpers.currencyFormat(1000) }}</span>
          </div>
        </v-card>
      </v-card>
    </v-dialog>
    <v-card class="w-full mt-3" outlined>
      <v-data-table
        :headers="tableHeader"
        :items="seller"
        :items-per-page="5"
        class="elevation-0 w-full"
      >
        <template #[`item.createDate`]="row">
          <span class="text-subtitle-2">{{
            $helpers.fullDate(row.item.createDate)
          }}</span>
        </template>
        <template #[`item.action`]="row">
          <v-menu bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-on="on" v-bind="attrs" depressed small color="primary"
                >Aksi
                <v-icon class="ml-1" dense small>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list nav dense>
              <v-list-item-group color="primary">
                <v-list-item @click="onClickDetail(row.item.sellerId)">
                  <v-list-item-content>
                    <v-list-item-title>Akun</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Approve</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
  </layout-container>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { SellerApi } from "@/api/seller.api";

@Component
export default class Mentor extends Vue {
  sellerApi = new SellerApi();
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
      text: "Status",
      value: "status.statusName",
      sortable: false,
    },
    {
      text: "Aksi",
      value: "action",
      sortable: false,
    },
  ];

  dialogDetail = false;

  seller = [{}] as any[];

  sellerDetail = {} as any;

  $snackbar: any;

  isLoading = false;

  async fetchMentor() {
    this.isLoading = true;
    try {
      const resp = await this.sellerApi.get();
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.seller = resp.data.data;
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

  async onClickDetail(id: any) {
    try {
      const resp = await this.sellerApi.getDetail(id);
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.sellerDetail = resp.data.data;
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
  }
}
</script>
