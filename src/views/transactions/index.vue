<template>
  <layout-container brandTitle="Transaksi">
    <v-dialog v-model="dialogDetail" width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6">Detail Transaksi</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card class="pa-5">
          <div class="d-flex justify-space-between flex-row w-full">
            <span class="text-subtitle-2">ID. Transaksi </span>
            <span class="text-subtitle-2">{{
              transactionDetail.productTransactionId
                ? transactionDetail.productTransactionId
                : "-"
            }}</span>
          </div>
          <div class="d-flex mt-2 justify-space-between flex-row w-full">
            <span class="text-subtitle-2">Tanggal Transaksi </span>
            <span class="text-subtitle-2">{{
              $helpers.fullDate(transactionDetail.createDate)
            }}</span>
          </div>
          <div class="d-flex mt-2 justify-space-between flex-row w-full">
            <span class="text-subtitle-2">Status </span>
            <span class="text-subtitle-2">{{
              transactionDetail.productTransactionStatus
                ? transactionDetail.productTransactionStatus
                    .productTransactionStatusName
                : "-"
            }}</span>
          </div>
          <div class="d-flex mt-2 justify-space-between flex-row w-full">
            <span class="text-subtitle-2">Student </span>
            <span
              @click="$router.push('/client/id')"
              class="text-subtitle-2 cursor-pointer font-weight-bold primary--text"
              >Student Name</span
            >
          </div>
          <v-divider class="my-4"></v-divider>
          <div class="d-flex justify-space-between align-center flex-row">
            <span class="font-weight-bold text-subtitle-2">Detail Kelas</span>
            <div
              @click="$router.push('/seller/id')"
              class="d-flex justify-center align-center flex-row"
            >
              <v-icon>mdi-account</v-icon>
              <span class="cursor-pointer font-weight-bold text-subtitle-2 ml-1"
                >Seller Name</span
              >
            </div>
          </div>
          <v-card class="mt-2 pa-4" outlined>
            <v-row align="center" class="ma-0" no-gutters dense>
              <v-col cols="8">
                <v-row class="ma-0" align="center" no-gutters dense>
                  <v-col cols="3">
                    <img
                      style="width: 100%; height: 70px; object-fit: cover"
                      src="https://static.vecteezy.com/system/resources/thumbnails/004/579/363/small_2x/digital-marketing-and-seo-optimization-strategy-free-vector.jpg"
                      alt=""
                    />
                  </v-col>
                  <v-col cols="9">
                    <div class="px-4 d-flex justify-center flex-column">
                      <span class="text-subtitle-1 font-weight-bold"
                        >2 Jam Mahir Digital Marketing</span
                      >
                      <span class="text-subtitle-2 mt-2">Rp.80.000</span>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="4">
                <div
                  style="border-left: 1px dashed rgb(199, 199, 199)"
                  class="px-4 d-flex w-full justify-center align-end flex-column"
                >
                  <span class="text-subtitle-2 font-weight-bold"
                    >Total Transaksi</span
                  >
                  <span class="text-subtitle-2 mt-2">Rp.90.034</span>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
      </v-card>
    </v-dialog>
    <v-card class="w-full mt-3" outlined>
      <v-data-table
        :headers="tableHeader"
        :items="transaction"
        :items-per-page="5"
        class="elevation-0 w-full"
      >
        <template #[`item.createDate`]="row">
          <span class="text-subtitle-2">{{
            $helpers.fullDate(row.item.createDate)
          }}</span>
        </template>
        <template #[`item.action`]="row">
          <v-btn
            @click="onClickDetail(row.item.transactionId)"
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
import { TransactionApi } from "@/api/transaction.api";
import router from "@/router";

interface IProductTransaction {
  productTransactionId: number | string;
  client: any;
  productTransactionStatus: any;
  amount: any;
  product: any;
  createDate: any;
  proof: any;
  canceledDate: any;
}

@Component
export default class ProductTransaction extends Vue {
  transactionApi = new TransactionApi();
  $helpers: any;
  dialogFilter = false;
  tableHeader = [
    {
      text: "Student",
      value: "client.fullname",
      sortable: false,
    },
    {
      text: "Mentor",
      value: "seller.fullname",
      sortable: false,
    },
    {
      text: "Kelas",
      value: "product.name",
      sortable: false,
    },
    {
      text: "Tanggal",
      value: "createDate",
      sortable: false,
    },
    {
      text: "Nominal Transaksi",
      value: "amount",
      sortable: false,
    },
    {
      text: "Status",
      value: "productTransactionStatus",
      sortable: false,
    },
    {
      text: "Action",
      value: "action",
      sortable: false,
    },
  ];

  dialogDetail = false;

  transaction = [] as IProductTransaction[];

  transactionDetail = {} as IProductTransaction;

  $snackbar: any;

  isLoading = false;

  async fetchTransaction() {
    this.isLoading = true;
    try {
      const resp = await this.transactionApi.get();
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.transaction = resp.data.data;
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
      const resp = await this.transactionApi.getDetail(id);
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.transactionDetail = resp.data.data;
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
    this.fetchTransaction();
  }
}
</script>
