<template>
    <div>
        <div class="row">
            <div class="col text-white text-center">
                <h3>Edit Blog</h3>
            </div>
        </div>
        <BlogEditor v-if="finishInit" :submit-button-name="'Edit'" :blog="blog" @submit="editBlog" />
    </div>
</template>

<script>
    import BlogEditor from "../../../components/blog/BlogEditor";
    import BlogService from "../../../services/blog/blogService";
    import moment from "moment";
    export default {
        name: "edit",
        components: {BlogEditor},
        data() {
            return {
                blog: {},
                finishInit: false
            }
        },
        computed: {
            blogId: function () {
                return this.$route.params.id;
            }
        },
        mounted() {
            BlogService.getBlog(this.blogId).then(blog => {
                this.blog = blog;
            }).finally(() => {
                this.finishInit = true;
            });
        },
        methods: {
            editBlog(blog) {
                BlogService.updateBlog(this.blogId, blog).then(() => {
                     this.$router.push('/blog/' + this.blogId);
                });
            }
        }
    }
</script>

<style scoped>

</style>
