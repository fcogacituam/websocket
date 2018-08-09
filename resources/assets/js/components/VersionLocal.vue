
<script>
    export default {
        props: ['kprima','kprimas', 'lastVersion', 'kprimasChannels'],
        watch: {
            kprima: {
                handler: function (kprima) {
                    console.log("kprima", kprima);
                },
                deep: true
            }
        },
        methods: {
            actualizarK: function (kprimaId) {
                //add loading
                // this.$set(this.state.kprimas[kprimaId], "loading", true);

                axios.post(apiConfigurador + "event/kprima", {
                    id: kprimaId,
                    pathname: "git/reset",
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
    }
</script>
