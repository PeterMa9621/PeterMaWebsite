<template>
    <div class="card project-card" @click="openDetail">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4 d-md-block d-sm-none pl-0 pr-0" style="height: 160px">
                    <img :src="project.coverImage?project.coverImage['url']:blankImage" alt="" class="project-cover-image">
                </div>
                <div class="col-md-8 col-sm-12">
                    <div class="card-body pt-0 pb-0">
                        <h3 class="card-title">
                            {{ project.title }}
                        </h3>
                        <div class="d-flex" v-html="project.summary"></div>
                        <div class="badge-list">
                            <div class="form-inline">
                                <h4 v-for="(tag, index) in project.tags" :key="index" class="mr-1">
                                    <b-badge variant="primary">
                                        {{tag}}
                                    </b-badge>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import blankImage from '~/assets/blank_image.png';

    export default {
        name: "ProjectCard",
        props: ['project'],
        data() {
            return {
                blankImage: blankImage
            }
        },
        methods: {
            openDetail() {
                this.$router.push('project/' + this.project._id);
            },
        }
    }
</script>

<style scoped>
    .project-card {
        height: 200px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.1);
        border-radius: 10px !important;
        background-color: aliceblue;
        padding: 20px;
        cursor: pointer;
        transition: opacity 0.5s, background-color 0.5s;
    }

    .project-card:hover {
        opacity: 0.9;
        background-color: #e7e0d0;
    }

    .project-cover-image {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .badge-list {
        display: block;
    }

    @media screen and (max-width: 768px) {
        .badge-list {
            display: none !important;
        }

    }

    @media screen and (max-width: 576px) {
        .d-sm-none {
            display: none !important;
        }
        h3 {
            font-size: 20px;
        }
    }
</style>
