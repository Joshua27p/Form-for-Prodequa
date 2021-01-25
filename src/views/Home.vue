<template>
    <!-- Título   -->
    <div class="relative">
      <img class="absolute w-52 hidden lg:block" src="../assets/bordeleft.png" alt="borde-left" />
      <img class="absolute right-0 bottom-0  w-52 hidden lg:block" src="../assets/borderright.png" alt="borde-left" />
      
      <h2 class="text-center text-3xl font-bold w-full box-border text-red-600 mt-8 mb-5">CONOZCÁMONOS</h2>
      <div class="p-7">
       <p class="text-center">Complete este formulario para contactar con el equipo de profesionales de AimTalent.<br>
          ¡Evaluaremos la necesidad para ofrecerle una solución alineado a sus expectativas!
       </p>
    </div> 
      <!-- formulario -->
      <!-- para recoger el lo que pase con el submit se utiliza v-on:submit.prevent en la etiqueta  form  -->
    <form class="w-full mx-auto max-w-4xl" v-on:submit.prevent="sendForm();">
    <!-- contenedor izquierdo -->
      <div class="flex flex-col md:flex-row justify-center md:px-20 p-5">
        <div class="flex flex-col md:w-1/2">
        <!-- validacion de nombre -->
          <div class="mb-3 md:mx-2">
            <input v-bind:class="[invalid['name'].length > 0 ? 'border-red-400': ' border-blue-600 ']" class="w-full text-xs rounded-lg border-2 p-3" type="text" name="name" placeholder="Nombre y apellido" title="Nombre solo acepta letras y espacios en blanco" v-model="contact.name" @blur="validateText('name')" required>
            <span class="ml-2 text-red-400 text-xs" v-if="invalid['name'].length > 0">*{{this.invalid['name']}}</span>
          </div>
          <!-- validación de profesión -->
          <div class="mb-3 md:mx-2">
            <input v-bind:class="[invalid['profession'].length > 0 ? 'border-red-400': ' border-blue-600 ']" class="text-xs rounded-lg border-2 w-full p-3" type="text" name="cargo" placeholder="Cargo" v-model="contact.profession" @blur="validateText('profession')" required>
            <span  class="mb-1 ml-2 text-red-400 text-xs" v-if="invalid['profession'].length > 0">*{{this.invalid['profession']}}</span>
          </div>
          <!-- validacion de phone -->
          <div class="mb-3 md:mx-2">
            <input v-bind:class="[invalid['phone'].length > 0 ? 'border-red-400': ' border-blue-600 ']" class="w-full text-xs rounded-lg border-2 p-3" type="number" name="phone" placeholder="Celular" v-model="contact.phone" @blur="validateNumber('phone', 9)">
            <span class="mb-1 ml-2 text-red-400 text-xs" v-if="invalid['phone']">*{{this.invalid['phone']}}</span>
          </div>
            <!-- validación de Email -->
          <div class="mb-3 md:mx-2">
            <input v-bind:class="[invalid['mail'].length > 0 ? 'border-red-400': ' border-blue-600 ']" class="w-full text-xs rounded-lg border-2 p-3" type="email" name="email" placeholder="Email" title="Email incorrecto"  required v-model="contact.mail" @blur="validateEmail">
            <span class="mb-1 ml-2 text-red-400 text-xs" v-if="invalid.mail.length > 0">*{{this.invalid.mail}}</span>
          </div>
        </div>
          <!-- contenedor izquierdo -->
          <!-- contenedor derecho -->
        <div class="flex flex-col md:w-1/2">
          <!-- validación de RUC -->
          <div class="mb-3 md:mx-2">
            <input v-bind:class="[invalid['RUC'].length > 0 ? 'border-red-400': ' border-blue-600 ']" class="w-full text-xs rounded-lg border-2 p-3" type="number" name="RUC" placeholder="Razón social" v-model="contact.RUC" @blur="validateNumber('RUC', 12)" required>
            <span class="mb-1 ml-2 text-red-400 text-xs" v-if="invalid['RUC']">*{{this.invalid['RUC']}}</span> 
          </div>
            <!-- information  -->
          <div class="md:mx-2 mb-3">
             <select v-bind:class="[invalid['information'].length > 0 ? 'border-red-400': ' border-blue-600 ']" class="w-full text-xs rounded-lg border-2  p-2" name="information" placeholder="Indicanos tu necesidad" required v-model="contact.information" @blur="validateInformation"> 
              <option>Atracción y Selección</option>
              <option>Evaluación Psicolaboral</option>
              <option>Capacitación & E-Learning</option>
              <option>Outplacement</option>
             </select>
             <h4 class="mb-1 ml-2 text-red-400 text-xs" v-if="invalid.information.length > 0">*{{this.invalid.information}}</h4>

          </div>
            <!-- validación de message -->
            <div class="mb-16 md:mx-2">
              <textarea v-bind:class="[invalid['message'].length > 0 ? 'border-red-400': ' border-blue-600 ']" class="text-xs rounded-lg border-2 h-28 p-2 md:col-span-2 w-full" id="gracias" cols="50" rows="10" placeholder="Mensaje"  v-model="contact.message" @blur="validateMessage" required>
              </textarea>
              <h4 class="mb-1 ml-2 text-red-400 text-xs" v-if="invalid.message.length > 0">*{{this.invalid.message}}</h4>
            </div>
          </div>
          <!-- contenedor derecho -->
        </div>
        <div v-bind:class="{ 'opacity-20': loading }" class="flex justify-center">
          <input type="submit" class="text-xs font-bold uppercase  bg-red-500 text-white rounded-full w-auto px-10 py-2 mb-10" value="enviar información"/>
        </div>
      </form>
    </div>
 
