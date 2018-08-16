
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

var url = "https://ecore.widefense.com";

if (!url) {
    var url = window.location.origin;
    if (url.includes("widefense.com") && !url.includes("builder")) {
        url = "https://ecore.widefense.com";
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
window.Echo.channel('kprima')
    .listen('PruebaEvent', (e) => {
        console.log(e);
    });


 //PRESENCE CHANNELS:
window.Echo.join("clients")
    .listen('ClientsEvent', function (msg) {
        console.log('ClientsEvent', msg);
    })
    .here(function (users) {
        this.users = users;
        console.log("join users", users);
    })
    .joining(function (user) {
        this.users.push(user);
        console.log("joining user", user);
    })
    .leaving(function (user) {
        console.log("leaving user", user);
    });


    
window.Echo.private('user.' + id)
    .listen('UserEvent', function (data) {
        console.log('UserEvent', data);
        
        // if (data.msg) {

        //     //CONVERTIR EN ARRAY SI NO LO ES
        //     if (data.msg.constructor !== Array) {
        //         data.msg = [data.msg];
        //     }

        //     //GET FULL ERROR
        //     for (var i = 0; i < data.msg.length; i++) {
        //         var msg = data.msg[i];

        //         if (msg.length > 100) {
        //             var n = $.notify(msg, {
        //                 delay: 0
        //             });
        //             $(n.$ele).css({
        //                 position: "absolute",
        //                 top: 0,
        //                 left: 0,
        //                 right: 0,
        //                 'max-width': '100%'
        //             });
        //         } else {
        //             $.notify(msg);
        //         }
        //     }
        // }

        // if (data.state) {
        //     for (var key in data.state) {
        //         var extend = $.extend(true, window.store.state[key], data.state[key]);
        //         window.store.set(key, extend);
        //         // for (var k in extend) {
        //         //     Vue.set(store.state[key][k], extend[k]);
        //         // }
        //     }
        // }

        // // TODO: PORQUE NO FUNCIONA AQUÍ EL BINDING DE VUE AUTOMÁTICAMENTE?
        // //ACTUALIZAR TODO VUE
        // window.vm.$forceUpdate();
        // for (var i = 0; i < window.vm.$children.length; i++) {
        //     window.vm.$children[i].$forceUpdate();
        // }

    });