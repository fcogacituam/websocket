
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('version-local', require('./components/VersionLocal.vue'));
Vue.component('lista-kprimas', require('./components/ListaKprimas.vue'));
Vue.component('login-ecore', require('./components/LoginEcore.vue'));

var apiEcore = "../../../api/ecore/public/";
var apiConfigurador = "../../../api/websocket/public/api/";


Vue.component("actualizar-kprima",{
	props:["repo",'rep','kprima','updating'],
	data:function(){return{
		estado:{},
        kprimaId:this.kprima.Id,
	}},
	watch:{
		estado: function(val){
			this.estado=val;console.log(val);
        }
	},
	mounted(){
        this.versiones(this.repo,this.rep);
        console.log("UPDATING VAL:",this.updating);
	},
	methods:{
		prueba:function(kprimaId,version,route){
			//console.log(kprimaId);
			//console.log(version);
			window.vm.actualizarK(kprimaId,version,route);
		},
		versiones: function(kprima,local){
			 //console.log("LOCAL: ",local);
                        //console.log("KPRIMA: ",kprima);
                        var vLocal= local.version.split('-')[0];
                        var vKprima= kprima.version.split('-')[0];
                        //console.log("versión local:"+vLocal+". versión kprima: "+vKprima);
                        var localArr= vLocal.split(".");
                        var kprimaArr= vKprima.split(".");
                        var diff= Math.abs(local.count - kprima.count);
			var estado = {};
			var vToUpdate= local.version.split('-')[0];
                        if(parseInt(localArr[0]) < parseInt(kprimaArr[0])){
                                //console.log("devolver versión ");
				 estado = {
                                        'message': 'Devolver a '+vToUpdate+'',
                                        'route': local.route,
                                        'version':local.version
                                    }

                        }else if(parseInt(localArr[0]) > parseInt(kprimaArr[0])){
                                //console.log("actualizar versión");
				estado = {
                                        'message': 'Actualizar a '+vToUpdate+'',
                                        'route': local.route,
                                        'version':local.version
                                    }

                        }else{
                                if(parseInt(localArr[1]) > parseInt(kprimaArr[1])){
                                        //console.log("actualizar dependencia");
                                    estado = {
                                        'message': 'Actualizar a '+vToUpdate+'',
                                        'route':local.route,
                                        'version':local.version
                                    }
                                }else if(parseInt(localArr[1]) < parseInt(kprimaArr[1])){
                                        //console.log("devolver dependencia");
                                    estado = {
                                        'message': 'Devolver a '+vToUpdate+'',
                                        'route': local.route,
                                        'version':local.version
                                    }
                                }else{

                                        if(parseInt(localArr[2])> parseInt(kprimaArr[2])){
                                                //console.log("actualizar release");
                                                estado={
                                                    'message':'Actualizar a '+vToUpdate+'',
                                                    'route':local.route,
                                                    'version':local.version
                                                }
                                        }else if(parseInt(localArr[2])< parseInt(kprimaArr[2])){
                                                //console.log("devolver release");
                                                estado={
                                                    'message':'Devolver a '+vToUpdate+'',
                                                    'route':local.route,
                                                    'version':local.version,
						    'class':'btn-danger'
                                                }
                                        }else{
                                                if(parseInt(local.count) > parseInt(kprima.count)){
                                                        //console.log("actualizar "+diff+" commits");
                                                        estado = {
                                                            'message':'Actualizar '+diff+' commits',
                                                            'route':local.route,
                                                            'class':'btn-success',
                                                            'version':local.version
                                                        }
                                                }else if(parseInt(local.count) < parseInt(kprima.count)){
                                                        //console.log("devolver "+diff+" commits");
                                                        estado={
                                                            'message':'Devolver '+diff+' commits',
                                                            'route':local.route,
                                                            'class':'btn-warning',
                                                            'version':local.version
                                                        }
                                                }else{
                                                        estado={
                                                            'message':'Actualizado',
                                                            'route':local.route,
                                                            'back':'1.0.7',
                                                            'devolver':'Devolver a la 1.0.7(scripts-nagios)'
                                                        }
                                                        

                                                }
                                        }
                                }
				this.estado = estado;

                        }

		}
	},
	template:'<div class="actualizar">\
			<a class="btn btn-sm" v-bind:class="estado.class" @click.prevent="prueba(kprimaId,estado.version,estado.route)" href="">{{estado.message}}</a>\
            <div v-if="estado.back"><a href="" @click.prevent="prueba(kprimaId,estado.back,estado.route)"> {{estado.devolver}}</a></div>\
            <div v-if="updating"><i class="fas fa-sync fa-spin"></i> <small> Actualizando...</small></div>\
		</div>'
});



