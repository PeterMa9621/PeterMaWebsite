<template>
    <div class="container-fluid">
        <div class="row mt-3 pl-3 pr-3">
            <div class="col-6">
                <div class="card card-body editor">
                    <div class="row">
                        <div class="col-3 d-flex justify-content-center">
                            <CoverImageThumbnail :src="project.coverImage?project.coverImage['url']:undefined"
                                                 @onAddCoverImage="onAddCoverImage" @onDeleteCoverImage="onDeleteCoverImage" />
                        </div>
                        <div class="col-9">
                            <label class="text-left" for="title">Title</label>
                            <input id="title" class="form-control" v-model="project.title">
                        </div>
                    </div>

                    <label class="text-left">
                        Summary
                        <textarea rows="3" class="form-control editor-content" v-model="project.summary"></textarea>
                    </label>
                    <label class="text-left">
                        Content
                        <textarea ref="content" rows="14" class="form-control editor-content" v-model="project.content"></textarea>
                    </label>
                    <div class="form-group">
                        <label class="text-left">
                            Upload Images
                        </label>
                        <div>
                            <ThumbnailList :images="project.contentImages"
                                           @onAddContentImage="onAddContentImage"
                                           @onDeleteContentImage="onDeleteContentImage"
                                           @onInsertImageToContent="onInsertImageToContent"/>
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
                                <img class="project-cover-image" :src="project.coverImage?project.coverImage['url']:blankImage" alt="">
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
    import CoverImageThumbnail from "../CoverImageThumbnail";
    import ImageThumbnail from "../ImageThumbnail";
    import ThumbnailList from "../ThumbnailList";
    import FileUtility from "../../common/utility/FileUtility";
    import {v4 as uuidv4} from 'uuid';
    import URLUtility from "../../common/utility/URLUtility";
    import blankImage from '~/assets/blank_image.png';

    export default {
        name: "ProjectEditor",
        components: {ThumbnailList, ImageThumbnail, CoverImageThumbnail, VueMarkdown},
        props: ['submitButtonName', 'project'],
        data() {
            return {
                blankImage: blankImage
            }
        },
        methods: {
            onAddCoverImage(event) {
                let files = event.target.files || event.dataTransfer.files;
                FileUtility.getBase64(files[0]).then(result => {
                    if(!('coverImage' in this.project))
                        this.$set(this.project, 'coverImage', {});
                    this.$set(this.project.coverImage, 'src', result);
                    this.$set(this.project.coverImage, 'url', URLUtility.createObjectURL(files[0]));
                    this.$set(this.project.coverImage, 'id', uuidv4());
                    this.$set(this.project.coverImage, 'extension', files[0].name.split('.')[1]);
                });
            },
            onDeleteCoverImage() {
                this.project.coverImage = {};
            },
            onAddContentImage(data) {
                this.$emit('onAddContentImage', data);
            },
            onDeleteContentImage(id) {
                this.$emit('onDeleteContentImage', id);
            },
            onInsertImageToContent(text) {
                this.insertAtCursor(this.$refs['content'], text);
            },
            submit() {
                let index = this.project.contentImages.length-1;
                if(this.project.contentImages[index]['id'] === '0')
                    this.project.contentImages.splice(index, 1);
                this.$emit('submit', this.project);
            },
            insertAtCursor(input, text) {
                if (input.selectionStart || input.selectionStart === '0') {
                    let startPos = input.selectionStart;
                    let endPos = input.selectionEnd;
                    this.project.content = this.project.content.substring(0, startPos)
                        + text
                        + this.project.content.substring(endPos, this.project.content.length);
                } else {
                    this.project.content += text;
                }
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
