<template>
  <h1>Dashboard</h1>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    middleware:'authenticated',
    data: () => ({
      drawer: null
    }),
  }
</script>
