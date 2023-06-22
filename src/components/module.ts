import vue from "vue";

export default function setup() {
  vue.component("layout-container", require("@/components/layout/container.vue").default);
  vue.component("layout-appbar", require("@/components/layout/appbar.vue").default);
  vue.component("layout-sidebar", require("@/components/layout/sidebar.vue").default);
  vue.component("common-pagination" , require("@/components/common/pagination.vue").default);
  vue.component("common-image-bulk-picker" , require("@/components/common/image-bulk/picker.vue").default)
  vue.component("common-image-bulk-preview" , require("@/components/common/image-bulk/preview.vue").default)
  vue.component("page-dashboard-card-analytic", require("@/components/page/dashboard/card-analytic.vue").default)
  vue.component("page-dashboard-chart-order-sales", require("@/components/page/dashboard/chart-order-sales.vue").default)
  vue.component("page-dashboard-chart-order-category", require("@/components/page/dashboard/chart-order-category.vue").default)
}
