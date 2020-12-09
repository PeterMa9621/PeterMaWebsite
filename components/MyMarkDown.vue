<template>
    <div>
        <VueMarkdown :source="translatedSource"></VueMarkdown>
    </div>
</template>

<script>
    import VueMarkdown from "vue-markdown";
    import ContentTranslator from "../common/ContentTranslator";

    export default {
        name: "MyMarkDown",
        components: {VueMarkdown},
        props: ['source'],
        computed: {
            translatedSource: function () {
                let result = ContentTranslator.translate(this.source);
                return result;
            }
        }
    }
</script>

<style scoped>

</style>
