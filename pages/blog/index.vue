<template>
    <div class="container-fluid" style="overflow-y: auto">
        <div class="row">
            <div class="col-xl-2 col-lg-1 col-sm-0"></div>
            <div class="col-xl-8 col-lg-10 col-sm-12 mt-3 mb-3">
                <NuxtLink v-if="user!==null && user.isAdmin" class="btn btn-outline-light" to="/blog/create">Create Post</NuxtLink>
            </div>
            <div class="col-xl-2 col-lg-1 col-sm-0"></div>
        </div>
        <div class="row">
            <div class="col-xl-2 col-lg-1 col-sm-0"></div>
            <div class="col-xl-8 col-lg-10 col-sm-12">
                <div v-for="blog in blogs" :key="blog._id" class="mb-3">
                    <BlogCard :blog="blog" />
                </div>
            </div>
            <div class="col-xl-2 col-lg-1 col-sm-0"></div>
        </div>
    </div>
</template>

<script>
    import BlogService from "../../services/blog/blogService";
    import BlogCard from "../../components/blog/BlogCard";
    import moment from 'moment';

    export default {
        name: "index",
        head: {
            title: 'Blog - Peter Ma Website'
        },
        components: {BlogCard},
        data() {
            return {
                blogs: [],
                next: ''
            }
        },
        computed: {
            user: function () {
                return this.$store.state.user.user;
            }
        },
        mounted() {
            BlogService.getBlogs().then(blogs => {
                blogs.forEach(blog => {
                    blog.createdDate = moment(blog.createdDate).format('YYYY-MM-DD hh:mm a');
                });
                this.blogs = blogs;
            })
        }
    }
</script>

<style scoped>

</style>
