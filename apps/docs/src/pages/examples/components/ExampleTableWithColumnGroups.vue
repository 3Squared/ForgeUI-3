<template>
  <div>
    <div v-if="skills">
      <ForgeTable :value="skills" v-model:filters="tableFilters" severity="brand" striped-rows show-gridlines :emptyMessage="('NoRecordsToDisplay')">
        <ColumnGroup type="header">
          <Row>
            <Column :header="('SkillCode')" sortable field="skillCode" :rowspan="2" header-class="align-bottom"/>
            <Column :header="('SkillName')" sortable field="skillName" :rowspan="2" header-class="align-bottom"/>
            <Column :header="('SigningType')" sortable field="signingType" :rowspan="2" header-class="align-bottom"/>
            <Column :header="('ValidFromDate')" sortable field="userSkillValidFrom" :rowspan="2" header-class="align-bottom"/>
            <Column :header="('ExpiryDate')" sortable field="userSkillExpiryDate" :rowspan="2" header-class="align-bottom"/>
            <Column :header="('LinkedCriteria')" :colspan="4" />
          </Row>
          <Row>
            <Column :header="('Unit')" sortable field="competencyUnitName" />
            <Column :header="('Element')" sortable field="competencyElementName" />
            <Column :header="('Criteria')" sortable field="competencyCriteriaTitle" />
            <Column :header="('ProficiencyRating')" sortable field="assessmentCriteriaRatingReference" />
          </Row>
        </ColumnGroup>
        <Column v-for="column in columns" v-bind="column">
          <template #filter="{ field }">
            <ForgeFilterHeader v-if="tableFilters[field]" v-model="tableFilters[field].value" :placeholder="column.header" :data-type="column.dataType"  :show-clear-button="true"/>
          </template>
          <template #body="{ data }">            
            <span >
            {{ data[column.field] }}
          </span>
          </template>
        </Column>

      </ForgeTable>
    </div>
    <div v-else class="mt-3">{{ ('NoSkillsWereUpdatedDuringThisAssessment') }}</div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ForgeFilterHeader, ForgeTable } from "@3squared/forge-ui-3";
import Column from "primevue/column";
import Row from "primevue/row";
import ColumnGroup from "primevue/columngroup"
import { FilterMatchMode } from "@primevue/core/api";

const skills = ref([
  {
    "skillId": "2cab005f-0006-4542-9ccc-17fbbde9511c",
    "skillName": "Baking",
    "skillCode": "FREEDEL",
    "criteriaReferenceId": "33d11757-0c01-460b-b285-8598d141d68a",
    "userSkillId": "b370f6f6-5ae4-4b6f-9ab9-309b929c8362",
    "userSkillValidFrom": "2025-04-07T13:25:20.073",
    "userSkillExpiryDate": null,
    "userSkillDeleted": true,
    "userSkillRevoked": false,
    "competencyCriteriaTitle": "Graeci virtute",
    "competencyElementName": "At quo purto suscipit, illum euripidis sit ex.",
    "competencyUnitName": "Lorem ipsum dolor sit amet",
    "assessmentCriteriaRatingReference": "Expert",
    "assessmentCriteriaRatingId": "05fa3aa5-0c10-410a-80cc-61511cdc3a51",
    "assessmentCriteriaRatingRailSmartVariant": "success"
  }
]);

const tableFilters = ref({
  skillName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  skillCode: { value: null, matchMode: FilterMatchMode.CONTAINS },
  signingType: { value: null, matchMode: FilterMatchMode.CONTAINS },
  userSkillExpiryDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
  userSkillValidFrom: { value: null, matchMode: FilterMatchMode.DATE_IS },
  competencyCriteriaTitle: { value: null, matchMode: FilterMatchMode.CONTAINS },
  competencyElementName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  competencyUnitName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  assessmentCriteriaRatingReference: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const columns = [
  { field: "skillCode", header: 'SkillCode', sortable: true, dataType: 'text' },
  { field: "skillName", header: 'SkillName', sortable: true, dataType: 'text' },
  { field: "signingType", header: 'SigningType', sortable: true, dataType: 'text' },
  { field: "userSkillValidFrom", header: 'ValidFromDate', sortable: true, dataType: 'date' },
  { field: "userSkillExpiryDate", header: 'ExpiryDate', sortable: true, dataType: 'date' },
  { field: "competencyUnitName", header: 'Unit', sortable: true, dataType: 'text' },
  { field: "competencyElementName", header: 'Element', sortable: true, dataType: 'text' },
  { field: "competencyCriteriaTitle", header: 'Criteria', sortable: true, dataType: 'text' },
  { field: "assessmentCriteriaRatingReference", header: 'ProficiencyRating', sortable: true, dataType: 'text' },
];
</script>