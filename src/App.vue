<template>
  <div id="app" class="container">
    <div class="columns is-centered is-multiline">
      <div class="column is-half is-clearfix">
        <b-field label="Message">
          <b-input type="textarea" v-model="text"></b-input>
        </b-field>
        <button @click="clear" class="button is-fullwidth">Clear</button>
      </div>

      <div v-if="text" class="column is-three-fifths">
        <pre class="has-text-left">{{transform}}</pre>
        <div class="buttons has-addons is-centered">
          <button @click="shuffle = Math.random()" class="button">Shuffle</button>
          <button
            v-clipboard:copy="transform"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            class="button is-success"
          >Copy</button>
        </div>
      </div>
    </div>
    <div class="footer is-three-fifths">
      <button @click="demo" class="button">Demo</button>
    </div>
  </div>
</template>

<script>
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default {
  name: "App",
  data() {
    return {
      text: "",
      shuffle: null
    };
  },
  methods: {
    clear() {
      this.text = "";
    },
    demo() {
      this.text =
        "lend me your arms,\nfast as thunderbolts,\nfor a pillow on my journey.";
    },
    onCopy: function() {
      this.$toast.open({
        message: "Copied!",
        type: "is-success",
        position: "is-bottom"
      });
    },
    onError: function() {
      this.$toast.open({
        message: "Error!",
        type: "is-danger",
        position: "is-bottom"
      });
    }
  },
  computed: {
    transform() {
      void this.shuffle;

      let sentences = this.text.split("\n").map(s => s.trim());

      let lastWords = sentences.map(s =>
        s
          .split(" ")
          .pop()
          .replace(/[^\w\s]|_/g, "")
          .replace(/\s+/g, " ")
      );

      sentences = sentences.map((s, i) => s.replace(lastWords[i], "(  )"));
      lastWords = shuffle(lastWords);

      return `${sentences.join("\n")}\n\n${lastWords
        .map((w, i) => `${i + 1}. ${w}`)
        .join("  ")}`;
    }
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}

.container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.columns {
  flex-grow: 1;
}

.footer {
  background: white;
  padding: 1rem;
  flex-shrink: 0;
}

.buttons .button {
  width: 50%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
