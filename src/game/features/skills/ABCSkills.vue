<template>

  <div style="">
    Skills go here
    <p v-for="skill in skillList" :key="skill.type">
      {{ skill.type }}: {{ skill.getLevel() }}, {{ skill.getLevelProgress() }}
    </p>
  </div>
</template>

<script>
import {App} from "@/App.ts";
export default {
  name: "ABCSkills",
  data: function () {
    return {
      skills: App.game.skills,
    }
  },
  computed: {
    skillList() {
      return this.skills.skills;
    }
  }
}
</script>

<style scoped>
</style>
