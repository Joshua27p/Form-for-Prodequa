<template>
  <div>
    <nav>
      <li class="flex justify-end">
          <router-link to="/"><a class="mx-1" href="#">Home</a></router-link> 
         <router-link to="/adminpanel"> <a class="mx-1" href="#">Admin-Panel</a></router-link> 
      </li>
    </nav>
  </div>
</template>
<script>
export default {
  name: "Header"
}
</script>