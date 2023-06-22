<template>
  <v-app-bar height="55" outlined elevation="0" fixed app>
    <v-app-bar-nav-icon @click.stop="$emit('on-click-drawer')" />
    <v-spacer />
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class LayoutAppbar extends Vue {}
</script>
