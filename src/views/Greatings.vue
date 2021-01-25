<template>
  <div class="mt-32 grid grid-cols-1 mb-32">
    <h1 class="text-3xl font-bold uppercase text-center text-red-600">Gracias por completar el formulario</h1>
     <div class="text-center mt-7">
        ¡En menos de 24 horas! 
        </div>
        <div class="text-center">-
         ¡Nuestro equipo de profesionales se contactará para evaluar la necesidad y ofrecer una 
        </div>
         <div class="text-center"> solución alineado a sus expectativas!
         </div>
    <a href="https://aimtalent.pe/es/#HomeServices" target="_blank" 
      class="my-7 mx-auto lg:uppercase font-bold bg-red-500 text-white rounded-full w-auto px-10 py-2">ver servicios
    </a>
  </div>  
</template>
 
 
<script>
export default {
  name: "Greatings",
  mounted() {
    const ValidateSucces = JSON.parse(localStorage.getItem('success'))
    if (ValidateSucces !== true) this.$router.push('/')  
  },
  unmounted(){
    localStorage.removeItem('success')
  }
}
</script>
 