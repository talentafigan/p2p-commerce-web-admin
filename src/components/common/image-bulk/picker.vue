<template>
  <div
    @click="onClick"
    style="width: 70px; height: 70px; border: 1px dashed #ff6a00"
    class="cursor-pointer d-flex justify-center flex-column text-center rounded align-center"
    ref="picker"
  >
    <input
      id="fileUpload"
      ref="upload"
      style="display: none"
      @change="onInput"
      type="file"
      :multiple="false"
      accept="image/*"
    />
    <div class="d-flex justify-center align-center flex-column">
      <v-icon color="primary"> mdi-plus </v-icon>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class CommonImageBulkPicker extends Vue {
  onClick() {
    const fileupload = this.$el.firstElementChild as HTMLElement;
    if (fileupload) {
      fileupload.click();
    }
  }
  onInput(event: any) {
    this.$emit("on-file-selected", event.target.files[0]);
  }
}
</script>
