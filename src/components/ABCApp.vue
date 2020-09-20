<template>
  <div class="container">
    <dialog-handler></dialog-handler>
    <wallet></wallet>
    <skills></skills>
    <settings></settings>
    <statistics></statistics>
    <achievements></achievements>
    <world></world>
    <player></player>
    <player-inventory></player-inventory>
    <player-equipment></player-equipment>
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
import ABCPlayerEquipment from "@/components/equipment/ABCPlayerEquipment.vue";
import DialogHandler from "@/components/dialog/DialogHandler";

export default {

  components: {
    'dialog-handler': DialogHandler,
    'world': ABCWorld,
    'skills': ABCSkills,
    'statistics': ABCStatistics,
    'settings': ABCSettings,
    'player': ABCPlayer,
    'player-inventory': ABCPlayerInventory,
    'player-equipment': ABCPlayerEquipment,
    'wallet': ABCWallet,
    'achievements': ABCAchievements,
  },

  methods: {}
}
</script>

<style>
</style>
