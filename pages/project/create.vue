<template>
    <div class="">
        <div class="row">
            <div class="col text-center mt-3 text-white">
                <h2>Create Project</h2>
            </div>
        </div>
        <ProjectEditor :submit-button-name="'Post'" :project="project" @submit="createProject"
                       @onAddCoverImage="onAddCoverImage" />
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';
    import ProjectService from "../../services/project/projectService";
    import FileUtility from "../../common/utility/FileUtility";
    import ProjectEditor from "../../components/project/ProjectEditor";

    export default {
        name: "create",
        components: {ProjectEditor, VueMarkdown},
        data() {
            return {
                project: {
                    title: '',
                    content: '',
                    coverImage: null,
                    coverImageName: ''
                },
                coverImage: null
            }
        },
        methods: {
            createProject(project) {
                ProjectService.createProject(project).then(response => {
                    this.$alert("Created a project successfully!", "Succeed", "success").then(() => {
                        this.$router.push('/project/' + response['_id']);
                    });
                }).catch(error => {
                    this.$alert("Error occurs! Reason: " + error, "Error", "error");
                });
            },
            onAddCoverImage(event) {
                let files = event.target.files || event.dataTransfer.files;
                this.coverImage = files[0];
                FileUtility.getBase64(files[0]).then(result => this.project.coverImage = result);
                this.project.coverImageName = files[0].name;
            }
        }
    }
</script>

<style scoped>

</style>
