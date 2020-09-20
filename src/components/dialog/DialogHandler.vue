<template>
  <div>
    <h3>Dialog goes here</h3>

    <div v-if="hasHandler">

      <div v-if="isDialog">
        <p>Dialog</p>
        <p>{{ dialogText.speaker }}: {{ dialogText.text }}</p>
        <button @click="next">Next</button>
      </div>
      <div v-else-if="isDecision">
        <p>Decision</p>
        <ol>
          <li v-for="(option, index) of decisionOptions" :key="option.label">
            <button @click="selectOption(index)" :disabled="!option.canAccess()">
              <span v-if="!option.canAccess()"> <s> {{ option.label }}</s></span>
              <span v-else> {{ option.label }}</span>
            </button>
          </li>
        </ol>
      </div>
    </div>
    <div v-else>
      Start talking
    </div>
    <br>
    <button @click="talk">Talk to the Wise Old Woman</button>

  </div>
</template>

<script>
import {NpcList} from "@/game/npcs/NpcList";
import {NpcId} from "@/game/npcs/NpcId";
import {DialogHandler, DialogType} from "@/game/features/dialog/DialogHandler";

export default {
  name: "DialogHandler",
  data() {
    return {
      handler: new DialogHandler(),
    }
  },
  methods: {
    talk() {
      const wiseOldWoman = NpcList.getNpc(NpcId.WiseOldWoman)
      this.handler.start(wiseOldWoman.dialog);
    },
    next() {
      this.handler.next();
    },
    selectOption(index) {
      this.handler.selectOption(index);
    }

  },

  computed: {
    hasHandler() {
      return this.handler != null;
    },
    dialogText() {
      if (!this.isDialog) {
        return "";
      }
      return this.handler.dialog.getDialogText();
    },
    decisionOptions() {
      if (!this.isDecision) {
        return [];
      }
      return this.handler.decision.options;
    },
    isDecision() {
      return this.handler.type === DialogType.Decision;
    },
    isDialog() {
      return this.handler.type === DialogType.Dialog;
    }
  }
}
</script>

<style scoped>

</style>
