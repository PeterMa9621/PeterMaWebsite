<template>
    <div>
        <div class="row">
            <div class="col text-white text-center">
                <h3>Edit Project</h3>
            </div>
        </div>
        <ProjectEditor v-if="finishInit" :submit-button-name="'Edit'" :project="project" @submit="editProject" />
    </div>
</template>

<script>
    import ProjectEditor from "../../../components/project/ProjectEditor";
    import ProjectService from "../../../services/project/projectService";
    export default {
        name: "edit",
        components: {ProjectEditor},
        data() {
            return {
                finishInit: false,
                project: {}
            }
        },
        computed: {
            projectId: function () {
                return this.$route.params.id;
            }
        },
        mounted() {
            ProjectService.getProject(this.projectId).then(project => {
                this.project = project;
            }).finally(() => {
                this.finishInit = true;
            });
        },
        methods: {
            editProject() {
                ProjectService.editProject(this.projectId, this.project).then(() => {
                    this.$router.push('/project/' + this.projectId);
                });
            }
        }
    }
</script>

<style scoped>

</style>
