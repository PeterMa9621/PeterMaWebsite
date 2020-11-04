<template>
    <div class="container h-100">
        <div class="d-flex align-items-center justify-content-center text-center h-100">
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
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
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
</style>
