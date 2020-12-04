<template>
    <div class="h-100 d-flex"
         :class="{
            'justify-content-center': xCenter!==undefined,
            'text-center': xCenter!==undefined,
            'align-items-center' : yCenter!==undefined
         }"
    >
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "PageBlock",
        props: ['xCenter', 'yCenter']
    }
</script>

<style scoped>

</style>
