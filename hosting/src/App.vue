<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span
          class="home-action"
          @click="backToHome"
        >atsumaru</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
  export default {
    methods: {
      backToHome () {
        this.$router.push('/')
      }
    }
  }
</script>

<style>
.headline .home-action:hover {
    cursor: pointer;
}
</style>
