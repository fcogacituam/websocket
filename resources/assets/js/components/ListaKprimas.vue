<template>
    <div class="tr">
        <div class="td"> {{kprima.Ip}}</div>
        <div class="td">
            <small v-if="kprima.git">
                {{name}}
            </small>
	    </div>
       
        <div class="td">


            
        </div>
       
    </div>
</template>


<script>
    export default {
        props:['kprima'],

       
    }
</script>
