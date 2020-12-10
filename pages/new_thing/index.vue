<template>
    <div>
        <!--<hsc-window-style-metal>

            <hsc-window title="Window 1" :resizable="true" :closeButton="true" :isOpen.sync="isOpen"
                        :minWidth="400" :minHeight="400" :maxWidth="400" :maxHeight="400">
                <iframe src="http://localhost:3000" width="400" height="400"></iframe>
            </hsc-window>

            <button @click="isOpen = ! isOpen">Toggle Window 1</button>

        </hsc-window-style-metal>-->

        <ImageSlider />
    </div>
</template>

<script>
    import ImageSlider from "../../components/ImageSlider";
    export default {
        name: "index",
        components: {ImageSlider},
        data() {
            return {
                isOpen: false
            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">

</style>
