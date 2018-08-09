<template>
    <div>
        <div class="td"> {{kprima.Nombre_cliente}}</div>
        <div class="td">{{kprima.Ip}}</div>
        <div class="td"></div>
        <div class="td"></div>
       
    </div>
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
