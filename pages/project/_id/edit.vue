<template>
    <div class="container-fluid h-auto">
        <div class="row">
            <div class="col text-white text-center">
                <h3>Edit Project</h3>
            </div>
        </div>
        <ProjectEditor v-if="finishInit" :submit-button-name="'Edit'" :project="project" @submit="editProject"
                       @onAddContentImage="onAddContentImage" @onDeleteContentImage="onDeleteContentImage"/>
    </div>
</template>

<script>
    import ProjectEditor from "../../../components/project/ProjectEditor";
    import ProjectService from "../../../services/project/projectService";
    import addIcon from '~/assets/add_icon.png';
    import FileUtility from "../../../common/utility/FileUtility";

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
                this.project.contentImages.push({
                    id: '0',
                    url: addIcon
                });
            }).finally(() => {
                this.finishInit = true;
            });
        },
        methods: {
            editProject() {
                ProjectService.editProject(this.projectId, this.project).then(() => {
                    this.$router.push('/project/' + this.projectId);
                }).catch(error => {
                    this.project.contentImages.push({
                        id: '0',
                        url: addIcon
                    });
                    this.$alert("Error occurs! Reason: " + error, "Error", "error");
                });
            },
            onAddContentImage({id: id, event: event}) {
                let files = event.target.files || event.dataTransfer.files;
                let ext = files[0].name.split('.')[1];
                FileUtility.getBase64(files[0]).then(result => this.project.contentImages.unshift({
                    id: id,
                    src: result,
                    url: URL.createObjectURL(files[0]),
                    extension: ext
                }));
            },
            onDeleteContentImage(id) {
                for(let i=0; i<Object.keys(this.project.contentImages).length; i++) {
                    if(this.project.contentImages[i]['id'] === id) {
                        this.project.contentImages.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
