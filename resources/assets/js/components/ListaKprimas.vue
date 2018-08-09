<template>

        <td>{{kprima.Nombre_cliente}}</td>

</template>


<script>
    export default {
        props:['kprima'],
        data(){
            return{
                kprima:{
                    Nombre_cliente:'',
                    Ip:'',
                    Version:''
                }
            }
        },

        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
