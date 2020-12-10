<template>
    <div :style="{'width': width?width:'auto', 'height': height?height:'600px'}" class="image-slider-container">
        <div v-for="(image,index) in images" :key="image['src']"
             :style="{'background-image': `url(${image['src']})`}"
             class="image-slider-item"
             :class="{
                'active': currentIndex===index
             }" @mouseover="shouldStopAutoplay=true" @mouseout="shouldStopAutoplay=false">
            <div class="slider-item-text">
                <div class="slider-item-text-bg">
                    <h2 class="slider-item-title">{{image['title']}}</h2>
                    <h2 class="slider-item-content">{{image['content']}}</h2>
                </div>
            </div>
        </div>
        <div class="image-slider-btn image-slider-btn-left" @click="() => showNextSlide(true)"
             @mouseover="shouldStopAutoplay=true" @mouseout="shouldStopAutoplay=false">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="32" viewBox="-1 -1 12 32">
                <path d="M 10,0 0,15 10,30" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </div>
        <div class="image-slider-btn image-slider-btn-right" @click="() => showNextSlide(false)"
             @mouseover="shouldStopAutoplay=true" @mouseout="shouldStopAutoplay=false">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="32" viewBox="-1 -1 12 32">
                <path d="M0 0l10 15L0 30" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ImageSlider",
        props: ['width', 'height', 'duration', 'images'],
        data() {
            return {
                currentIndex: 0,
                disappearIndex: -1,
                shouldStopAutoplay: false
            }
        },
        mounted() {
            setInterval(() => {
                if(!this.shouldStopAutoplay)
                    this.currentIndex = (this.currentIndex+1)%this.images.length;
            }, this.duration?this.duration:8000);
        },
        methods: {
            showNextSlide(previous=false) {
                let index = this.currentIndex + (previous?-1:1);
                if(index < 0)
                    index = this.images.length-1;
                this.currentIndex = index%this.images.length;
            }
        }
    }
</script>

<style scoped>
    .image-slider-container {
        position: relative;
    }

    .image-slider-item {
        width: 100%;
        height: 100%;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        display: none;

    }

    .image-slider-item.active {
        display: block;
        animation: 2s appear;
    }

    @keyframes appear {
        from {opacity: 0;}
        to {opacity: 1;}
    }

    .image-slider-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 30px;
        color: #7F828B;
        padding: 30px;
        cursor: pointer;
        transition: background-color 0.5s;
        background-color: rgba(83, 86, 95, 0.2);
        border-radius: 2px;
    }

    .image-slider-btn-left {
        left: 0;
    }

    .image-slider-btn-right {
        right: 0;
    }

    .image-slider-btn:hover {
        background-color: rgba(83, 86, 95, 0.8);
    }

    .slider-item-text {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: 1rem;
        color: #fff;
    }

    .slider-item-text-bg {
        background-color: rgba(103, 106, 115, 0.6);
        margin-bottom: 20px;
        border-radius: 5px;
    }

    .slider-item-title {
        padding: 0 2em;
        font-size: 2em;
        font-weight: 300;
        text-align: center;
    }

    .slider-item-content {
        padding: 0 2em;
        font-size: 1.3em;
        font-weight: 100;
        text-align: center;
    }
</style>
