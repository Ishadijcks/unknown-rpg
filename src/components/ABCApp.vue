<template>
  <div class="container">

    <wallet></wallet>
    <skills></skills>
    <settings></settings>
    <statistics></statistics>
    <achievements></achievements>
    <world></world>
    <player></player>
    <player-inventory></player-inventory>

  </div>
</template>

<script>
import ABCPlayer from "@/components/player/ABCPlayer.vue";
import ABCWallet from "@/engine/features/wallet/ABCWallet.vue";
import ABCSettings from "@/engine/features/settings/ABCSettings.vue";
import ABCStatistics from "@/engine/features/statistics/ABCStatistics.vue";
import ABCAchievements from "@/engine/features/achievements/ABCAchievements.vue";
import ABCWorld from "@/components/world/ABCWorld.vue";
import ABCSkills from "@/components/skills/ABCSkills.vue";
import ABCPlayerInventory from "@/components/inventory/ABCPlayerInventory.vue";

export default {

  components: {
    'world': ABCWorld,
    'skills': ABCSkills,
    'statistics': ABCStatistics,
    'settings': ABCSettings,
    'player': ABCPlayer,
    'player-inventory': ABCPlayerInventory,
    'wallet': ABCWallet,
    'achievements': ABCAchievements,
  },

  methods: {}
}
</script>

<style>
</style>
