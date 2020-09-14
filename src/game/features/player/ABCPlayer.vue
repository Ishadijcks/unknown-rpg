<template>
  <div>
    <p>I'm a player</p>
    <player-action v-for="(action, index) in queue" :index="index" :action="action"
                   :key="index + '-' + action.description"></player-action>

  </div>
</template>

<script>
import {App} from "@/App.ts";
import PlayerAction from "@/game/features/player/ABCPlayerAction.vue";

export default {
  name: "ABCPlayer",
  components: {PlayerAction},
  data: function () {
    return {
      player: App.game.player,
    }
  },

  methods: {},

  computed: {
    queue() {
      return this.player.actionQueue;
    }
  }
}
</script>

<style scoped>

</style>
