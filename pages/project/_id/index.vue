<template>
    <div class="container-fluid bg-dark text-white h-auto">
        <div class="row">
            <div class="col-3 text-center">
                <b-img v-if="project.coverImage && project.coverImage['url']" class="mt-3"
                       :src="project.coverImage['url']" alt="Image 1"></b-img>
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
                <div>
                    <font-awesome-icon :icon="['far', 'user']" />
                    {{ author.username }}
                </div>
                <div>
                    <font-awesome-icon :icon="['far', 'clock']" />
                    {{ project.createdDate }}
                </div>
                <div class="form-inline">
                    <h4 v-for="(tag, index) in project.tags" :key="index" class="mr-2">
                        <b-badge variant="primary">
                            {{tag}}
                        </b-badge>
                    </h4>
                </div>
                <hr class="line">
                <div class="">
                    <div class="mb-3">
                        <h3>Summary:</h3>
                        <div v-html="project.summary"></div>
                    </div>
                    <MyMarkDown v-if="finishInit" :source="project.content"></MyMarkDown>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ProjectService from "../../../services/project/projectService";
    import moment from "moment";
    import AccountService from "../../../services/account/accountService";
    import MyMarkDown from "../../../components/MyMarkDown";

    export default {
        name: "index",
        components: {MyMarkDown},
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

    .line {
        background-color: #808080;
        border: 0 #808080;
        height: 2px;
        border-radius: 1px;
    }
</style>
