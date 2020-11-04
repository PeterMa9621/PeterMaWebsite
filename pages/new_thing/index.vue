<template>
    <div>
        <hsc-window-style-metal>

            <hsc-window title="Window 1" :resizable="true" :closeButton="true" :isOpen.sync="isOpen"
                        :minWidth="400" :minHeight="400" :maxWidth="400" :maxHeight="400">
                <iframe src="http://localhost:3000" width="400" height="400"></iframe>
            </hsc-window>

            <button @click="isOpen = ! isOpen">Toggle Window 1</button>

        </hsc-window-style-metal>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                isOpen: false
            }
        }
    }
</script>

<style scoped>

</style>
