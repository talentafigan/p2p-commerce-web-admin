<template>
  <v-app>
    <v-row align="center" justify="center" class="ma-0 w-full" dense no-gutters>
      <v-col cols="4">
        <v-card
          outlined
          elevation="0"
          rounded="0"
          class="py-12 px-6 d-flex justify-center align-start flex-column"
        >
          <div class="d-flex justify-center flex-column align-center w-full">
            <span class="text-h5 font-weight-bold">Sign In</span>
            <span class="text-subtitle-2 mt-3"
              >Use your administrator account</span
            >
          </div>
          <v-form class="mt-12">
            <v-row dense class="ma-0">
              <v-col cols="12">
                <v-text-field
                  outlined
                  label="Username"
                  class="mt-2"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col class="mt-3" cols="12">
                <v-text-field
                  class="mt-2"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  outlined
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Enter Your Password"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <span class="text-subtitle-2 mt-5"
            >Not your computer? Use Guest mode to login privately.</span
          >
          <v-checkbox hide-details="auto" class="ma-0 mt-12 pa-0" dense>
            <template #label>
              <span class="text-subtitle-2">Keep me logged in</span>
            </template>
          </v-checkbox>
          <v-btn
            @click="onClickLogin"
            class="mt-4"
            block
            :loading="isLoading"
            large
            depressed
            color="accent"
            >Login</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import UserData from "@/utils/data/users.json";

@Component
export default class AuthLogin extends Vue {
  $helpers: any;
  isLoading = false;

  showPassword = false

  async onClickLogin() {
    this.isLoading = true;
    try {
      const payload = {
        token: this.$helpers.generateUUID(),
        user: UserData[0],
      };
      await this.$helpers.shortSetTimeOut(2000);
      this.$store.commit("auth/setAuth", payload);
      this.$nextTick(() => {
        window.location.reload();
      });
    } catch (error) {
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
