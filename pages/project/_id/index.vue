<template>
    <div class="container-fluid bg-dark text-white">
        <div class="row">
            <div class="col-3 text-center">
                <b-img v-if="project.coverImageUrl" class="mt-3" thumbnail fluid :src="project.coverImageUrl" alt="Image 1"></b-img>
                <!--<img class="project-cover-image mt-3" :src="project.coverImageUrl" alt="">-->
            </div>
            <div class="col-9 mt-3">
                <div class="d-flex justify-content-between">
                    <h2 class="align-self-center">{{ project.title }}</h2>
                    <b-dropdown v-if="user!==null && user.isAdmin" right variant="primary" class="m-2" title="More actions">
                        <template v-slot:button-content>
                            <font-awesome-icon class="mr-2" :icon="['fas', 'ellipsis-h']" />
                        </template>

                        <b-dropdown-item variant="primary" href="#" @click="editProject">
                            Edit &#9997;
                        </b-dropdown-item>
                        <b-dropdown-item variant="danger" href="#" @click="removeProject">
                            Remove &#10060;
                        </b-dropdown-item>
                    </b-dropdown>
                </div>
                <div class="">
                    <font-awesome-icon :icon="['far', 'user']" />
                    {{ author.username }}
                </div>
                <div class="form-group">
                    <font-awesome-icon :icon="['far', 'clock']" />
                    {{ project.createdDate }}
                </div>
                <hr class="line">
                <div class="">
                    <VueMarkdown v-if="finishInit" :source="project.content"></VueMarkdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueMarkdown from "vue-markdown";
    import ProjectService from "../../../services/project/projectService";
    import moment from "moment";
    import AccountService from "../../../services/account/accountService";

    export default {
        name: "index",
        components: {VueMarkdown},
        data() {
            return {
                project: {},
                finishInit: false,
                author: {}
            }
        },
        computed: {
            user: function () {
                return this.$store.state.user.user;
            }
        },
        mounted() {
            let projectId = this.$route.params.id;
            ProjectService.getProject(projectId).then(project => {
                project.createdDate = moment(project.createdDate).format('YYYY-MM-DD hh:mm a');
                this.project = project;
                this.finishInit = true;
                this.getAuthor(project.authorId);
            });
        },
        methods: {
            getAuthor(userId) {
                AccountService.getUser(userId).then(user => {
                    this.author = user;
                });
            },
            removeProject() {
                ProjectService.deleteProject(this.project._id).then(() => {
                    this.$router.push('/project');
                });
            },
            editProject() {
                this.$router.push('/project/' + this.project._id + '/edit');
            }
        }
    }
</script>

<style scoped>
    .project-cover-image {
        width: 100%;
        object-fit: cover;
        border-radius: 20px;
    }
</style>
