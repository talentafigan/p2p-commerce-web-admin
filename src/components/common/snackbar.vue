<template>
    <v-snackbar
      :timeout="duration"
      :top="
        position === 'top-center' ||
        position === 'top-left' ||
        position === 'top-right'
      "
      :bottom="
        position === 'bottom-center' ||
        position === 'bottom-left' ||
        position === 'bottom-right'
      "
      :left="position === 'bottom-left' || position === 'top-left'"
      :right="position === 'bottom-right' || position === 'top-right'"
      v-model="show"
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="onClose"> Tutup </v-btn>
      </template>
    </v-snackbar>
  </template>
  
  <script lang="ts">
  import { Component, Prop } from "vue-property-decorator";
  import Vue from "vue";
  
  @Component
  export default class CommonSnackbar extends Vue {
    @Prop()
    text!: string;
    @Prop({ default: "top-center", required: false })
    position!: string;
    @Prop({ default: 5000, required: false })
    duration!: number;
  
    $el: any;
  
    show = false;
  
    onClose() {
      this.show = false;
      this.destroySnackbar();
    }
  
    mounted() {
      this.show = true;
    }
  
    destroySnackbar() {
      this.$destroy();
      this.$el.remove();
    }
  }
  </script>