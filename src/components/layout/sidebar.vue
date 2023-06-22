<template>
  <v-list v-model="selected" nav dense>
    <v-list-item-group v-for="(group, i) in items" :key="i" color="primary">
      <template>
        <v-subheader v-if="group.title">{{ group.title }}</v-subheader>
        <template v-for="(menu, j) in group.child">
          <template v-if="menu.child">
            <v-list-group :key="j" no-action>
              <template #activator>
                <v-list-item-icon>
                  <v-icon color="" size="22">{{ menu.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ menu.title }}</v-list-item-title>
                </v-list-item-content>
              </template>
              <template v-for="(child, ci) in menu.child">
                <v-list-item :key="ci" :to="child.to">
                  <v-list-item-content>
                    <v-list-item-title>{{ child.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-group>
          </template>
          <template v-if="menu.to && !menu.child">
            <v-list-item :key="j" :to="menu.to">
              <v-list-item-icon>
                <v-icon size="22">{{ menu.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ menu.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </template>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { interfaceSidebar } from "@/types/interface";

@Component
export default class LayoutSidebar extends Vue {
  get currentRouter() {
    return this.$route.path;
  }

  selected = null;
  items: interfaceSidebar[] = [
    {
      child: [
        {
          icon: "mdi-chart-box-outline",
          title: "Dashboard",
          to: "/",
        },
      ],
    },
    {
      title: "Menu",
      child: [
        {
          icon: "mdi-forum-outline",
          title: "Consultation",
          to: "/consultation",
        },
      ],
    },
    {
      title: "Data",
      child: [
        {
          title: "Mentor",
          icon: "mdi-account-tie",
          to: "/seller",
        },
        {
          title: "Student",
          icon: "mdi-account-school",
          to: "/client",
        },
        {
          title: "Transaksi",
          icon: "mdi-list-box-outline",
          to: "/transaction",
        },
      ],
    },
  ];
}
</script>

<style></style>
