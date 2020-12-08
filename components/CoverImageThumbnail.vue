<template>
    <div class="small-img-container" :class="{
        'can-delete': src!==undefined && src!==null,
        'can-add': src===undefined || src===null
    }">
        <button class="operate-button" v-if="hover" @click="() => onOperate(src!==undefined && src!==null)"
                @mousemove="hover=true" @mouseout="hover=false">
            {{ src ? '×' : '+' }}
        </button>
        <img :src="src?src:addImageIcon" class="small-img" alt="" @mouseover="hover=true" @mouseout="hover=false">
        <input ref="file" type="file" hidden @change="onAddImage">
    </div>
</template>

<script>
    import addImageIcon from '~/assets/add_image.png';

    export default {
        name: "CoverImageThumbnail",
        props: ['src'],
        data() {
            return {
                addImageIcon: addImageIcon,
                hover: false,
                id: String
            }
        },
        methods: {
            onOperate(isDeleteOperation) {
                if(!isDeleteOperation) {
                    this.$refs['file'].click();
                } else {
                    this.$refs['file'].value = '';
                    this.$emit('onDeleteCoverImage');
                }
            },
            onAddImage(event) {
                let files = event.target.files || event.dataTransfer.files;
                if(files.length > 0)
                    this.$emit('onAddCoverImage', event);
            }
        }
    }
</script>

<style scoped>
    .small-img-container {
        position: relative;
        width: 64px;
        height: 64px;
        vertical-align: middle;
        transition: all 0.5s;
    }

    .small-img-container.can-delete:hover {
        opacity: 0.8;
    }

    .small-img-container.can-add {
        cursor: pointer;
    }

    .small-img-container.can-add:hover {
        opacity: 0.8;
    }

    .small-img {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .operate-button {
        z-index: 3;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
        font-size: 50px;
        border: none;
        background: none;
        color: rgba(182, 0, 0, 0.6);
    }
</style>
