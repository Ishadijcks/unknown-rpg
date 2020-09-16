<template>
  <g @click="moveTo">
    <ellipse :cx="x" :cy="y" rx="40" ry="40" class="town" :class="{'town-active' : currentlyHere}"/>
    <text :x="x" :y="y" class="town-text">
      {{ town.displayName }}
    </text>
  </g>
</template>

<script>
import {Town} from "@/game/features/world/towns/Town";
import {App} from "@/App.ts"

export default {
  name: "ABCTown",
  props: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    town: {
      type: Town,
      required: true,
    },
  },

  methods: {
    moveTo() {
      App.game.world.moveToLocation(this.town.identifier);
    },
  },
  computed: {
    currentlyHere() {
      return App.game.world.playerLocation.equals(this.town.identifier);
    }
  }
}
</script>

<style scoped>
.town {
  stroke: #000000;
  fill: #ffffff;
  pointer-events: all;
}

.town-active {
  fill: #00ff00;

}

.town-text {
  fill: #000000;
  font-size: 12px;
  text-anchor: middle;
}
</style>
