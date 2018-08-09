<template>
    <div>
        <div>{{kprima.Nombre_cliente}}</div>

        <div>{{kprima.Ip}}</div>
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
