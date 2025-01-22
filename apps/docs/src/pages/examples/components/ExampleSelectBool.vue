<template>
  <div>
    <ForgeFormField
      v-model="employeeDecision"
      type="select"
      :options="employeeDecisionOptions"
      name="employeeDecision"
      field-label="Employee Decision"
      option-label="optionLabel"
      placeholder="Please Select"
      class="mb-1"
      option-value="value"
    />

    <span>Result: {{ employeeDecision != null ? employeeDecision : "Select option..." }}</span>

    <CodeBlock :code="codeExample" />
  </div>
</template>

<script setup lang="ts">
import { ForgeFormField } from "@3squared/forge-ui-3";
import { computed, ref } from "vue";
import { CodeBlock } from "@3squared/forge-playground-3";

const employeeDecision = ref();

const employeeDecisionOptions = ref([
  { value: true, optionLabel: "Agree" },
  { value: false, optionLabel: "Disagree" }
]);

const codeExample = computed(
  () => `
<template>
  <div>
    <ForgeFormField
        type="select" v-model="employeeDecision"
        :options="employeeDecisionOptions"
        name="employeeDecision"
        field-label="Employee Decision"
        optionLabel="optionLabel" placeholder="Please Select" class="mb-1" optionValue="value"/>
    
    <span>Result: {{employeeDecision}}</span>
  </div>
</template>
<script setup lang="ts">
import { ForgeFormField} from "@3squared/forge-ui-3";
import { computed, ref } from "vue";
import { CodeBlock } from "@3squared/forge-playground-3";

const employeeDecision = ref();

const employeeDecisionOptions = ref([
  { value: true, optionLabel: "Agree" },
  { value: false, optionLabel: "Disagree" }
]);
<\/script>`
);
</script>
