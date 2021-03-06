
window._ = require('lodash');
window.Popper = require('popper.js').default;

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });

import Echo from 'laravel-echo'

window.io = require('socket.io-client');


    //COMO FUNCION

        //INIT WEBSOCKET
     var url = "https://ecore.widefense.com/";

        //https://laravel.com/docs/5.6/broadcasting
        var echo = new Echo({
            broadcaster: 'socket.io',
            host: url,
            client: io
            //auth: {headers: {'Authorization': token}},
        });

        //PUBLIC CHANNELS:
        // echo.channel('messages')
        //     .listen('MessageEvent', function (msg) {
        //         console.log('MessageEvent', msg);
        //         require(["https://cdnjs.cloudflare.com/ajax/libs/mouse0270-bootstrap-notify/3.1.7/bootstrap-notify.min.js"], function() {
        //             $.notify(msg);
        //         });
        //     });

        //AUTH CHANNELS
        var startWebsocket = function (token) {
            //ADD TOKEN
            echo.connector.options.auth = {
                headers: {
                    'Authorization': token
                }
            };

            // PRESENCE CHANNELS:
            echo.join("clients")
                .listen('ClientsEvent', function (msg) {
                    console.log('ClientsEvent', msg);
                    // $.notify(msg);
                })
                .here(function (users) {
                    // this.users = users;
                    console.log("join users", users);
                })
                .joining(function (user) {
                    // this.users.push(user);
                    console.log("joining user", user);
                })
                .leaving(function (user) {
                    console.log("leaving user", user);
                });

            //PRIVATE CHANNELS:
            var id = getCookie('id');
            if (!id) {
                console.log("missing getCookie('id');");
                // return;
            }

            echo.private('user.' + id)
                .listen('UserEvent', function (data) {
                    console.log('UserEvent aqui recibo la respuesta del K:',data);
			window.vm.responseKprima(data);
                    if (data.msg) {

                        //CONVERTIR EN ARRAY SI NO LO ES
                        if (data.msg.constructor !== Array) {
                            data.msg = [data.msg];
                        }
                    }

                    if (data.state) {
                        for (var key in data.state) {
                            var extend = $.extend(true, window.store.state[key], data.state[key]);
                            window.store.set(key, extend);
                            // for (var k in extend) {
                            //     Vue.set(store.state[key][k], extend[k]);
                            // }
                        }
                    }

                    // TODO: PORQUE NO FUNCIONA AQUÍ EL BINDING DE VUE AUTOMÁTICAMENTE?
                    //ACTUALIZAR TODO VUE
                    window.vm.$forceUpdate();
                    for (var i = 0; i < window.vm.$children.length; i++) {
                        window.vm.$children[i].$forceUpdate();
                    }

                });
            console.log("listen private user " + id);
        };

        //IF ALREADY LOGED
        var tkn = getCookie('Authorization');
        if (tkn) {
            tkn = tkn.replace("+", " ");
		 startWebsocket(tkn);
        }

        //PUBLIC:
        window.echo = echo;
        window.startWebsocket = startWebsocket;
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
window.store = {
    state: {
        kprimas: {}
    },
    get: function (key) {
        if (this.state[key]) {
            return this.state[key];
        }

        var json = localStorage.getItem(key) || null;
        if (json) {
            var value = null;
            try {
                value = JSON.parse(json);
            } catch (e) {
                //
            }

            Vue.set(this.state, key, value);
            return value;
        }
    },
    set: function (key, value) {
        Vue.set(this.state, key, value);
        var json = JSON.stringify(value);
        localStorage.setItem(key, json);
    }
};
