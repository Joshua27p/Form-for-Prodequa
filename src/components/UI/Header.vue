<template>
  <div class="flex py-1 justify-end bg-indigo-800 text-white ">
    <nav class="flex font-bold text-sm">
      <router-link to="/">
        <a class="mx-1 hover:text-yellow-400 transition duration-500 ease-in-out" href="#">Home</a>
      </router-link>
      <router-link to="/adminpanel">
        <a class="mx-1 hover:text-yellow-400 transition duration-500 ease-in-out" href="#">Admin-Panel</a>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  name: "Header"
}
</script>