<template>
    <div>
        <!--<hsc-window-style-metal>

            <hsc-window title="Window 1" :resizable="true" :closeButton="true" :isOpen.sync="isOpen"
                        :minWidth="400" :minHeight="400" :maxWidth="400" :maxHeight="400">
                <iframe src="http://localhost:3000" width="400" height="400"></iframe>
            </hsc-window>

            <button @click="isOpen = ! isOpen">Toggle Window 1</button>

        </hsc-window-style-metal>-->
        <div class="card">
            <div class="card-header">
                WebAssembly
            </div>
            <div class="card-body">
                <div class="form-inline">
                    <input class="form-control" v-model="number" aria-label="">
                    <button class="btn btn-primary" @click="runSquarer">Compute</button>
                </div>

                <div>
                    <label>Result is {{ squarerResult }}</label>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="post">
                <div class="avatar"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>

            <div class="post">
                <div class="avatar"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>

            <div class="post">
                <div class="avatar"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
        </div>
    </div>
</template>

<script>
    function loadWebAssembly(fileName) {
        return fetch(fileName)
            .then(response => response.arrayBuffer())
            .then(buffer => WebAssembly.compile(buffer))
            .then(module => {return new WebAssembly.Instance(module) });
    }

    export default {
        name: "index",
        head: {
            title: 'New Things - Peter Ma Website'
        },
        data() {
            return {
                isOpen: false,
                squarer: null,
                number: 0,
                squarerResult: 0
            }
        },
        mounted() {
            loadWebAssembly('squarer.wasm')
                .then(instance => {
                    this.squarer = instance.exports._Z7squareri;
                    console.log('Finished compiling! Ready when you are...');
                });
        },
        methods: {
            runSquarer() {
                if(this.squarer !== null)
                    this.squarerResult = this.squarer(this.number);
                else
                    console.log('WebAssembly not finish complied!');
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .post {
        width: 220px;
        height: 80px;
    }
    .post .avatar {
        float: left;
        width: 52px;
        height: 52px;
        background-color: #ccc;
        border-radius: 25%;
        margin: 8px;
        background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
        background-size: 600px;
        animation: shine-avatar 1.6s infinite linear;
    }
    .post .line {
        float: left;
        width: 140px;
        height: 16px;
        margin-top: 12px;
        border-radius: 7px;
        background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
        background-size: 600px;
        animation: shine-lines 1.6s infinite linear;
    }
    .post .avatar + .line {
        margin-top: 11px;
        width: 100px;
    }
    .post .line ~ .line {
        background-color: #ddd;
    }

    @keyframes shine-lines {
        0% {
            background-position: -100px;
        }
        40%, 100% {
            background-position: 140px;
        }
    }
    @keyframes shine-avatar {
        0% {
            background-position: -32px;
        }
        40%, 100% {
            background-position: 208px;
        }
    }
</style>
