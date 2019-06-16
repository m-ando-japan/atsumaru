<template>
  <v-form>
    <v-container>
      <v-layout
        row
        wrap
        home
      >
        <v-flex
          xs12
          sm6
          md6
          main
        >
          <p class="display-1">
            呼びかけて<br>
            あつまって<br>
            手をあげよう！
          </p>
          <img
            src="/logo.svg"
            alt="logo"
          >
          <h2>atsumaru</h2>
        </v-flex>
        <v-flex xs12>
          <v-btn
            block
            large
            color="success"
            @click="start"
          >
            呼びかける
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    methods: {
      start () {
        this.$router.push('/create')
      }
    }
  }
</script>

<style>
.layout.home {
  justify-content: center;
}
div.main {
  text-align: center;
}
div.main p {
  margin: 30px auto;
  line-height: 150% !important;
}
div.main img {
  width: 50%;
}
</style>
