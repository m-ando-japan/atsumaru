<template>
  <v-form>
    <v-container>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          sm6
          md3
        >
          <v-text-field
            label="テーマ"
            :value="event.theme"
            readonly
          />
        </v-flex>

        <v-flex
          xs12
          sm6
          md3
        >
          <v-text-field
            label="場所"
            :value="event.address"
            readonly
          />
        </v-flex>

        <v-flex xs12>
          <v-chip
            v-for="tag in select"
            :key="tag"
            color="success"
            text-color="white"
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
            color="success"
          >
            参加
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn
            block
            color="success"
          >
            開催
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn
            block
            color="success"
          >
            編集
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn
            block
            color="success"
            @click="shareOnTwitter"
          >
            シェア
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
        chip3: true,
        select: ['add-tags-with', 'enter', 'tab', 'paste'],
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
          'https://twitter.com/intent/tweet?text=テスト&hashtags=z&url=' +
            location.origin + '/view?eventId=' + this.$route.query.eventId
        )
      }
    }
  }
</script>

<style>
#input-usage .v-input__prepend-outer,
#input-usage .v-input__append-outer,
#input-usage .v-input__slot,
#input-usage .v-messages {
  border: 1px dashed rgba(0, 0, 0, 0.4);
}

.tag-input span.chip {
  background-color: #1976d2;
  color: #fff;
  font-size: 1em;
}

.tag-input span.v-chip {
  background-color: #1976d2;
  color: #fff;
  font-size: 1em;
  padding-left: 7px;
}

.tag-input span.v-chip::before {
  content: 'label';
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 20px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
</style>
