<template>
  <div class="inputFileld">
    <v-form>
      <v-container>
        <v-layout
          row
          wrap
        >
          <v-flex
            xs12
            sm12
            md12
          >
            <v-text-field
              v-model="theme"
              label="テーマ"
              placeholder="____で____する"
            />
          </v-flex>
          <v-flex
            xs8
            sm6
            md6
          >
            <v-text-field
              v-model="address"
              label="場所"
              placeholder="____県____市"
            />
          </v-flex>
          <v-flex xs12>
            <v-combobox
              v-model="select"
              class="tag-input"
              label="Tags"
              append-icon
              chips
              deletable-chips
              multiple
              item-text
              :search-input.sync="search"
              @keyup.tab="updateTags"
              @paste="updateTags"
            />
          </v-flex>
          <v-flex xs12>
            <v-btn
              block
              large
              color="success"
              @click="createEvent"
            >
              呼びかける
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>

<script>
  import EventStore from '../models/EventStore.js'

  export default {
    data () {
      return {
        text: '',
        chip3: true,
        select: [],
        items: [],
        theme: '',
        address: '',
        search: '', // sync search
        eventId: ''
      }
    },
    methods: {
      createEvent () {
        console.log('theme:' + this.$data.theme)
        console.log('address:' + this.$data.address)
        console.log('tags:' + this.$data.select)
        EventStore.dispatch('createEvent', {
          theme: this.$data.theme,
          address: this.$data.address,
          select: this.$data.select
        })

        console.log('eventId:' + EventStore.getters.eventId)
        this.$router.push('/view?eventId=' + EventStore.getters.eventId)
      },
      updateTags () {
        this.$nextTick(() => {
          this.select.push(...this.search.split(','))
          this.$nextTick(() => {
            this.search = ''
          })
        })
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
    background-color: #2196f3;
    color: #fff;
    font-size: 1em;
}

.tag-input span.v-chip {
    background-color: #2196f3;
    color: #fff;
    font-size: 1em;
    padding-left: 7px;
}

.tag-input span.v-chip::before {
    content: "label";
    font-family: "Material Icons";
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
    -webkit-font-feature-settings: "liga";
    -webkit-font-smoothing: antialiased;
}
</style>
