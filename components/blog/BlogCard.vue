<template>
    <div class="card card-body pb-3 pt-3 blog-card" @click="openDetail">
        <div>
            <strong>Title: </strong>{{ blog.title }}
        </div>
        <div>
            <strong>Content: </strong>{{ blogContent }}
        </div>
        <div class="d-flex justify-content-between">
            <small>{{ blog.createdDate }}</small>
            <small>{{ user.username }}</small>
        </div>
    </div>
</template>

<script>
    import AccountService from "../../services/account/accountService";

    export default {
        name: "BlogCard",
        props: ['blog'],
        data() {
            return {
                user: {}
            }
        },
        computed: {
            blogContent: function () {
                if(this.blog.content.length > 30)
                    return this.blog.content.substring(0, 30) + '...';
                return this.blog.content;
            }
        },
        beforeMount() {
            this.getAuthor(this.blog.authorId);
        },
        methods: {
            openDetail() {
                this.$router.push('blog/' + this.blog._id);
            },
            getAuthor(userId) {
                AccountService.getUser(userId).then(user => {
                    this.user = user;
                });
            }
        }
    }
</script>

<style scoped>
    .blog-card {
        box-shadow: 0 10px 25px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.1);
        border-radius: 10px !important;
        background-color: aliceblue;
        padding: 20px;
        cursor: pointer;
        transition: opacity 0.5s, background-color 0.5s;
    }

    .blog-card:hover {
        opacity: 80%;
        background-color: #e7e0d0;
    }
</style>
