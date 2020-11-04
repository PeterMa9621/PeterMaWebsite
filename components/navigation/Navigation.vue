<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark" class="fixed-top">
            <b-navbar-brand href="#">
                <img src="../../assets/marker.png" width="30" height="30" class="d-inline-block align-top" alt="">
            </b-navbar-brand>
            <b-navbar-brand href="#">PeterMa</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <NuxtLink class="nav-link" to="/">Home</NuxtLink>
                    <NuxtLink class="nav-link" to="/blog">Blog</NuxtLink>
                    <NuxtLink class="nav-link" to="/project">Project</NuxtLink>
                    <NuxtLink class="nav-link" to="/about">About</NuxtLink>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <!--
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>
                    -->
                    <NuxtLink v-if="user===null" class="nav-link" to="/login">Login</NuxtLink>
                    <NuxtLink v-if="user===null" class="nav-link" to="/register">Register</NuxtLink>
                    <b-nav-item-dropdown v-if="user!==null" :text="user.username" right>
                        <b-dropdown-item href="#" @click="goToProfilePage">Profile</b-dropdown-item>
                        <b-dropdown-item href="#" @click="goToNewThingsPage">New Things</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item href="#" @click="logout">Logout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>

    import AccountService from "~/services/account/accountService";

    export default {
        name: "navigation",
        computed: {
            user: function () {
                return this.$store.state.user.user;
            }
        },
        created() {
            // When a user open the website, then check auth first
            //this.$store.commit('checkAuth', this.$router);
        },
        methods: {
            logout() {
                // When a user wants to logout, then clear data saved on the website
                //this.$store.commit('clearUser', this.$router);
                let user = this.user;
                let user_id = user._id;
                if (user_id.toString() !== '') {
                    AccountService.logout(user_id).then(() => {
                        this.$store.commit('user/clear');
                        this.$router.push({name: 'login'});
                    }).catch((reason) => {
                        console.log(reason);
                    });
                }
            },
            goToProfilePage() {
                this.$router.push({name: 'profile'});
            },
            goToNewThingsPage() {
                this.$router.push({name: 'new_thing'});
            }
        },
        mounted() {
            /*
            this.$root.$on('onLogout', () => {
                //this.$store.commit('clearUser', this.$router);
            })
             */
        }
    }
</script>

<style scoped>
    .dropdown-hover:hover {
        background-color: #007bff;
        color: white;
    }
</style>
