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
        <v-flex
          xs12
          class="favorites"
        >
          <v-icon color="pink">
            favorite
          </v-icon>
          <span>99</span>
        </v-flex>
        <v-flex xs12>
          <v-btn
            block
            large
            color="success"
            @click.stop="dialog = true"
          >
            あつまる
          </v-btn>
        </v-flex>
        <v-dialog
          v-model="dialog"
          type="boolean"
          width="500"
        >
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              通知先の設定
            </v-card-title>

            <v-card-text>
              メールアドレスを登録してください。
            </v-card-text>

            <v-card-text>
              登録されたメールアドレスは通知用以外に使用されることはありません。
            </v-card-text>

            <v-card-text>
              <v-text-field
                v-model="email"
                label="メールアドレス"
                placeholder="user@atsumaru.example"
              />
            </v-card-text>

            <v-divider />

            <v-card-actions class="dialog-footer">
              <v-spacer />
              <v-btn
                color="primary"
                @click="submitToJoin"
              >
                登録する
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-flex xs12>
          <v-btn
            block
            large
            color="success"
            @click="raiseHand"
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
  import MemberStore from '../models/MemberStore.js'
  export default {
    data () {
      return {
        dialog: false,
        email: '',
        text: '',
        items: [],
        search: '',
        eventId: ''
      }
    },
    computed: {
      event () {
        return EventStore.getters.event
      }
    },
    mounted () {
      this.$data.eventId = this.$route.query.eventId
      EventStore.dispatch('getEvent', this.$data.eventId)
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
            '&url=' + location.origin + '/view?eventId=' + this.$data.eventId
        )
      },
      submitToJoin () {
        MemberStore.dispatch('postMember', {
          eventId: this.$data.eventId,
          email: this.$data.email
        })
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
@media screen and (max-height: 700px) {
  .sns {
    position: relative;
  }
  .sns .layout.row {
    top: 0;
  }
}
.sns .twitter {
  background-color: #1b95e0 !important;
}
.dialog-footer {
  padding: 20px 15px !important;
}
</style>
