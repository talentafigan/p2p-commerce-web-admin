<template>
  <v-card
    rounded="0"
    outlined
    elevation="0"
    style="border-left: 4px solid #007afc"
    class="w-full py-2 px-4 d-flex justify-start align-start flex-column"
  >
    <span class="grey--text" style="font-size: 14px">{{ title }}</span>
    <span class="font-weight-bold mt-2" style="font-size: 26px">{{
      content
    }}</span>
    <span class="mt-1 grey--text" style="font-size: 12px;">{{
      description
    }}</span>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class PageDashboardCardAnalytic extends Vue {
  @Prop({ type: String })
  color!: string;
  @Prop({ type: String })
  title!: string;
  @Prop({ type: String })
  content!: string;
  @Prop({ type: String })
  description!: string;
}
</script>