</template>
<script>
  import axios from 'axios'
 
  export default {
  
    data(){
      return {
        // objeto que captura lo que escribamos en nuestro input
      
        contact: {
          name: '',
          profession: '',
          phone:'',
          mail: '',
          RUC: '',
          information: '',
          message: '' 
        },
        // se utilizó invalid como objeto para poder utilizar sus proppiedades al llamar [value]
        invalid: {
          name: '',
          profession: '',
          phone:'',
          mail: '',
          RUC: '',
          information:'',
          message: '' 
        },
        loading : false
      }
    },
    methods:{
      async sendForm(){
         console.log(this.contact.information)
        // validacion para que el formulario no se envíe por si existe algún error en los datos
        if(this.loading === true)return
        if(this.invalid['name'] || 
          this.invalid['profession'] ||
          this.invalid['phone'] || 
          this.invalid['mail'] ||
          this.invalid['RUC'] ||
          this.invalid['information'] ||
          this.invalid['message']) 
          return console.log('no se envió formulario') 
        this.loading = true
        const response = await axios.post('https://prodequa-form.herokuapp.com/forms', this.contact)
        this.loading = false
        localStorage.setItem('success', JSON.stringify(true))
        this.$router.push({path: 'greatings'})
        console.log('se envió formulario')
       
        console.log(response)
      },
      // funcion parametralizable para validar texto
      validateText(value){
        const expreg = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/
        if(!expreg.test(this.contact[value])){
          return this.invalid[value] = `${value} es invalido`;
        }
        if(this.contact[value].length <= 3){
          return   this.invalid[value] = `${value} debe tener más de 3 letras`;
        }else{
          return this.invalid[value] = '';
        }
      },
      validateNumber(value, minNumber){
        const expreg = /^[0-9]+$/
        if (!expreg.test(this.contact[value])){
          return this.invalid[value] = `${value} es invalido`
        }
        if (this.contact[value].length !== minNumber){
          return this.invalid[value] = `${value} debe tener ${minNumber} dígitos `;
        }else{
          return this.invalid[value] = '';
        }
      },
      validateEmail(){
        const expreg = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/
        if (!expreg.test(this.contact.mail)){
          return this.invalid.mail = 'Email is invalid'
        }else{
          return this.invalid.mail = '';
        }
      },
      validateMessage(){
        if(this.contact.message.length <= 0){
         return this.invalid.message = 'Debe escribir un mensaje'       
        }else{
          return this.invalid.message = '';
        }
      },
      validateInformation(){
        if(this.contact.information.length <= 0) return this.invalid.information = 'seleccione una opción'
        else return this.invalid.information = ''
      }
    }
  
  }
</script>
 