<template>
    <div class="tr">
        <div class="td"> {{kprima.Ip}}</div>
        <div class="td">
            <small v-if="kprima.git">
                {{name}}
            </small>
            <small v-else-if="kprimasChannels && kprimasChannels['private-kprima.' + kprima.Id]" style="color:grey">esperando respuesta del K'..</small>
            <small v-else-if="kprimasChannels" style="color:red">sin conexión</small>

	    </div>
       
        <div class="td">


            
        </div>
       
    </div>
</template>


<script>
    export default {
        props:['kprima','kprimasChannels'],

       
    }
</script>
