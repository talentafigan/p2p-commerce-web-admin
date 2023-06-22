<template>
  <div
    style="
      height: 70px;
      width: 70px;
      position: relative;
      border: 1px dashed #000000;
    "
    class="d-flex justify-center rounded align-center"
  >
    <v-icon
      small
      color="blue-grey lighten-3"
      @click="onDelete"
      style="cursor: pointer; position: absolute; top: 3px; right: 3px"
    >
      mdi-close-circle
    </v-icon>
    <img
      v-if="value"
      class="rounded"
      style="width: 100%; height: 100%; object-fit: cover"
      :src="value"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class CommonImageBulkPicker extends Vue {
  @Prop({ type: [String] })
  value!: string;

  onDelete() {
    this.$emit("delete");
  }
}
</script>
