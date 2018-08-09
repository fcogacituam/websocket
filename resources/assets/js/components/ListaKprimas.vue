<template>
    <tr>
        <td>{{kprima.Nombre_cliente}}</td>

        <td>{{kprima.Ip}}</td>
        <td></td>
        <td></td>
    </tr>

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
