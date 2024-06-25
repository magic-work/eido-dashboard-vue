<template>
  <div class="card">
    <ul>
			<li v-for="number in [1, 2, 3, 4]" :key="number" class="mb-4">
        <div class="flex">
          <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
          <div class="self-center flex-1">
            <Skeleton width="100%" class="mb-2"></Skeleton>
            <Skeleton width="75%"></Skeleton>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import Skeleton from 'primevue/skeleton';

</script>
