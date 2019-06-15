<template>
  <v-form>
    <v-container>
      <v-layout
        row
        wrap
      >
        <v-flex
          class="headline"
          xs12
          sm12
          md12
        >
          <v-text-field
            label="テーマ"
            :value="event.theme"
            placeholder="loading..."
            readonly
          />
        </v-flex>
        <v-flex
          class="headline"
          xs8
          sm6
          md6
        >
          <v-text-field
            label="場所"
            :value="event.address"
            placeholder="loading..."
            readonly
          />
        </v-flex>
        <v-flex
          xs4
          sm6
          md6
          edit-event
        >
          <v-btn
            fab
            large
            color="blue-grey"
            @click="editEvent"
          >
            <v-icon>
              edit
            </v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-chip
            v-for="tag in event.tags"
            :key="tag"
          >
            <v-icon left>
              label
            </v-icon>
            {{ tag }}
          </v-chip>
        </v-flex>
        <v-flex xs12>
          <v-btn
            block
            large
            color="success"
          >
            あつまる
          </v-btn>
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
    <v-container class="sns">
      <v-layout
        row
      >
        <v-flex
          xs12
        >
          <v-btn
            fab
            large
            class="twitter"
            @click="shareOnTwitter"
          >
            <v-icon>fab fa-twitter</v-icon>
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
