<template>
    <div>
        <b-row v-for="i in Math.ceil(imagesLength/3)" :key="'row_' + i">
            <b-col v-for="j in 3" :key="'img_' + i + '_' + j">
                <b-img v-if="(i-1)*3 + (j-1) < imagesLength" thumbnail fluid style="height: 100px"
                       :src="images[(i-1)*3 + (j-1)]['url']" alt="Image" class="preview-image"
                       @click="() => onOperate(images[(i-1)*3 + (j-1)]['id']==='0', (i-1)*3 + (j-1))"></b-img>
                <div v-if="((i-1)*3 + (j-1) < imagesLength) && images[(i-1)*3 + (j-1)]['id']!=='0'">
                    <button class="btn btn-outline-secondary form-control"
                            @click="() => onDeleteImage(images[(i-1)*3 + (j-1)]['id'])">
                        ×
                    </button>
                </div>
            </b-col>
        </b-row>
        <input ref="file" type="file" hidden @change="onAddImage">
    </div>
</template>

<script>
    import ImageThumbnail from "./ImageThumbnail";
    import {v4 as uuidv4} from 'uuid';

    export default {
        name: "ThumbnailList",
        components: {ImageThumbnail},
        props: ['images'],
        data() {
            return {
            }
        },
        computed: {
            imagesLength: function () {
                return Object.keys(this.images).length;
            }
        },
        methods: {
            onOperate(isAddButton, indexOfImage) {
                  if(isAddButton) {
                      this.$refs['file'].click();
                  } else {
                      this.$emit('onInsertImageToContent', `<img src='${this.images[indexOfImage]['url']}' style='max-width: 100%' />`);
                  }
            },
            onAddImage(event) {
                let files = event.target.files || event.dataTransfer.files;
                if(files.length > 0)
                    this.$emit('onAddContentImage', {id: uuidv4(), event: event});
            },
            onDeleteImage(id) {
                this.$refs['file'].value = '';
                this.$emit('onDeleteContentImage', id);
            }
        }
    }
</script>

<style scoped>
    .preview-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: all 0.5s;
    }

    .preview-image:hover {
        cursor: pointer;
        opacity: 0.7;
    }
</style>
