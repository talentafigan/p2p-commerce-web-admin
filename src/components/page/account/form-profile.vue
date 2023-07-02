<template>
  <v-card elevation="0" class="pa-6">
    <span class="text-h6">Data Diri</span>
    <v-form ref="form" @submit.prevent="onSave" class="mt-4">
      <v-text-field
        label="Nama"
        :rules="rules.fullname"
        hide-details="auto"
        v-model="form.fullname"
      ></v-text-field>
      <v-text-field
        :rules="rules.username"
        class="mt-4"
        v-model="form.username"
        label="Username"
        hide-details="auto"
      ></v-text-field>
      <v-alert
        class="w-full ma-0 mt-4"
        v-if="showErrorMessage"
        dense
        type="error"
        text
      >
        {{ errorMessage }}
      </v-alert>
      <v-btn
        @click="onSave"
        class="mt-5"
        :disabled="isLoading"
        :loading="isLoading"
        depressed
        color="accent"
        >Simpan</v-btn
      >
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { ProfileApi } from "@/api/profile.api";
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class PageAccountFormProfile extends Vue {
  form = {
    fullname: "",
    username: "",
  };

  $refs: any;

  showErrorMessage = false;
  isLoading = false;
  errorMessage = "";

  async onSave() {
    if (!this.$refs.form.validate()) return;
    this.showErrorMessage = false;
    this.isLoading = true;
    try {
      const response = await this.profileApi.update(this.form);
      if (response.data.status !== "SUCCESS") {
        this.showErrorMessage = true;
        this.errorMessage = response.data.message;
        return;
      }
      this.$snackbar.open({
        text: "Berhasil Update Profil!",
      });
    } catch (error: any) {
      this.showErrorMessage = true;
      this.errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
    } finally {
      this.isLoading = false;
    }
  }

  rules = {
    fullname: [(v: any) => !!v || "Nama lengkap harus diisi."],
    username: [
      (v: any) => !!v || "Username harus diisi.",
      (v: string) =>
        /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(v) === false ||
        "Username hanya boleh berupa huruf dan nomor",
    ],
  };

  profileApi = new ProfileApi();

  $snackbar: any;

  async fetchProfile() {
    try {
      const resp = await this.profileApi.me();
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.form = resp.data.data.user;
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
    this.fetchProfile();
  }
}
</script>
