<template>
    <div class="container-fluid h-100">
        <div class="row h-100 justify-content-center align-items-center">
            <div class="col-xl-4 col-lg-4 col-md-3 col-sm-1"></div>
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-10">
                <transition name="fade">
                    <b-alert variant="danger" :show="errorMsg!==''" dismissible @dismissed="hideAlert">
                        {{ errorMsg }}
                    </b-alert>
                </transition>
                <div class="form-group">
                    <div class="card login-card">
                        <div class="card-img-top mt-2 mb-2">
                            <div class="text-center">
                                <img src="~/assets/flag.png" alt="">
                            </div>
                        </div>
                        <form method="post" @submit="login">
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="username"><strong>UserName</strong></label>
                                    <input id="username" name="username" class="form-control" v-model="username">
                                </div>
                                <div class="form-group">
                                    <div class="d-flex justify-content-between">
                                        <label for="password"><strong>Password</strong></label>
                                        <a href="#" class="ml-2">Forgot password?</a>
                                    </div>

                                    <input type="password" autocomplete="on" id="password" name="password" class="form-control" v-model="password">
                                </div>
                                <div class="d-flex justify-content-between">
                                    <button type="submit" class="btn btn-primary">Log in</button>
                                    <div class="form-inline">
                                        Need an account?
                                        <router-link :to="{name: 'register'}" class="ml-2">Register</router-link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-3 col-sm-1"></div>
        </div>
    </div>
</template>

<script>
    import AccountService from "~/services/account/accountService";

    export default {
        name: "LoginPage",
        data() {
            return {
                username: '',
                password: '',
                errorMsg: '',
                isSigning: false
            }
        },
        beforeCreate() {
            let userId = this.$cookies.get('auth_id');
            let authToken = this.$cookies.get('auth_token');

            if((userId !== null && undefined) && (authToken !== null && undefined)) {
                AccountService.login({authToken: authToken, authId: userId}).then((user) => {
                    this.$store.commit('user/set', user);
                    this.$router.push(this.$route.query.next ? this.$route.query.next : '/');
                }).catch(() => {
                    this.$cookies.remove('auth_id');
                    this.$cookies.remove('auth_token');
                });
            }
        },
        mounted() {
            let msg = this.$route.params.msg;
            this.errorMsg = msg!==undefined?msg:'';
        },
        methods: {
            login(e) {
                e.preventDefault();
                this.errorMsg = '';
                this.isSigning = true;

                AccountService.login({username: this.username, password: this.password}).then((user) => {
                    this.$store.commit('user/set', user);
                    this.$router.push(this.$route.query.next ? this.$route.query.next : '/');
                }).catch((reason) => {
                    this.isSigning = false;
                    this.errorMsg = reason.data['error'];
                });
            },
            hideAlert() {
                this.errorMsg = '';
            }
        }
    }
</script>

<style scoped>
    .login-card {
        box-shadow: 0 10px 25px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.1);
        border-radius: 10px !important;
        background-color: aliceblue;
        padding: 20px;
    }
</style>
