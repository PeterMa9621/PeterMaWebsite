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
                images: []
            }
        },
        mounted() {
            let translator = new ContentTranslator(this.source);
            this.translatedSource = translator.translate();
            this.images = translator.getSavedParams('slider-item');
        }
    }
</script>

<style scoped>

</style>
