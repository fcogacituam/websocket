
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


var apiEcore = "../../../api/ecore/public/";
var apiConfigurador = "../../../api/websocket/public/api/";

const app = new Vue({
    el: '#app',
    data: function () {
        // console.log("window.store.state", window.store.state);
        return {
            repositorios_local: {},
            kprimas: null,
            lastVersion: null,
            // state: window.store.state,
            repoArr: null,
            kprimasChannels: null
        }
    },
    watch: {
        kprimas: function (val) {
            this.kprimas = val;
            console.log(this.kprimas);
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

        // LISTA DE REPOSITORIOS
        axios.post(apiConfigurador + "repositorio/reposVersions", {}, {
            auth: {
                username: 'fgacitua@widefense.com',
                password: 'fr4nc15c0Ga'
            }
        }).then(function (response) {
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
                post: {
                    repos: this.repoArr
                }
            }, {
                    auth: {
                        username: 'fgacitua@widefense.com',
                        password: 'fr4nc15c0Ga'
                    }
                });
        });

        // LISTA COMPLETA DE K' DE LA BASE DE DATOS
        axios.post(apiEcore + "nodo/k_primas_actualizador", {}, {
            auth: {
                username: 'fgacitua@widefense.com',
                password: 'fr4nc15c0Ga'
            }
        }).then(function (response) {

            // var kprimas = {};
            // for (var i = 0; i < res.length; i++) {
            //     var kprima = res[i];
            //     kprimas[kprima.Id] = kprima;
            // }

            // var extend = $.extend(true, window.store.state.kprimas, kprimas);
            this.kprimas = response.data;
            console.log(this.kprimas);
            // for (var key in extend) {
            //     self.$set(self.state.kprimas, key, extend[key]);
            // }
        });

        // LISTA DE K' EN EL CANAL Kprimas DEL WESOCKET (DATOS INDEPENDIENTES)
        axios.post(apiConfigurador + "socket/kprimasChannels", {}, {
            auth: {
                username: 'fgacitua@widefense.com',
                password: 'fr4nc15c0Ga'
            }
        }).then(function (response) {
            self.kprimasChannels = response.data;
        });

    }, methods: {
        actualizar: function (repositorio, version) {
            var self = this;
            this.$set(self.repositorios_local[repositorio], "loading", true);

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
        }
    }
    
});
