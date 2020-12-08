<template>
    <div>
        <div class="small-img-container">
            <button class="operate-button" v-if="hover" @click="() => copyImageToContent()"
                    @mousemove="hover=true" @mouseout="hover=false">
                &#8593;
            </button>
            <img :src="src" class="small-img" alt="" @mouseover="hover=true" @mouseout="hover=false">

        </div>
        <div>
            <button class="btn btn-outline-secondary form-control"></button>
        </div>
    </div>
</template>

<script>
    import addImageIcon from '~/assets/add_image.png';
    import {v4 as uuidv4} from 'uuid';

    export default {
        name: "ImageThumbnail",
        props: ['src'],
        data() {
            return {
                addImageIcon: addImageIcon,
                hover: false,
                id: String
            }
        },
        methods: {
            copyImageToContent() {
                console.log('aa');
            },
            onAddImage(event) {
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
        height: auto;
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
