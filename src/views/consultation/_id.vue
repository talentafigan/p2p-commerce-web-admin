<template>
  <layout-container back brandTitle="Konsultasi">
    <v-row no-gutters dense class="w-full">
      <v-col cols="12">
        <v-card class="pa-4" rounded="0" outlined elevation="0">
          <v-avatar color="primary" size="40" class="cursor-pointer">
            <span class="white--text">{{
              $store.state.auth.user
                ? $helpers.intialString(consultation?.client?.fullname)
                : "-"
            }}</span>
          </v-avatar>
          <span class="ml-2 text-subtitle-1 font-weight-bold">{{
            consultation?.client?.fullname
          }}</span>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card
          style="height: 55vh; overflow-y: auto"
          class="pa-4"
          rounded="0"
          outlined
          elevation="0"
        >
          <v-row v-for="item in chats" dense no-gutters>
            <v-col cols="12">
              <div
                :class="[
                  'w-full d-flex align-center flex-row my-1',
                  item.creators?.userId === $store.state.auth.user.userId
                    ? 'justify-end'
                    : 'justify-start',
                ]"
              >
                <v-card
                  style="max-width: 50%"
                  :class="[
                    'pa-3 d-flex flex-column rounded',
                    item.creators?.userId === $store.state.auth.user.userId
                      ? 'primary align-end text-end'
                      : 'white border align-start text-start',
                  ]"
                >
                  <span
                    :class="[
                      'text-subtitle-1',
                      item.creators?.userId === $store.state.auth.user.userId
                        ? 'white--text'
                        : 'black--text',
                    ]"
                    >{{ item.content }}</span
                  >
                  <span
                    :class="[
                      'text-caption mt-2',
                      item.creators?.userId === $store.state.auth.user.userId
                        ? 'white--text'
                        : 'black--text',
                    ]"
                    >{{ $helpers.fullDate(item.createDate) }}</span
                  >
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card
          class="pa-3 d-flex flex-row align-center"
          rounded="0"
          outlined
          elevation="0"
        >
          <v-textarea
            placeholder="Masukan pesan..."
            solo
            hide-details="auto"
            dense
            v-model="formChat.content"
            rows="2"
          ></v-textarea>
          <v-btn @click="onSendMessage" class="ml-3" color="primary" icon>
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </layout-container>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ConsultationApi } from "@/api/consultation.api";
import { ChatApi } from "@/api/chat.api";
import { Watch } from "vue-property-decorator";

@Component
export default class ConsultationDetail extends Vue {
  consultationApi = new ConsultationApi();
  chatApi = new ChatApi();
  $helpers: any;

  consultation = null as any;
  chats = [] as any[];

  formChat = {
    content: null,
    attachment: null,
  };

  isLoading = false;
  $snackbar: any;

  timerRefecthChat = 0;

  @Watch("timerRefecthChat", {
    immediate: true,
  })
  async refetchChat(val: any) {
    if (val > 0) {
      setTimeout(() => {
        this.timerRefecthChat--;
      }, 1000);
    } else {
      if (this.consultation === null) {
        this.timerRefecthChat = 5;
        return;
      }
      await this.fetchChat();
      this.timerRefecthChat = 5;
    }
  }

  async fetchConsultation() {
    this.isLoading = true;
    const id = this.$route.params.id as string;
    try {
      const resp = await this.consultationApi.getDetail(id);
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.consultation = resp.data.data;
      this.fetchChat();
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

  async onSendMessage() {
    try {
      const resp = await this.chatApi.send({
        ...this.formChat,
        conversationId: this.consultation.conversationId,
      });
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.formChat = {
        content: null,
        attachment: null,
      };
      this.fetchChat();
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$snackbar.open({
        text: errorMessage,
      });
    }
  }

  async fetchChat() {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await this.chatApi.getByConversationId(
          this.consultation.conversationId
        );
        if (resp.data.status !== "SUCCESS") {
          return;
        }
        this.chats = resp.data.data;
      } catch (error: any) {
      } finally {
        resolve(true);
      }
    });
  }

  mounted() {
    this.fetchConsultation();
  }
}
</script>
