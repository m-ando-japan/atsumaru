<template>
  <v-form>
    <v-container>
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
        <v-textarea
          name="input-7-1"
          label="やること"
          placeholder="こんなことやるからみんな集まれ"
        ></v-textarea>
      </v-flex>
        
        <v-flex xs12>
          <v-btn
            block
            large
            color="success"
          >
            手をあげる
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  import EventStore from '../models/EventStore.js'
  export default {
    data () {
      return {
        text: '',
        items: [],
        search: ''
      }
    },
    computed: {
      event () {
        return EventStore.getters.event
      }
    },
    mounted () {
      EventStore.dispatch('getEvent', this.$route.query.eventId)
    },
    methods: {
      editEvent () {
        this.$router.push('/create')
      },
      updateTags () {
        this.$nextTick(() => {
          this.select.push(...this.search.split(','))
          this.$nextTick(() => {
            this.search = ''
          })
        })
      },
      shareOnTwitter () {
        window.open(
          'https://twitter.com/intent/tweet' +
            '?text=' + encodeURIComponent('"' + EventStore.getters.event.theme + '"呼びかけを応援します！ | ') +
            '&hashtags=' + EventStore.getters.event.address + ',' + EventStore.getters.event.tags.join(',') + ',atsumaru' +
            '&url=' + location.origin + '/view?eventId=' + this.$route.query.eventId
        )
      }
    }
  }
</script>

<style>
.edit-event {
  text-align: right;
}
#input-usage .v-input__prepend-outer,
#input-usage .v-input__append-outer,
#input-usage .v-input__slot,
#input-usage .v-messages {
  border: 1px dashed rgba(0, 0, 0, 0.4);
}

span.chip {
  background-color: #2196f3 !important;
  color: #fff !important;
  font-size: 1em;
}

span.v-chip {
  background-color: #2196f3 !important;
  color: #fff !important;
  font-size: 1em;
  padding-left: 7px;
}

.favorites {
    text-align: center;
}
.favorites i {
  font-size: 50px !important;
}
.favorites span {
  color: rgba(0,0,0,0.54);
  font-size: 60px !important;
}

.sns {
  position: fixed;
  width: 100%;
  max-width: 100%;
  bottom: 0;
  text-align: center;
}
.sns .layout.row {
  position: absolute;
  left: calc((100vw - 104px) / 2);
  bottom: 10px;
}
.sns .twitter {
  background-color: #1b95e0 !important;
}
</style>
