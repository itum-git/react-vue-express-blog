<script setup>
import { Error } from '@/components/Error'
import { useRouter } from 'vue-router'

const { push, getRoutes } = useRouter()

const errorClick = () => {
  const routes = getRoutes()
  push(routes[0]?.path)
}
</script>

<template>
  <Error @error-click="errorClick" />
</template>
