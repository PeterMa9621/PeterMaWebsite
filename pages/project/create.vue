<template>
    <div class="container-fluid h-auto">
        <div class="row">
            <div class="col text-center mt-3 text-white">
                <h2>Create Project</h2>
            </div>
        </div>
        <ProjectEditor :submit-button-name="'Post'" :project="project" @submit="createProject"
                       @onAddContentImage="onAddContentImage" @onDeleteContentImage="onDeleteContentImage" />
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';
    import ProjectService from "../../services/project/projectService";
    import FileUtility from "../../common/utility/FileUtility";
    import ProjectEditor from "../../components/project/ProjectEditor";
    import addIcon from '~/assets/add_icon.png';

    export default {
        name: "create",
        head: {
            title: 'Create a project - Peter Ma Website'
        },
        components: {ProjectEditor, VueMarkdown},
        data() {
            return {
                project: {
                    title: '',
                    content: '',
                    coverImage: {},
                    summary: '',
                    contentImages: [{
                        id: '0',
                        url: addIcon
                    }]
                }
            }
        },
        methods: {
            createProject(project) {
                ProjectService.createProject(project).then(response => {
                    this.$alert("Created a project successfully!", "Succeed", "success").then(() => {
                        this.$router.push('/project/' + response['_id']);
                    });
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