Vue.component("component-kprima", {
    props: ['kprima','repositorios_local', 'lastVersion', 'kprimasChannels', 'kprimas', 'userId','repositorios_local','updating'],
		watch: {
                    kprima: {
                        handler: function (kprima) {
                            console.log("kprima", kprima);
                        },
                        deep: true
                    }
                },
		methods:{
			  prueba:function(){
				console.log("funcion desde actualizador-component");
                        },

                    actualizarK: function (kprimaId,version) {
                        //add loading
                        var userId = window.vm.getCookie('id');
                        //this.$set(this.state.kprimas[kprimaId], "loading", true);

                        axios.post(apiConfigurador + "event/kprima", {
                            id: kprimaId,
			    version:version,
                            pathname: "git/reset",
			                userId: userId,
                            post: {
                                repos: this.repositorios_local
                            }
                        });
                    },
                    clientesList: function (kprima) {
                        if (!kprima.ip_clientes) {
                            return;
                        }

                        var res = "";
                        for (var i = 0; i < kprima.ip_clientes.length; i++) {
                            res += kprima.ip_clientes[i].Nombre + ", ";
                        }
                        return res;
                    }
                }
            });


window.vm = new Vue({
    el: '#app',
    data: function () {
        console.log("window.store.state", window.store.state);
        return {
            repositorios_local: {},
            kprimas: null,
            lastVersion: null,
            state: window.store.state,
            repoArr: null,
            kprimasChannels: null,
            userId:'',
            updating:false,
        }
    },
    watch: {
        userId: function(val){
            this.userId=val;
            console.log(this.userId);
        },
        kprimas: function (val) {
            this.kprimas = val;
            console.log(this.kprimas);
        },
        kprimasChannels:function(val){
            this.kprimasChannels= val;
            console.log(this.kprimasChannels);
        },
        state: {
            handler: function (state) {
                console.log("state", state);
                //this.$forceUpdate();
            },
            deep: true
        }
    },
    mounted: function () {
        var self = this;
	    self.userId= self.getCookie('id');
        // LISTA DE REPOSITORIOS
        axios.post(apiConfigurador + "repositorio/reposVersions",{},{
		auth:{
			username:'kprima.prueba',
			password:'5a41ecee873e485d491e4b5231889768'
		}
	}
        ).then(function (response) {
            var repos = response.data;

            // GET WEBSOCKET KPRIMAS STATE
            var repoArr = {};
            for (var name in repos) {
                repoArr[name] = {
                    route: repos[name].route
                };
            }
            this.repoArr = repoArr;

            var tags = [];
            for (var name in repos) {
                //OBTENER LAS VERSIONES CON SOLO 2 PARTES
                var tagsArr = Object.keys(repos[name].tags);
                for (var i = 0; i < tagsArr.length; i++) {
                    tagsArr[i] = tagsArr[i].split(".").slice(0, 2).join(".");
                }

                if (tagsArr.length) {
                    tags.push(sortVersions(tagsArr));
                }
            }

            //ENCONTRAR VERSIONES COMUNES DE TODOS LOS REPOSITORIOS
            //https://stackoverflow.com/questions/34497027/javascript-finding-shared-values-across-multiple-array
            var versions = tags[0].filter(function (x) {
                return tags.every(function (y) {
                    if (y.indexOf(x) != -1) {
                        y[y.indexOf(x)] = Infinity;
                        return true;
                    }
                    return false;
                });
            });
            console.log("versions", versions);
            self.lastVersion = sortVersions(versions).pop();

            //repositorios_local
            for (var name in repos) {
                //VERSION A LA QUE PUEDE ACTUALIZAR
                repos[name].update = Object.keys(repos[name].tags).filter(function (tag) {
                    return 0 == tag.indexOf(self.lastVersion);
                }).pop();

                repos[name].diff = repos[name].count - repos[name].tags[repos[name].update];
            }
            self.repositorios_local = repos;

            // LLAMADO EVENT WEBSCOEKT GENÉRICO A TODOS LOS KPRIMAS
            axios.post(apiConfigurador + "event/kprimas", {
                pathname: "git/get",
		        idUser: self.userId,
                post: {
                    repos: this.repoArr
                }
	},{
                    auth: {
                        username: 'kprima.prueba',
                        password: '5a41ecee873e485d491e4b5231889768'
                    }
                });
        });

        // LISTA COMPLETA DE K' DE LA BASE DE DATOS
        axios.post(apiEcore + "nodo/k_primas",{},{
            auth: {
                username: 'kprima.prueba',
                password: '5a41ecee873e485d491e4b5231889768'
            }
	}).then(function (response) {
            var res = response.data;
            var kprimas = {};
            for (var i = 0; i < res.length; i++) {
                var kprima = res[i];
                kprimas[kprima.Id] = kprima;
            }

            // var extend = $.extend(true, window.store.state.kprimas, kprimas);
            // self.kprimas = response.data;
            var extend = $.extend(true, window.store.state.kprimas, kprimas);
            window.store.set("kprimas", extend);
            // for (var key in extend) {
            //     self.$set(self.state.kprimas, key, extend[key]);
            // }
        });

        // LISTA DE K' EN EL CANAL Kprimas DEL WESOCKET (DATOS INDEPENDIENTES)
        axios.post(apiConfigurador + "socket/kprimasChannels",{},{
	auth:{
		username:'kprima.prueba',
		password: '5a41ecee873e485d491e4b5231889768'
	}
}).then(function (response) {
            self.kprimasChannels = response.data;
        });

    }, methods: {
	actualizarK:function(kprimaId,version,route){
        var userId = this.getCookie('id');
        self.updating=true;
		
		axios.post(apiConfigurador + 'event/kprima',{
			id: kprimaId,
			version:version,
			pathname: 'git/resetK',
			userId: userId,
			route:route,
			post:{
				repos: this.repositorios_local
			}
		});
	},
        actualizar: function (repositorio, version) {
            var self = this;
            this.$set(self.repositorios_local[repositorio], "loading", true);
	//console.log("repositorio: ",repositorio);
	//console.log("version: ",version);
            axios.post(apiConfigurador + "repositorio/actualizar", {
                repo: repositorio,
                version: version
            }).then(function (result) {
                // for (var i = 0; i < data.length; i++) {
                //     $.notify(data[i]);
                // }

                var data = $.extend(true, self.repositorios_local[repositorio], result.data);
                data.diff = 0;
                data.loading = false;
                self.$set(self.repositorios_local, repositorio, data);
            });
        },
        empty: function (obj) {
            return Object.keys(obj).length === 0;
        },
        clientesList: function (kprima) {
            if (!kprima.ip_clientes) {
                return;
            }

            var res = "";
            for (var i = 0; i < kprima.ip_clientes.length; i++) {
                res += kprima.ip_clientes[i].Nombre + ", ";
            }
            return res;
        },
        getCookie: function(cname){
		var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
        }
        
    }
    
});
function sortVersions(arr) {
    var versions = [];
    for (var i = 0; i < arr.length; i++) {
        //https://stackoverflow.com/questions/82064/a-regex-for-version-number-parsing
        if (/^(\d+\.)?(\d+\.)?(\*|\d+)$/.test(arr[i])) {
            versions.push(arr[i]);
        }
    }
    console.log("sortVersions", versions);

    //TODO: CONVERTIR A ECMA5
    //https://stackoverflow.com/questions/40201533/sort-version-dotted-number-strings-in-javascript
    return versions.map(a => a.split('.').map(n => +n + 100000).join('.')).sort()
        .map(a => a.split('.').map(n => +n - 100000).join('.'));
}
$('[data-toggle="tooltip"]').tooltip();
