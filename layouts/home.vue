<script setup lang="ts"></script>

<template>
  <div class="pt-16 pb-12 sm:pb-4 lg:pt-12">
    <div class="lg:px-8">
      <div class="lg:max-w-4xl">
        <div class="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
          <h1 class="text-2xl font-bold leading-7 text-slate-900">Articles</h1>
        </div>
      </div>
    </div>

    <!-- articles -->
    <div
      class="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100"
    >
      <slot> </slot>
    </div>
  </div>
</template>
