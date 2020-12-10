<template>
    <div class="container text-white h-auto">
        <div class="row">
            <div class="col mt-3">
                <div class="d-flex justify-content-between">
                    <h2 class="align-self-center">{{ blog.title }}</h2>
                    <b-dropdown v-if="user!==null && user.isAdmin" variant="primary" right class="m-2" title="More actions">
                        <template v-slot:button-content>
                            <font-awesome-icon class="mr-2" :icon="['fas', 'ellipsis-h']" />
                        </template>

                        <b-dropdown-item variant="primary" href="#" @click="editBlog">
                            Edit &#9997;
                        </b-dropdown-item>
                        <b-dropdown-item variant="danger" href="#" @click="removeBlog">
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
                    {{ blog.createdDate }}
                </div>
                <hr class="line">
                <div class="">
                    <VueMarkdown v-if="finishInit" :source="blog.content"></VueMarkdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';
    import BlogService from "../../../services/blog/blogService";
    import AccountService from "../../../services/account/accountService";
    import moment from "moment";

    export default {
        name: "index",
        head: {
            title: 'Blog detail - Peter Ma Website'
        },
        components: {VueMarkdown},
        data() {
            return {
                blog: {},
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
            let blogId = this.$route.params.id;
            BlogService.getBlog(blogId).then(blog => {
                blog.createdDate = moment(blog.createdDate).format('YYYY-MM-DD hh:mm a');
                this.blog = blog;
                this.finishInit = true;
                this.getAuthor(blog.authorId);
            });
        },
        methods: {
            getAuthor(userId) {
                AccountService.getUser(userId).then(user => {
                    this.author = user;
                });
            },
            removeBlog() {
                BlogService.deleteBlog(this.blog._id).then(() => {
                    this.$router.push('/blog');
                });
            },
            editBlog() {
                this.$router.push('/blog/' + this.blog._id + '/edit');
            }
        }
    }
</script>

<style scoped>
    div.editor {
        height: 70vh;
        -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
        box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.21);
        -webkit-border-radius: 10px 10px 10px 10px;
        border-radius: 10px 10px 10px 10px;
        overflow: auto;
    }

    .line {
        border: 0;
        background-color: #808080;
        height: 2px;
        border-radius: 1px;
    }
</style>
