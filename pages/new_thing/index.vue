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
