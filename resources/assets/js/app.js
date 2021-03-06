
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
	props:["repo",'rep','kprima','bus'],
	data:function(){return{
		estado:{},
        	kprimaId:this.kprima.Id,
		project:this.rep.route,
	}},
	watch:{
		estado: function(val){
			this.estado=val;
       		 },
	},
	mounted(){
		this.bus.$on('kprimaState',this.updateStatus);
       	 	this.versiones(this.repo,this.rep);
	},
	methods:{
		prueba:function(kprimaId,version,route){
			this.estado.updating=true;
			this.actualizarK(kprimaId,version,route);
        	},
		updateStatus:function(data){
			if(data.ruta == this.estado.route){
				this.estado.message="Actualizado";
				this.estado.updating=false;
				this.estado.updated=true;
				this.bus.$emit('updateVersion',this.estado);
			}
		},
        	actualizarK: function (kprimaId, version, route) {
            		var userId = getCookie('id');
            		this.updating=true;
            		axios.post(apiConfigurador + 'event/kprima', {
                		id: kprimaId,
                		version: version,
               	 		pathname: 'git/resetK',
                		userId: userId,
                		route: route,
               			post: {
                    			repos: this.rep
                		}
            		}).then(function(response){
            		});
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
                                        'version':local.version,
					                    'updating':false,
                                        'vActual':kprima.version,

                                    }

                        }else if(parseInt(localArr[0]) > parseInt(kprimaArr[0])){
                                //console.log("actualizar versión");
				estado = {
                                        'message': 'Actualizar a '+vToUpdate+'',
                                        'route': local.route,
                                        'version':local.version,
					                    'updating':false,
                                        'vActual':kprima.version,

                                    }

                        }else{
                                if(parseInt(localArr[1]) > parseInt(kprimaArr[1])){
                                        //console.log("actualizar dependencia");
                                    estado = {
                                        'message': 'Actualizar a '+vToUpdate+'',
                                        'route':local.route,
                                        'version':local.version,
					                    'updating':false,
                                        'vActual':kprima.version,

                                    }
                                }else if(parseInt(localArr[1]) < parseInt(kprimaArr[1])){
                                        //console.log("devolver dependencia");
                                    estado = {
                                        'message': 'Devolver a '+vToUpdate+'',
                                        'route': local.route,
                                        'version':local.version,
					                    'updating':false,
                                        'vActual':kprima.version,

                                    }
                                }else{

                                        if(parseInt(localArr[2])> parseInt(kprimaArr[2])){
                                                //console.log("actualizar release");
                                                estado={
                                                    'message':'Actualizar a '+vToUpdate+'',
                                                    'route':local.route,
                                                    'updating':false,
                                                    'vActual':kprima.version,
                                                    'version':local.version
                                                }
                                        }else if(parseInt(localArr[2])< parseInt(kprimaArr[2])){
                                                //console.log("devolver release");
                                                estado={
                                                    'message':'Devolver a '+vToUpdate+'',
                                                    'route':local.route,
                                                    'version':local.version,
                                                    'updating':false,
                                                    'vActual':kprima.version,

                                                }
                                        }else{
                                                if(parseInt(local.count) > parseInt(kprima.count)){
                                                        //console.log("actualizar "+diff+" commits");
                                                        estado = {
                                                            'message':'Actualizar '+diff+' commits',
                                                            'route':local.route,
                                                            'class':'actualizar',
							                                'updating':false,
                                                            'version':local.version,
							                                'vActual':kprima.version,
                                                        }
                                                }else if(parseInt(local.count) < parseInt(kprima.count)){
                                                        //console.log("devolver "+diff+" commits");
                                                        estado={
                                                            'message':'Devolver '+diff+' commits',
                                                            'route':local.route,
                                                            'class':'devolver',
			                             	                'vActual':kprima.version,
		    	                                            'updating':false,
                                                            'version':local.version
                                                        }
                                                }else{
                                                        estado={
                                                            'message':'Actualizado',
							                                'updated':true,
                                                            'route':local.route,
							                                'updating':false,
                                                        }
                                                        

                                                }
                                        }
                                }
				this.estado = estado;

                        }

		}
	},
	template:`<div class="actualizar">
                {{estado.message}}
                <a v-if="!estado.updated" v-bind:class="estado.class" @click.prevent="prueba(kprimaId,estado.version,estado.route)" href="">
			<div v-if="!estado.updating"><i class="fas fa-sync"></i></div>
			<div v-else><i class="fas fa-sync fa-spin"></i></div>
		</a>
        </div>`
	
});




Vue.component("repo-version",{
    props:["repo","bus"],
    data:function(){return{
        version:this.repo
    }},
	mounted: function(){
		this.bus.$on("updateVersion",this.updateV);
	},
    methods:{
	updateV:function(data){
		console.log("data que viene : ",data);
		if(this.version.route == data.route){
			this.version=data;
		}
	}
    },
    template:'\
    <div>\
        {{version.version}}\
    </div>'

});



Vue.component("component-kprima", {
    props: ['kprima','repositorios_local', 'lastVersion', 'kprimasChannels', 'kprimas', 'userId','repositorios_local','updating','bus'],
		watch: {
                    kprima: {
                        handler: function (kprima) {
                        },
                        deep: true
                    }
                },
		methods:{

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
            repoArr: {},
            kprimasChannels: null,
            userId:'',
	   bus: new Vue(),
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
            username:'ecore.prod',
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
                        username: 'ecore.prod',
                        password: '5a41ecee873e485d491e4b5231889768'
                    }
                });
        });

        // LISTA COMPLETA DE K' DE LA BASE DE DATOS
        axios.post(apiEcore + "nodo/k_primas",{},{
            auth: {
                username: 'ecore.prod',
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
        username:'ecore.prod',
		password: '5a41ecee873e485d491e4b5231889768'
	}
}).then(function (response) {
            self.kprimasChannels = response.data;
        });

    }, methods: {
	responseKprima:function(data){
		this.bus.$emit('kprimaState',data);
	},
        actualizar: function (repositorio, version) {
            var self = this;
            this.$set(self.repositorios_local[repositorio], "loading", true);

            axios.post(apiConfigurador + "repositorio/actualizar", {
                repo: repositorio,
                version: version
            }).then(function (result) {
               
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

    //TODO: CONVERTIR A ECMA5
    //https://stackoverflow.com/questions/40201533/sort-version-dotted-number-strings-in-javascript
    return versions.map(a => a.split('.').map(n => +n + 100000).join('.')).sort()
        .map(a => a.split('.').map(n => +n - 100000).join('.'));
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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
