<template>
    <div class="w-100 h-100 bg-dark">
        <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"/>
        <Navigation />
        <TransitionPage>
            <div class="w-100 h-100">
                <Nuxt class="w-100 h-100" />
            </div>
        </TransitionPage>
    </div>
</template>

<style>
html {
    font-family:
        'Source Sans Pro',
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        'Helvetica Neue',
        Arial,
    sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

body {
    width: 100%;
    height: 100%;
    padding-top: 3.5rem;
}

#__nuxt {
    width: 100%;
    height: 100%;
}

#__layout {
    width: 100%;
    height: 100%;
}

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
}

.button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #dee6ed;
    color: #e7eff6;
    text-decoration: none;
    padding: 10px 30px;
    transition: 0.5s;
}

.button--green:hover {
    color: #fff;
    background-color: #4abfaf;
}

.button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #e7eff6;
    color: #e7eff6;
    text-decoration: none;
    padding: 10px 30px;
    transition: 0.5s;
}

.button--grey:hover {
    color: #fff;
    background-color: #7eacd3;
}
</style>
<script>
    import Navigation from "../components/navigation/Navigation";
    import AccountService from "../services/account/accountService";
    import ValidateUtility from "../common/utility/ValidateUtility";
    import TransitionPage from "./TransitionPage";
    export default {
        components: {TransitionPage, Navigation},
        computed: {
            user: function () {
                return this.$store.state.user.user;
            }
        },
        beforeMount() {
            if(this.user === null) {
                let {authToken, authId} = ValidateUtility.getAuthCookies();

                if((authToken!==null && authToken!== undefined) && (authId!==null && authId!== undefined)) {
                    AccountService.login({authToken, authId}).then(user => {
                        this.$store.commit('user/set', user);
                    });

                }
            }

        }
    }
</script>
