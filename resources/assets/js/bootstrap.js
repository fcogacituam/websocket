
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

var url = "https://ecore.builder.widefense.com";



if (!url) {
    var url = window.location.origin;
    if (url.includes("widefense.com")) {
        url = "https://ecore.builder.widefense.com";
    }
}
window.Echo = new Echo({
        broadcaster: 'socket.io',
        host:url
});

window.Echo.channel('test-event')
        .listen('PruebaEvent',(e) => {
                console.log(e);
        });


function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
var startWebsocket = function (token) {
    //ADD TOKEN
    window.Echo.connector.options.auth = {
        headers: {
            'Authorization': token
        }
    };

    //PRIVATE CHANNELS:
    var id = getCookie('id');
    if (!id) {
        console.log("missing getCookie('id');");
        return;
    }  

    window.Echo.private('user.' + id)
        .listen('UserEvent', function (data) {
            console.log('UserEvent', data);

            if(data.state){
                console.log(data.state);
            }

        });
    console.log("listen private user " + id);
};
var tkn = getCookie('Authorization');
if (tkn) {
    // console.log("TOKEN: "+tkn);
    tkn = tkn.replace("+", " ");
    startWebsocket(tkn);
}



define(function () {
    //COMO FUNCION
    return function () {

        /* SIN USAR VUEX */
        //https://vuejs.org/v2/guide/state-management.html
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

    };
});