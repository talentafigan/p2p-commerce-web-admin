<template>
  <v-card elevation="0" class="pa-6">
    <span class="text-h6">Ubah Kata Sandi</span>
    <v-form ref="form" class="mt-4">
      <v-text-field
        class="mt-4"
        :rules="rules.newPassword"
        @click:append="showNewPassword = !showNewPassword"
        :type="showNewPassword ? 'text' : 'password'"
        :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
        v-model="form.newPassword"
        label="Password Baru"
        hide-details="auto"
      ></v-text-field>
      <v-text-field
        label="Konfirmasi Password"
        class="mt-4"
        :rules="rules.confirmPassword"
        @click:append="showConfirmPassword = !showConfirmPassword"
        :type="showConfirmPassword ? 'text' : 'password'"
        :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
        v-model="form.confirmPassword"
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
    newPassword: "",
    confirmPassword: "",
  };

  rules = {
    newPassword: [(v: any) => !!v || "Wajib di isi."],
    confirmPassword: [
      (v: any) => !!v || "Wajib di isi.",
      (v: any) => v === this.form.newPassword || "Password tidak sama.",
    ],
  };

  showNewPassword = false;
  showConfirmPassword = false;

  profileApi = new ProfileApi();

  $refs: any;
  $snackbar: any;

  showErrorMessage = false;
  isLoading = false;
  errorMessage = "";

  async onSave() {
    if (!this.$refs.form.validate()) return;
    this.showErrorMessage = false;
    this.isLoading = true;
    try {
      const response = await this.profileApi.changePassword(this.form);
      if (response.data.status !== "SUCCESS") {
        this.showErrorMessage = true;
        this.errorMessage = response.data.message;
        return;
      }
      this.$snackbar.open({
        text: "Berhasil Ubah Kata sandi!",
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
}
</script>
