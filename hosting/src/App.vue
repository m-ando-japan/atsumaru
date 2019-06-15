<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span>atsumaru</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
      </v-btn>
    </v-toolbar>

    <v-content>
      <ViewEvent/>
    </v-content>
  </v-app>
</template>

<script>
import ViewEvent from './components/ViewEvent'

export default {
  name: 'App',
  components: {
    ViewEvent
  },
  data () {
    return {
      //
    }
  }
}
</script>
