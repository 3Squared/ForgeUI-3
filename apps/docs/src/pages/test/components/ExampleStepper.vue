<template>
  <Stepper value="1">
    <StepList>
      <Step value="1">Design</Step>
      <Step value="2">Development</Step>
      <Step value="3">QA</Step>
    </StepList>
    <StepPanels>
      <StepPanel value="1"> Panel 1 </StepPanel>
      <StepPanel value="2"> Panel 2 </StepPanel>
      <StepPanel value="3"> Panel 3 </StepPanel>
    </StepPanels>
  </Stepper>

</template>

<script setup lang="ts">
import StepList from "primevue/steplist";
import Step from "primevue/step";
import StepPanels from "primevue/steppanels";
import StepPanel from "primevue/steppanel";
import Stepper from "primevue/stepper";
</script>