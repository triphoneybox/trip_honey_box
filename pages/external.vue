<script setup lang="ts">
const id = ref(1)
const { data: data, pending, error } = await useFetch(() => `http://ec2-13-237-83-72.ap-southeast-2.compute.amazonaws.com/api/ssg/brand/save/list`)

/* Same as:
const { data: product, pending, error } = await useAsyncData(() => {
  return $fetch(`https://dummyjson.com/products/${id.value}`)
}, {
  watch: [id]
})
*/

const canDecrease = computed(() => id.value > 1)
</script>

<template>
  <div class="flex flex-col gap-2">
    <p v-if="pending">Fetching...</p>
    <pre v-else-if="error">{{ error }}</pre>
    <div v-else>
      총 {{ data.length }} 개
      <template
        v-for="(ad, idx) in data"
        :key="idx"
      >
      <div>
        <a :href="'https://www.ssgdfs.com/kr/dispctg/brand/'+ad.brandNameEN">
          <span class="text-blue">{{ ad.categoryName }} >>> {{ ad.brandNameKR }}</span>
        </a>
      </div>
      <!-- <v-row>
        <v-col>
          {{ ad.brandNameEN }}
        </v-col>
        <v-col>
          링크 {{ ad.brandNameEN }}
        </v-col>
      </v-row> -->
      </template>
    </div>
    <NuxtLink class="underline" to="/">Back to Home</NuxtLink>
  </div>
</template>
