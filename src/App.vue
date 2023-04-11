<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { Ref, ref, watchEffect } from "vue";
import { buildingsArray } from "./vanilla_building_types";

let buildingProperties: string[] = [
  "Key",
  "ID",
  "Class",
  "Counter",
  "Order",
  "Limit",
  "Crucial",
  "WForce",
  "Alloc",
  "Branch",
  "Scaling",
];

const isShowingResults: Ref<boolean> = ref(false);
const isUploading: Ref<boolean> = ref(false);
const rowCount: Ref<number> = ref(0);

watchEffect(() => {
  if (isShowingResults.value) {
    console.log("Showing results");
  }
  if (isUploading.value) {
    console.log("Uploading");
  }
});
</script>

<template>
  <div class="container m-6">
    <div class="flex flex-col gap-4 items-center">
      <!-- Title Row -->
      <article class="prose">
        <h1>ARoAI<font-awesome-icon :icon="['fas', 'plus']" /></h1>
      </article>

      <!-- Button Row -->
      <div class="flex flex-row gap-4">
        <button class="btn gap-2" @click="isShowingResults = !isShowingResults">
          Show
          <font-awesome-icon :icon="['fas', 'eye']" />
        </button>
        <button class="btn gap-2">
          Upload
          <font-awesome-icon :icon="['fas', 'file-arrow-up']" />
        </button>
      </div>

      <!-- Table Row -->
      <div class="overflow-x-scroll">
        <table class="table table-zebra table-compact w-full">
          <!-- FIXME: doesn't stick to top >:( -->
          <thead class="sticky top-0">
            <tr>
              <th v-for="property in buildingProperties" :key="property">
                {{ property }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="building in buildingsArray" :key="building.key">
              <td v-for="item in building" :key="building.key">
                {{ item }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
