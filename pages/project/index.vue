<template>
    <div class="container-fluid" style="overflow-y: auto">
        <div class="row">
            <div class="col-xl-2 col-lg-1 col-sm-0"></div>
            <div class="col-xl-8 col-lg-10 col-sm-12 mt-3 mb-3">
                <NuxtLink v-if="user!==null" class="btn btn-outline-light" to="/project/create">Create Project</NuxtLink>
            </div>
            <div class="col-xl-2 col-lg-1 col-sm-0"></div>
        </div>
        <div class="row">
            <div class="col-xl-2 col-lg-1 col-sm-0"></div>
            <div class="col-xl-8 col-lg-10 col-sm-12">
                <div v-for="project in projects" :key="project._id" class="mb-3">
                    <ProjectCard :project="project" />
                </div>
            </div>
            <div class="col-xl-2 col-lg-1 col-sm-0"></div>
        </div>
    </div>
</template>

<script>
    import moment from "moment";
    import ProjectCard from "../../components/project/ProjectCard";
    import ProjectService from "../../services/project/projectService";

    export default {
        name: "index",
        components: {ProjectCard},
        data() {
            return {
                projects: [],
                next: ''
            }
        },
        computed: {
            user: function () {
                return this.$store.state.user.user;
            }
        },
        mounted() {
            ProjectService.getProjects().then(projects => {
                projects.forEach(project => {
                    project.createdDate = moment(project.createdDate).format('YYYY-MM-DD hh:mm a');
                });
                this.projects = projects;
            })
        }
    }
</script>

<style scoped>

</style>
