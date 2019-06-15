<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span
          class="home-action"
          @click="backToHome"
        >atsumaru</span>
      </v-toolbar-title>
      <img
        class="header-logo"
        src="/logo.png"
      >
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
.header-logo {
  position: relative;
  height: 30px;
  margin-left: 10px;
}
</style>
