<template>
    <div>
        <ImageSlider v-if="images.length > 0" :images="images" />
        <VueMarkdown :source="translatedSource"></VueMarkdown>
    </div>
</template>

<script>
    import VueMarkdown from "vue-markdown";
    import ContentTranslator from "../common/ContentTranslator";
    import ImageSlider from "./ImageSlider";

    export default {
        name: "MyMarkDown",
        components: {ImageSlider, VueMarkdown},
        props: ['source'],
        data() {
            return {
                translatedSource: '',
                images: [],
                translator: null
            }
        },
        watch: {
            source: function (newSource) {
                this.translatedSource = this.translator.translate(newSource);
                this.images = this.translator.getSavedParams('slider-item');
            }
        },
        mounted() {
            this.translator = new ContentTranslator();
            this.translatedSource = this.translator.translate(this.source);
            this.images = this.translator.getSavedParams('slider-item');
        }
    }
</script>

<style scoped>

</style>
