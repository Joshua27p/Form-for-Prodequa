<template>
  <div class="bg-gray-100  h-screen">
    <h1 class="text-center sm:text-2xl mb-5 font-semibold p-4 font-helvetica text-gray-800">Bienvenidos<br>
    Estos son los formularios</h1>
    <div class="flex p-3 w-full mx-auto max-w-3xl sm:my-24">
      <!-- contenedor de todas las cards -->
        <div class="p-1 flex flex-col w-full  sm:w-auto mr-10 overflow-y-auto h-96 ">
         <!-- componente cards -->
          <div  class="bg-white shadow-lg  h-auto transition duration-500 ease-in-out text-xs cursor-pointer border-0 hover:bg-indigo-400 hover:text-white rounded-xl mb-2  flex flex-col px-3 py-3" v-for="form in formsCollection" :key="form._id" @click="getFormsData(form); windowWidth < 640 ?toggleModal = !toggleModal : ''">
            <span class="font-bold">{{form.information}}</span>
            <h3> {{form.name}}</h3>
            <span class="font-bold">{{moment(form.dateCreated).format('DD-MM-YYYY ')}}</span>
          </div>
        </div>
        <!-- contenedor del modal -->
        <div
        class=" fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50"
        v-if="toggleModal"
        >
          <div class="relative mx-7 w-auto max-w-2xl break-all	">
            <div
              class="bg-white w-full text-xs font-sans p-3 rounded-lg shadow-lg"
            >
              <div class="grid grid-cols-2 gap-2 py-10 w-11/12 m-auto">
              <span class="font-bold capitalize">nombre:</span> 
              <span>{{formSelected.name}}</span>
              <h3 class="font-bold capitalize">profesion:</h3>
              <span>{{formSelected.profession}}</span>
              <h3 class="font-bold capitalize">Celular:</h3>
              <span>{{formSelected.phone}}</span>
              <h3 class="font-bold capitalize">Correo</h3>
              <span>{{formSelected.mail}}</span>
              <h3 class="font-bold capitalize">Razón Social:</h3>
              <span>{{formSelected.RUC}}</span>
              <h3 class="font-bold capitalize">Info:</h3>
              <span>{{formSelected.information}}</span>
              <h3 class="font-bold capitalize">mensaje:</h3>
              <p>{{formSelected.message}}</p>
            </div>
            <div class="flex justify-center">
              <button class="mb-3 rounded-lg bg-green-400 text-white px-6 mt-1 py-2"
                  @click="toggleModal=false"
                  >close</button>
             </div>
            </div>
          </div>
          </div>
          <!-- conenedor de nuestors formularios -->
          <div class="w-8/12 hidden sm:block border-1 shadow-lg text-gray-600 bg-white border-gray-500 rounded-xl">
            <div class="grid grid-cols-2 gap-2 py-10 w-3/4 m-auto">
              <span class="font-bold capitalize">nombre:</span> 
              <span>{{formSelected.name}}</span>
              <h3 class="font-bold capitalize">profesion:</h3>
              <span>{{formSelected.profession}}</span>
              <h3 class="font-bold capitalize">Celular:</h3>
              <span>{{formSelected.phone}}</span>
              <h3 class="font-bold capitalize">Correo</h3>
              <span>{{formSelected.mail}}</span>
              <h3 class="font-bold capitalize">Razón Social:</h3>
              <span>{{formSelected.RUC}}</span>
              <h3 class="font-bold capitalize">Info:</h3>
              <span>{{formSelected.information}}</span>
              <h3 class="font-bold capitalize">mensaje:</h3>
              <p>{{formSelected.message}}</p>
            </div>
          </div>
        </div>
      <div v-if="toggleModal" class="absolute inset-0 z-40 opacity-25 bg-black"></div>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name:"AdminPanel",
  functionName: "modal",
  data(){
    return{
      formsCollection:[],
      formSelected:{},
      toggleModal: false,
      windowWidth: window.innerWidth
    };
  },
  methods:{
    // peticion al backend para obtener los formualarios
    async getForms(){
      const fetchForms = await axios.get('https://prodequa-form.herokuapp.com/forms')
      // como los formularios son mostrados por orden, en el UX se quería ver desde el últmo por eso un reverse 
      this.formsCollection = fetchForms.data.reverse()
      console.log(fetchForms.data)
      return fetchForms
    },
    getFormsData(form){
      this.formSelected = form
       
    },
    moment: function(date){
      return moment(date);
    },
    onResize(){
      this.windowWidth = window.innerWidth
      this.toggleModal = false
      //  console.log('captura de resize')
    }
  },
  mounted(){
      // al montarse el componente hace un llamado al serrvidor de los formularios
      this.getForms()
      // para capturar el evento resize 
      this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeUnmount() {
      window.removeEventListener('resize', this.onResize)
  },
   
   
}
</script>
