<template>
    <layout-container brandTitle="Pengaturan Akun">
      <v-card class="w-full">
        <v-tabs v-model="tab">
          <v-tab key="0">Data Diri</v-tab>
          <v-tab key="1">Kata Sandi</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item key="0">
            <v-row dense class="ma-0">
              <v-col md="7">
                <page-account-form-profile />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item key="1">
            <v-row dense class="ma-0">
              <v-col md="7">
                <page-account-form-password />
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </layout-container>
  </template>
  
  <script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  
  @Component
  export default class AccountProfile extends Vue {
    tab = 0;
  }
  </script>