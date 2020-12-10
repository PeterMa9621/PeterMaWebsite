<template>
    <div>
        <div class="row">
            <div class="col text-center mt-3 text-white">
                <h2>Create Blog</h2>
            </div>
        </div>
        <BlogEditor :submit-button-name="'Post'" :blog="blog" @submit="createBlog" />
    </div>
</template>

<script>
    import BlogService from "../../services/blog/blogService";
    import BlogEditor from "../../components/blog/BlogEditor";
    export default {
        name: "create",
        head: {
            title: 'Create a blog - Peter Ma Website'
        },
        middleware: 'authMiddleware',
        components: {
            BlogEditor,
        },
        data() {
            return {
                blog: {
                    title: '',
                    content: '',
                    labels: ''
                }
            }
        },
        methods: {
            createBlog(blog) {
                BlogService.createBlog(blog).then(() => {
                    this.$router.push('/blog');
                });
            }
        }
    }
</script>

<style scoped>

</style>
