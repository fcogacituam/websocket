<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                 <form action="">
                    <div class="form-group"><label for="">User: </label><input v-model="mutableUser" type="text" class="form-control" id="userName"></div>
                    <div class="form-group"><label for="">Password: </label><input v-model="mutablePass" type="password" class="form-control" id="passWord"></div>
                    <input v-on:click.prevent="login" type="submit" class="btn btn-primary" value="Entrar">
                </form>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props:['userId'],
        data:function(){
            return{
                mutableUser: this.userN,
                mutablePass: this.pass,
                uId:''
            }
        },
        methods:{
            login:function(event){
                let user = this.mutableUser;
                let passw= this.mutablePass;
                var self=this;

                axios.post('https://ecore.widefense.com/api/ecore/public/auth/login',{}, {
                        auth:{
                            username:user,
                            password:passw
                        }
                    }).then(function(response){
                        // console.log(response.headers['user-id']);
                        // $emit('getId',response.headers['user-id'])
                        self.$emit('hola',response.headers['user-id']);

                    }).catch(function(error){
                        console.log(error);
                    })
            }
        }
    }
</script>




















