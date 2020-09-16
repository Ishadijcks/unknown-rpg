<template>
  <g>
    <path :d="svgPath" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/>
  </g>
</template>

<script>
import {App} from "@/App";
import {Road} from "@/game/features/world/roads/Road";

export default {
  name: "ABCRoad",
  props: {
    fromX: {
      type: Number,
      required: true,
    },
    fromY: {
      type: Number,
      required: true,
    },
    toX: {
      type: Number,
      required: true,
    },
    toY: {
      type: Number,
      required: true,
    },
    road: {
      type: Road,
      required: true,
    },
  },

  data: function () {
    return {
      player: App.game.player
    }
  },
  computed: {
    svgPath() {
      return `M ${this.fromX} ${this.fromY} L ${this.interpolatedX} ${this.interpolatedY}`
    },

    interpolatedX() {
      if (this.reverse) {
        return (this.fromX - this.toX) * this.percentage + this.toX;
      }
      return (this.toX - this.fromX) * this.percentage + this.fromX;
    },
    interpolatedY() {
      if (this.reverse) {
        return (this.fromY - this.toY) * this.percentage + this.toY;

      }
      return (this.toY - this.fromY) * this.percentage + this.fromY;
    },
    percentage() {
      return App.game.player.isTravelingRoad(this.road) ? App.game.player.actionQueue[0].getProgressPercentage() : 1;
    },
    reverse() {
      return App.game.player.isTravelingRoad(this.road) && App.game.player.actionQueue[0].location.equals(this.road.to);
    },
  }
}
</script>

<style scoped>

</style>
