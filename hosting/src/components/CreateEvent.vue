<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 md3>
          <v-text-field label="テーマ"></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 md3>
          <v-text-field label="場所" placeholder="〇〇県〇〇市"></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-combobox
            multiple
            v-model="select"
            label="Tags"
            append-icon
            chips
            deletable-chips
            class="tag-input"
            :search-input.sync="search"
            @keyup.tab="updateTags"
            @paste="updateTags"
          ></v-combobox>
        </v-flex>

        <v-flex xs12>    
          <v-btn @click="createEvent" block color="success">投稿</v-btn>        
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      chip3: true,
      select: ["add-tags-with", "enter", "tab", "paste"],
      items: [],
      search: "" //sync search
    };
  },
  methods: {
    createEvent() {
      this.$router.push('/view');
    },
    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(","));
        this.$nextTick(() => {
          this.search = "";
        });
      });
    }
  }
};
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
