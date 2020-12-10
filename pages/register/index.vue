<template>
    <div class="container-fluid h-100">
        <div class="row h-100 justify-content-center align-items-center">
            <div class="col-xl-4 col-lg-4 col-md-3 col-sm-1"></div>
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-10">
                <div class="form-group">
                    <div class="card login-card">
                        <div class="card-img-top mt-2 mb-2">
                            <div class="text-center">
                                <img src="~/assets/flag.png" alt="">
                            </div>
                        </div>
                        <form method="post" @submit="register">
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="username"><strong>UserController Name *</strong></label>
                                    <input type="text" id="username" name="username" class="form-control" v-model="userData.username">
                                </div>
                                <div class="form-group">
                                    <label for="password"><strong>Password *</strong></label>
                                    <input type="password" autocomplete="off" id="password" name="password" class="form-control" v-model="userData.password">
                                </div>
                                <div class="form-group">
                                    <label for="confirm_password"><strong>Confirm Password *</strong></label>
                                    <input type="password" autocomplete="off" id="confirm_password" name="confirm_password" class="form-control" v-model="userData.confirmPassword" @input="checkConfirmPassword">
                                </div>
                                <div class="text-center">
                                    <span class="error-msg"><strong>{{ errorMsg }}</strong></span>
                                </div>

                                <div class="d-flex justify-content-between">
                                    <button type="submit" class="btn btn-primary">Sign up</button>
                                    <div class="form-inline">
                                        Have an account?
                                        <router-link :to="{name: 'login'}" class="ml-2">Login</router-link>
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
        name: "RegisterPage",
        head: {
            title: 'Register - Peter Ma Website'
        },
        data() {
            return {
                userData: {
                    username: "",
                    password: "",
                    confirmPassword: ""
                },
                isPasswordMatched: false,
                errorMsg: ""
            }
        },
        methods: {
            validateUserData() {
                const attributes = Object.keys(this.userData);
                for(let attribute of attributes) {
                    let value = this.userData[attribute];
                    if(value === '' || value === null)
                        return [false, "Required field cannot be empty!"];
                }
                if(this.userData.username.length < 3) {
                    return [false, "Username must be at least 3 characters!"];
                }
                if(this.userData.password.length < 6) {
                    return [false, "Password must be at least 6 characters!"];
                }
                return [true];
            },
            register(e) {
                e.preventDefault();
                const validateResult = this.validateUserData();
                const isValidated = validateResult[0];
                if(isValidated && this.isPasswordMatched) {
                    this.$nuxt.$loading.start();
                    this.errorMsg = "";
                    delete this.userData.confirmPassword;
                    AccountService.register(this.userData).then(() => {
                        this.$router.push({name: 'login'});
                    }).catch((reason) => {
                        let i = 1;
                        for(let key in reason.data) {
                            this.errorMsg += i + '. ' + reason.data[key];
                            i++;
                        }
                    }).finally(() => {
                        this.$nuxt.$loading.finish();
                    });
                } else {
                    this.errorMsg = validateResult[1];
                }
            },
            checkConfirmPassword() {
                if(this.userData.password !== this.userData.confirmPassword) {
                    this.isPasswordMatched = false;
                    this.errorMsg = "Your passwords does not match!";
                }
                else {
                    this.isPasswordMatched = true;
                    this.errorMsg = "";
                }
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

    .error-msg {
        color: red;
    }
</style>
