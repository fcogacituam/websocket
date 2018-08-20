<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                 <form action="">
                    <div class="form-group"><label for="">User: </label><input v-model="userN" type="text" class="form-control" id="userName"></div>
                    <div class="form-group"><label for="">Password: </label><input v-model="pass" type="password" class="form-control" id="passWord"></div>
                    <input v-on:click.prevent="login" type="submit" class="btn btn-primary" value="Entrar">
                </form>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props:['userN','pass'],
        data:function(){
            return{
                mutableUser: this.userN,
                mutablePass: this.pass
            }
        },
        methods:{
            login:function(){
                user = this.userN;
                passw= this.pass;

                console.log(user);
                axios.post(apiEcore+'auth/login',{}, {
                        auth:{
                            username:user,
                            password:passw
                        }
                    }).then(function(response){
                        console.log(response);
                    }).catch(function(error){
                        console.log(error);
                    })
            }
        }
    }
</script>




















