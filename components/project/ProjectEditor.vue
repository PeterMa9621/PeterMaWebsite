<template>
    <div class="container-fluid">
        <div class="row mt-3 pl-3 pr-3">
            <div class="col-6">
                <div class="card card-body editor">
                    <label class="text-left">
                        Title
                        <input class="form-control" v-model="project.title">
                    </label>
                    <label class="text-left">
                        Content
                        <textarea rows="19" class="form-control editor-content" v-model="project.content"></textarea>
                    </label>
                    <div class="form-group">
                        <label class="text-left">
                            Cover Image
                        </label>
                        <div>
                            <input type="file" @change="onAddCoverImage" />
                        </div>
                    </div>
                    <button class="btn btn-outline-primary" @click="submit">
                        {{submitButtonName}}
                    </button>
                </div>
            </div>
            <div class="col-6">
                <div class="card card-body editor text-left">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-4">
                                <img class="project-cover-image" :src="project.coverImage || project.coverImageUrl" alt="">
                            </div>
                            <div class="col-8">
                                <h3>{{ project.title }}</h3>
                                <VueMarkdown :source="project.content"></VueMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';

    export default {
        name: "ProjectEditor",
        components: {VueMarkdown},
        props: ['submitButtonName', 'project'],
        methods: {
            onAddCoverImage(e) {
                this.$emit('onAddCoverImage', e);
            },
            submit() {
                this.$emit('submit', this.project);
            }
        }
    }
</script>

<style scoped>
    div.editor {
        height: 80vh;
        -webkit-box-shadow: 0 30px 60px 0 rgba(218, 218, 218, 0.3);
        box-shadow: 0 30px 60px 0 rgba(179, 179, 179, 0.21);
        -webkit-border-radius: 10px 10px 10px 10px;
        border-radius: 10px 10px 10px 10px;
        overflow: auto;
    }

    textarea.editor-content {
        resize: none;
    }

    .project-cover-image {
        width: 100%;
        object-fit: cover;
    }
</style>
