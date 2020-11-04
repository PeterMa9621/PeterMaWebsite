<template>
    <div class="container-fluid">
        <div class="row mt-3 pl-3 pr-3">
            <div class="col-6">
                <div class="card card-body editor">
                    <label class="text-left">
                        Title
                        <input class="form-control" v-model="blog.title">
                    </label>
                    <label class="text-left">
                        Content
                        <textarea rows="20" class="form-control editor-content" v-model="blog.content"></textarea>
                    </label>
                    <label class="text-left">
                        Labels
                        <input class="form-control" v-model="blog.labels">
                    </label>
                    <button class="btn btn-outline-primary" @click="submit">
                        {{submitButtonName}}
                    </button>
                </div>
            </div>
            <div class="col-6">
                <div class="card card-body editor text-left">
                    <h3>{{ blog.title }}</h3>
                    <VueMarkdown :source="blog.content"></VueMarkdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';

    export default {
        name: "BlogEditor",
        components: {VueMarkdown},
        props: ['submitButtonName', 'blog'],
        methods: {
            submit: function () {
                this.$emit('submit', this.blog);
            }
        }
    }
</script>

<style scoped>
    div.editor {
        height: 80vh;
        -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
        box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.21);
        -webkit-border-radius: 10px 10px 10px 10px;
        border-radius: 10px 10px 10px 10px;
        overflow: auto;
    }

    textarea.editor-content {
        resize: none;
    }
</style>
