<template>
  <Header />
  <router-view/>
  <Footer />
</template>

<script>
 import Footer from './components/UI/Footer.vue'
 import Header from './components/UI/Header.vue'
  export default {
    name: 'App',
    components: {
      Footer,
      Header
    }
  }
</script>

