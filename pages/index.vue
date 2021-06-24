<template>
    <div class="">
        <div class="page-container h-100">
            <div class="page h-100">
                <PageBlock x-center y-center>
                    <div>
                        <div class="form-group">
                            <Logo />
                        </div>
                        <div>
                            <h1 class="title text-white">
                                Peter Ma
                            </h1>
                        </div>
                        <div>
                            <div class="links">
                                <NuxtLink to="/blog" class="button--green">Blog</NuxtLink>
                                <NuxtLink to="/project" class="button--green">My Project</NuxtLink>
                                <a
                                    href="https://github.com/PeterMa9621"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="button--grey"
                                >
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </PageBlock>
            </div>
            <div class="page h-100">
                <PageBlock x-center>
                    <div class="container-fluid h-100">
                        <div class="row h-100">
                            <div class="col-6 bg-programming"></div>
                            <div class="col-6 h-100 d-flex align-items-center text-center text-edu">
                                <div class="text-center w-100">
                                    <div>
                                        <h1>Skills</h1>
                                    </div>
                                    <div class="mt-3 text-left" style="font-size: 20px">
                                        <ul class="mt-3">
                                            <li>Language: Java, PHP, Python, JavaScript, HTML, CSS, C# and C</li>
                                            <li>Framework: Vue.js, Nuxt.js, React.js, Next.js, Node.js Express, Laravel, Zend, Django, Django Rest Framework and ASP .Net Core</li>
                                            <li>Database: MySQL, SQLite, MongoDB, Elasticsearch and Firebase DB</li>
                                            <li>Development Tool: VS Code, Android Studio, GitHub, GitLab, Bitbucket, Postman, Docker and Azure DevOps</li>
                                            <li>Technology: WebSocket and CI/CD</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </PageBlock>
            </div>
            <div class="page h-100">
                <PageBlock x-center>
                    <div class="container-fluid h-100">
                        <div class="row h-100">
                            <div class="col-6 h-100 d-flex align-items-center text-center text-edu">
                                <div class="text-center w-100">
                                    <div>
                                        <h1>Education</h1>
                                    </div>
                                    <div class="mt-3" style="font-size: 20px">
                                        I graduated from the University of Alberta with a Bachelor Specialization in Computing Science
                                    </div>
                                    <div class="mt-3" style="font-size: 20px">
                                        <h2>Relevant coursework</h2>
                                        <ul class="mt-3 text-left">
                                            <li>Database Management Systems</li>
                                            <li>Foundations of Information Retrieval</li>
                                            <li>Introduction to Software Engineering</li>
                                            <li>Intelligent Systems</li>
                                            <li>Machine Learning</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 bg-edu"></div>
                        </div>
                    </div>
                </PageBlock>
            </div>
            <div class="page h-100">
                <PageBlock x-center>
                    <div class="container-fluid h-100">
                        <div class="row h-100">
                            <div class="col-6 bg-working"></div>
                            <div class="col-6 h-100 d-flex align-items-center text-center text-edu">
                                <div class="text-center w-100">
                                    <div>
                                        <h1>Working Experience</h1>
                                    </div>
                                    <div class="mt-3 text-left" style="font-size: 20px">
                                        <ul class="mt-3">
                                            <li>
                                                Full-Stack Web Developer - (Feb. 2021 – Present)
                                                <ul>
                                                    <li>PDERAS</li>
                                                </ul>
                                            </li>
                                            <li>
                                                Full-Stack Web Developer - (May. 2019 – Aug. 2019, July. 2020 – Feb. 2021)
                                                <ul>
                                                    <li>UW Insure</li>
                                                </ul>
                                            </li>
                                            <li>
                                                Full-Stack Web Developer (Project based) - (Oct. 2020 – Nov. 2020)
                                                <ul>
                                                    <li>Solution MS Technology Inc.</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </PageBlock>
            </div>
        </div>
    </div>
</template>

<script>
import PageBlock from "../components/PageBlock";
export default {
    name: 'HomePage',
    head: {
        title: 'Peter Ma Website'
    },
    components: {PageBlock},
    data() {
        return {
            isOpen: true
        }
    }
}
</script>

<style scoped>

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

    .page-container {
        scroll-snap-type: y proximity;
        height: 100vh;
    }
    .page-container .page {
        scroll-snap-align: start;
        height: 100vh;
    }

    .bg-dark-gradient {
        background-color: #343a40;
        background-image: linear-gradient(#343a40, white);
    }

    .bg-edu {
        background-image: url("../assets/uofa.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }

    .text-edu {
        font-family: "Comic Sans MS", cursive, sans-serif;
    }

    .bg-programming {
        background-image: url("../assets/programming.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }

    .bg-working {
        background-image: url("../assets/working.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>
