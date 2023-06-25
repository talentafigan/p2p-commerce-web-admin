<template>
  <v-app>
    <v-row align="center" justify="center" class="ma-0 w-full" dense no-gutters>
      <v-col cols="4">
        <v-card
          outlined
          elevation="0"
          rounded="0"
          class="py-12 px-6 rounded-lg d-flex justify-center align-start flex-column"
        >
          <div class="d-flex justify-center flex-column align-start w-full">
            <span class="text-h5 font-weight-bold">Masuk</span>
            <span class="text-subtitle-2 mt-3">Sign in untuk melanjutkan. </span>
          </div>
          <v-form @submit.prevent="onClickLogin" class="mt-3">
            <v-row dense class="ma-0">
              <v-col cols="12">
                <v-text-field
                  outlined
                  v-model="form.key"
                  label="Masukan  Username"
                  class="mt-2"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col class="mt-3" cols="12">
                <v-text-field
                  class="mt-2"
                  v-model="form.password"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  outlined
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Masukan Password"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
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
            @click="onClickLogin"
            class="mt-4"
            block
            :disabled="!form.key || !form.password || isLoading"
            :loading="isLoading"
            large
            depressed
            color="accent"
            >Masuk</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { AuthApi } from "@/api/auth.api";
import { ProfileApi } from "@/api/profile.api";

@Component
export default class AuthLogin extends Vue {
  $helpers: any;
  isLoading = false;

  showPassword = false;

  showErrorMessage = false;
  errorMessage = "";

  form = {
    key: "",
    password: "",
  };

  authApi = new AuthApi();

  profileApi = new ProfileApi();

  async onClickLogin() {
    if (!this.form.key || !this.form.password) return;
    this.showErrorMessage = false;
    this.isLoading = true;
    try {
      const response = await this.authApi.login(this.form);
      if (response.data.status !== "SUCCESS") {
        this.showErrorMessage = true;
        this.errorMessage = response.data.message;
        return;
      }
      const profile = await this.profileApi.me(response.data.data.accessToken);
      if (profile.data.status !== "SUCCESS") return;
      this.$store.commit("auth/setAuth", {
        token: response.data.data.accessToken,
        user: profile.data.data.user,
        loginDate: new Date().toISOString(),
      });
      this.$nextTick(() => {
        window.location.reload();
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
