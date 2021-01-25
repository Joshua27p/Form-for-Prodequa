<template>
  <div class="bg-gray-100">
    <h1 class="text-center my-5 font-semibold p-2 font-helvetica text-gray-800">Bienvenido Yoshua <br>
    Estos son los formularios</h1>
    <div class="flex p-3 w-full mx-auto">
        <div class="grid w-full sm:w-auto mr-10 overflow-y-auto h-72">
          <div class="transition duration-500 ease-in-out text-xs cursor-pointer border-0 hover:bg-indigo-400 hover:text-white rounded-xl mb-2  flex flex-col p-2" v-for="form in formsCollection" :key="form._id" @click="getFormsData(form)">
            <span class="font-bold">{{form.information}}</span>
            <h3> {{form.name}}</h3>
            <span class="font-bold text-gray-800">{{moment(form.dateCreated).format('DD-MM-YYYY ')}}</span>
          </div>
        </div>
        <div class="hidden sm:block border-2 border-black rounded-xl w-3/4">
          <div class="grid grid-cols-2 gap-2 py-10 w-3/4 m-auto">
            <span class="font-bold">nombre:</span> 
            <span>{{formSelected.name}}</span>
            <h3 class="font-bold">profesion:</h3>
            <span>{{formSelected.profession}}</span>
            <h3 class="font-bold">Celular:</h3>
            <span>{{formSelected.phone}}</span>
            <h3 class="font-bold">Correo</h3>
            <span>{{formSelected.mail}}</span>
            <h3 class="font-bold">Razón Social:</h3>
            <span>{{formSelected.RUC}}</span>
            <h3 class="font-bold">Info:</h3>
            <span>{{formSelected.information}}</span>
            <h3 class="font-bold">mensaje:</h3>
            <p>{{formSelected.message}}</p>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name:"AdminPanel",
  data(){
    return{
      formsCollection:[],
      formSelected:{}
    }
  },
  methods:{
    async getForms(){
      const fetchForms = await axios.get('http://localhost:3000/forms')
      this.formsCollection = fetchForms.data.reverse()
      console.log(fetchForms.data)
      return fetchForms
    },
    getFormsData(form){
      this.formSelected = form
      console.log(this.formSelected)
    },
    moment: function(date){
      return moment(date);
    }
  },
  mounted(){
     this.getForms()
  }
}
</script>
