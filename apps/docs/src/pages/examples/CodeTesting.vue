<template>
<!-- <table class="table position-relative">
    <thead>
        <tr>
            <th>Review</th>
            <th>Criteria</th>
            <th>Risk Level</th>
            <th>Rating</th>
            <th>Evidence Capture Method</th>
            <th>Reason for Rating</th>
            <th>Evidence</th>
        </tr>
    </thead>
    <tbody>
        <template v-for="unit in tree" :key="unit.id">
            <tr>
                <td colspan="7">{{ 'Unit - ' + unit.label }}</td>
            </tr>
            <template v-for="element in unit.elements" :key="element.id">
                <tr>
                    <td colspan="7">{{ 'Element - ' + element.label }}</td>
                </tr>
                <tr v-for="criteria in element.criteria">
                    <td>{{ criteria.latestAssessmentCriteriaCardMarkedForReview }}</td>
                    <td>{{ criteria.competencyCriteriaTitle }}</td>
                    <td>{{ criteria.competencyCriteriaRiskLevelReference }}</td>
                    <td>{{ criteria.latestAssessmentCriteriaCardRatingId }}</td>
                    <td>{{ criteria.latestAssessmentCriteriaCardEvidenceCaptureMethodId }}</td>
                    <td>{{ criteria.latestAssessmentCriteriaCardReasonForRating }}</td>
                    <td>{{ criteria.assessmentCriteriaCardFileCount }}</td>
                </tr>
            </template>
        </template>
    </tbody>
</table> -->

<TreeTable :expanded-keys="expandedKeys" :value="treeData" @node-expand="(() => setExpanderColumns())">
  <Column v-for="column in criteriaColumns" v-bind="column" />
</TreeTable>



<!-- <ForgeTable :value="criteriaData.items" group-rows-by="competencyCriteriaElementReferenceId" row-group-mode="subheader" >
    <Column v-for="column in criteriaColumns" :key="column.field as string" :sortable="column.sortable" v-bind="column">
    <template #filter="{ field }">
      <forge-filter-header
        v-if="filters[field]"
        v-model="filters[field].value"
        :data-type="column.dataType"
        :dropdown-options="column.dataType === 'multiselect' ? multiselectOptions : dropdownOptions"
        :placeholder="column.header"
      />
    </template>
  </Column>
    <template #groupheader="slotProps">
        <div class="flex items-center gap-2">
            <span>{{ slotProps.data.competencyCriteriaUnitReference + '-' + slotProps.data.competencyCriteriaElementReference }}</span>
        </div>
    </template>
</ForgeTable> -->


</template>



<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import TreeTable from "primevue/treetable";
import Column from 'primevue/column';
import { ForgeColumn, ForgeFilterHeader, ForgeTable, ForgeTreeTable } from '@3squared/forge-ui-3';
import { FilterMatchMode } from "@primevue/core/api";
import groupBy from 'lodash-es/groupBy.js';
import { styleText } from 'node:util';

const columns = ref<ForgeColumn[]>([
  { field: "name", header: "Name", dataType: "select", sortable: true, selected: true, expander: true },
  {
    field: "size",
    header: "Size",
    dataType: "numeric",
    sortable: true,
    selected: true
  },
  {
    field: "type",
    header: "Type",
    sortable: true,
    selected: true
  }
]);


const criteriaColumns = [
  { field: "expander", header:'', sortable: false, expander: true },
  { field: "latestAssessmentCriteriaCardMarkedForReview", header:'Review', sortable: false, expander: false, styleText: 'width:50px;' },
  { field: "competencyCriteriaTitle", header: 'Criteria', sortable: false, expander: false  },
  { field: "competencyCriteriaRiskLevelReference", header: 'RiskLevel', sortable: false, expander: false  },
  { field: "latestAssessmentCriteriaCardRatingId", header: 'Rating', sortable: false, expander: false  },
  { field: "latestAssessmentCriteriaCardEvidenceCaptureMethodId", header: 'EvidenceCaptureMethod', dataType: "numeric", sortable: false, expander: false  },
  { field: "latestAssessmentCriteriaCardReasonForRating", header: 'ReasonForRating', sortable: false, expander: false  },
  { field: "assessmentCriteriaCardFileCount", header: 'Evidence', dataType: "numeric", sortable: false, expander: false  }
];

const setExpanderColumns = () => {
    setTimeout(() => {
        const rowExpanderCells = Array.from(
            document.querySelectorAll(".parent-node td.expander-cell")
        );
        const rowExpanderOtherCells = Array.from(
            document.querySelectorAll(".parent-node td")
        );

        rowExpanderOtherCells.forEach((rowExpanderCell) => {
            rowExpanderCell.classList.add("d-none")
        });
        rowExpanderCells.forEach((rowExpanderCell) => {
            rowExpanderCell.setAttribute("colspan", criteriaColumns.length.toString());
            rowExpanderCell.classList.remove("d-none")
            });
        },
        0
    );
}

onMounted(() => {
    setExpanderColumns();
})

const filters = ref();

const criteriaData = ref({
    "items": [
        {
            "competencyCriteriaId": "d58cd117-ad0c-466c-817b-30ac567f4fde",
            "competencyCriteriaReferenceId": "0318f3bc-1e61-4a9f-a6b7-699fc8dbf1ca",
            "competencyCriteriaTitle": "38983AF3-1F05-41EA-8D58-8F7716560785",
            "competencyCriteriaRiskLevelReference": "Medium",
            "competencyCriteriaRiskLevelColour": "#ed754a",
            "competencyCriteriaElementReference": "F2600BAF-D876-4EC2-ABE6-C908E4BC063F",
            "competencyCriteriaRiskLevelIndex": 1,
            "competencyCriteriaUnitReference": "0C3F66D3-671C-4E6B-8677-3D5399700B27",
            "competencyCriteriaUnitReferenceId": "5950e3b1-8231-4a12-b25d-05fdd1b8fc57",
            "competencyCriteriaElementReferenceId": "2defa79b-c826-4c02-8fb9-6c1910e60312",
            "assessmentCriteriaCardRatingCount": 1,
            "assessmentCriteriaCardFileCount": 0,
            "latestAssessmentCriteriaCardId": "87c9c214-3932-4bd3-b5bb-d641960b7433",
            "latestAssessmentCriteriaCardRatingId": "05fa3aa5-0c10-410a-80cc-61511cdc3a51",
            "latestAssessmentCriteriaCardEvidenceCaptureMethodId": null,
            "latestAssessmentCriteriaCardReasonForRating": "",
            "latestAssessmentCriteriaCardMarkedForReview": false
        },
        {
            "competencyCriteriaId": "3d9a7bcb-129e-49ad-a4c0-7bb9b42fb4ee",
            "competencyCriteriaReferenceId": "ada18fdf-330d-490c-b7f4-c67eae452afb",
            "competencyCriteriaTitle": "F73973F2-32A1-41F2-AF2B-596B2F4B42A2",
            "competencyCriteriaRiskLevelReference": "Medium",
            "competencyCriteriaRiskLevelColour": "#ed754a",
            "competencyCriteriaElementReference": "F2600BAF-D876-4EC2-ABE6-C908E4BC063F",
            "competencyCriteriaRiskLevelIndex": 1,
            "competencyCriteriaUnitReference": "0C3F66D3-671C-4E6B-8677-3D5399700B27",
            "competencyCriteriaUnitReferenceId": "5950e3b1-8231-4a12-b25d-05fdd1b8fc57",
            "competencyCriteriaElementReferenceId": "2defa79b-c826-4c02-8fb9-6c1910e60312",
            "assessmentCriteriaCardRatingCount": 1,
            "assessmentCriteriaCardFileCount": 0,
            "latestAssessmentCriteriaCardId": "a42ab053-019d-4bd7-ad2d-d0ecfd6cee53",
            "latestAssessmentCriteriaCardRatingId": "24c9d9c6-e3e3-46be-a73e-3578224d13a2",
            "latestAssessmentCriteriaCardEvidenceCaptureMethodId": null,
            "latestAssessmentCriteriaCardReasonForRating": "",
            "latestAssessmentCriteriaCardMarkedForReview": false
        },
        {
            "competencyCriteriaId": "852e86e9-543c-4903-a5fd-ff997fa1cf20",
            "competencyCriteriaReferenceId": "04bcfc85-5685-49bf-a4ad-c9b32d7c8c68",
            "competencyCriteriaTitle": "0163ABFA-CDEE-4F24-A318-9B7017E2BED0",
            "competencyCriteriaRiskLevelReference": "Medium",
            "competencyCriteriaRiskLevelColour": "#ed754a",
            "competencyCriteriaElementReference": "E74C369A-1C87-461D-8046-5293A8699EDF",
            "competencyCriteriaRiskLevelIndex": 1,
            "competencyCriteriaUnitReference": "0EBBA2C2-3621-42ED-A340-D1506493FDBC",
            "competencyCriteriaUnitReferenceId": "56083603-6195-4d99-8663-34ba035a3a3c",
            "competencyCriteriaElementReferenceId": "2091383e-35ef-4470-bcb9-c37b77f8ae84",
            "assessmentCriteriaCardRatingCount": 1,
            "assessmentCriteriaCardFileCount": 0,
            "latestAssessmentCriteriaCardId": "f24cb855-04cb-42f4-bc57-9731fbe2b944",
            "latestAssessmentCriteriaCardRatingId": "bdb7cdd6-15ee-4a0e-a59d-75ede39a0522",
            "latestAssessmentCriteriaCardEvidenceCaptureMethodId": null,
            "latestAssessmentCriteriaCardReasonForRating": "",
            "latestAssessmentCriteriaCardMarkedForReview": false
        },
        {
            "competencyCriteriaId": "618ba046-8ff9-4512-994b-e9f627b5b72c",
            "competencyCriteriaReferenceId": "a739b3da-83ae-473e-815c-18dc59fd1aac",
            "competencyCriteriaTitle": "5E87CC75-6BB0-45AE-8098-765081158D40",
            "competencyCriteriaRiskLevelReference": "Medium",
            "competencyCriteriaRiskLevelColour": "#ed754a",
            "competencyCriteriaElementReference": "E74C369A-1C87-461D-8046-5293A8699EDF",
            "competencyCriteriaRiskLevelIndex": 1,
            "competencyCriteriaUnitReference": "0EBBA2C2-3621-42ED-A340-D1506493FDBC",
            "competencyCriteriaUnitReferenceId": "56083603-6195-4d99-8663-34ba035a3a3c",
            "competencyCriteriaElementReferenceId": "2091383e-35ef-4470-bcb9-c37b77f8ae84",
            "assessmentCriteriaCardRatingCount": 1,
            "assessmentCriteriaCardFileCount": 0,
            "latestAssessmentCriteriaCardId": "086ff4a3-08ae-4346-817f-d6369c372c92",
            "latestAssessmentCriteriaCardRatingId": "24c9d9c6-e3e3-46be-a73e-3578224d13a2",
            "latestAssessmentCriteriaCardEvidenceCaptureMethodId": null,
            "latestAssessmentCriteriaCardReasonForRating": "",
            "latestAssessmentCriteriaCardMarkedForReview": false
        },
        {
            "competencyCriteriaId": "cb62af30-6abd-4c03-876b-61f506f858a3",
            "competencyCriteriaReferenceId": "fb7a51ce-385f-41d3-8c08-9fd097fae212",
            "competencyCriteriaTitle": "89C100AB-0F0D-4859-B09A-7119FEDA8424",
            "competencyCriteriaRiskLevelReference": "Medium",
            "competencyCriteriaRiskLevelColour": "#ed754a",
            "competencyCriteriaElementReference": "E2DED87B-6ACD-4A0E-A7E4-46CD7D06D390",
            "competencyCriteriaRiskLevelIndex": 1,
            "competencyCriteriaUnitReference": "056F56D3-3951-47FB-A9D4-44E596953F7B",
            "competencyCriteriaUnitReferenceId": "d54a35c8-7eb4-4ce8-af1d-43c954950eea",
            "competencyCriteriaElementReferenceId": "fd10184f-f923-4afd-8b6e-81447b6625ff",
            "assessmentCriteriaCardRatingCount": 1,
            "assessmentCriteriaCardFileCount": 0,
            "latestAssessmentCriteriaCardId": "c81333cb-2cd4-4ad3-9977-b04c335484ef",
            "latestAssessmentCriteriaCardRatingId": "bdb7cdd6-15ee-4a0e-a59d-75ede39a0522",
            "latestAssessmentCriteriaCardEvidenceCaptureMethodId": null,
            "latestAssessmentCriteriaCardReasonForRating": "",
            "latestAssessmentCriteriaCardMarkedForReview": false
        },
        {
            "competencyCriteriaId": "4fa500b4-1d46-4b04-a40f-102d0572e59a",
            "competencyCriteriaReferenceId": "bba6dd07-f481-4691-947f-fbf5c67b5417",
            "competencyCriteriaTitle": "34C2A534-0E97-4C1B-8516-8874E567CF96",
            "competencyCriteriaRiskLevelReference": "Medium",
            "competencyCriteriaRiskLevelColour": "#ed754a",
            "competencyCriteriaElementReference": "3A96F6A0-176B-4C22-9470-AB5439AAC3D2",
            "competencyCriteriaRiskLevelIndex": 1,
            "competencyCriteriaUnitReference": "069CA552-44F9-4B2A-A694-68BCB87BDD7F",
            "competencyCriteriaUnitReferenceId": "b58fa7f2-6334-4e55-9570-95d40c251282",
            "competencyCriteriaElementReferenceId": "0bb5d227-d65d-4999-96c8-ed530c7210bf",
            "assessmentCriteriaCardRatingCount": 1,
            "assessmentCriteriaCardFileCount": 0,
            "latestAssessmentCriteriaCardId": "b6b28212-1f6d-4f04-8117-5d1234f99c12",
            "latestAssessmentCriteriaCardRatingId": "24c9d9c6-e3e3-46be-a73e-3578224d13a2",
            "latestAssessmentCriteriaCardEvidenceCaptureMethodId": null,
            "latestAssessmentCriteriaCardReasonForRating": "",
            "latestAssessmentCriteriaCardMarkedForReview": false
        },
        {
            "competencyCriteriaId": "b8988a43-51e8-4cfe-8da9-f193e6dee626",
            "competencyCriteriaReferenceId": "df36fa86-6d81-45bf-8577-c0ea8e32235b",
            "competencyCriteriaTitle": "801DAD82-3A78-4B86-808E-74DF54FC35B6",
            "competencyCriteriaRiskLevelReference": "Medium",
            "competencyCriteriaRiskLevelColour": "#ed754a",
            "competencyCriteriaElementReference": "AED73F07-CBF4-4947-B3E7-67B336C81878",
            "competencyCriteriaRiskLevelIndex": 1,
            "competencyCriteriaUnitReference": "081E39C0-2A2F-4475-8D06-3D69B818844C",
            "competencyCriteriaUnitReferenceId": "029b048b-6ae7-4e3b-8c3b-a7dd1cf46d86",
            "competencyCriteriaElementReferenceId": "ebffd5de-3694-4960-8c3c-8078fb72b9e5",
            "assessmentCriteriaCardRatingCount": 1,
            "assessmentCriteriaCardFileCount": 0,
            "latestAssessmentCriteriaCardId": "d89ecabd-3435-4afc-b78f-1a852b91b7c0",
            "latestAssessmentCriteriaCardRatingId": "bdb7cdd6-15ee-4a0e-a59d-75ede39a0522",
            "latestAssessmentCriteriaCardEvidenceCaptureMethodId": null,
            "latestAssessmentCriteriaCardReasonForRating": "",
            "latestAssessmentCriteriaCardMarkedForReview": false
        },
        {
            "competencyCriteriaId": "afdd933e-0f2d-4178-949d-0a60cc72bfe7",
            "competencyCriteriaReferenceId": "38337dc2-9b18-4ded-84bf-6261f96b9571",
            "competencyCriteriaTitle": "2DF7D133-3BD5-4456-A766-ABCDE9667F00",
            "competencyCriteriaRiskLevelReference": "Medium",
            "competencyCriteriaRiskLevelColour": "#ed754a",
            "competencyCriteriaElementReference": "78CEC4E1-DEB7-4812-95F9-45288A6066A5",
            "competencyCriteriaRiskLevelIndex": 1,
            "competencyCriteriaUnitReference": "0252E077-ED82-4EEA-9461-6FE21DBE9111",
            "competencyCriteriaUnitReferenceId": "00a0035b-8cef-41ce-bdc8-0a83b883ba2a",
            "competencyCriteriaElementReferenceId": "f8dbd2fa-67ad-4807-a84a-235ca9ef9043",
            "assessmentCriteriaCardRatingCount": 1,
            "assessmentCriteriaCardFileCount": 0,
            "latestAssessmentCriteriaCardId": "58ea1454-f2bb-408c-a764-ca270e108226",
            "latestAssessmentCriteriaCardRatingId": "24c9d9c6-e3e3-46be-a73e-3578224d13a2",
            "latestAssessmentCriteriaCardEvidenceCaptureMethodId": null,
            "latestAssessmentCriteriaCardReasonForRating": "",
            "latestAssessmentCriteriaCardMarkedForReview": false
        },
        {
            "competencyCriteriaId": "7880fed3-7f08-4cfa-9802-6d6bdbb118ac",
            "competencyCriteriaReferenceId": "bfb65ed9-29e2-4992-85ca-9334d4cffc3e",
            "competencyCriteriaTitle": "9FFC7A14-B395-4F5E-B4AE-BF830FB9563D",
            "competencyCriteriaRiskLevelReference": "Medium",
            "competencyCriteriaRiskLevelColour": "#ed754a",
            "competencyCriteriaElementReference": "78CEC4E1-DEB7-4812-95F9-45288A6066A5",
            "competencyCriteriaRiskLevelIndex": 1,
            "competencyCriteriaUnitReference": "0252E077-ED82-4EEA-9461-6FE21DBE9111",
            "competencyCriteriaUnitReferenceId": "00a0035b-8cef-41ce-bdc8-0a83b883ba2a",
            "competencyCriteriaElementReferenceId": "f8dbd2fa-67ad-4807-a84a-235ca9ef9043",
            "assessmentCriteriaCardRatingCount": 1,
            "assessmentCriteriaCardFileCount": 0,
            "latestAssessmentCriteriaCardId": "6217287e-0666-49b4-a6e6-1622b64987b9",
            "latestAssessmentCriteriaCardRatingId": "5a322e73-025c-4b87-8ec7-52de69b06c7d",
            "latestAssessmentCriteriaCardEvidenceCaptureMethodId": null,
            "latestAssessmentCriteriaCardReasonForRating": "",
            "latestAssessmentCriteriaCardMarkedForReview": false
        }
    ],
    "virtualItemCount": 9
});

const unitElements = [];
const elementCriteria = [];
const tree = ref([]);

    const expandedKeys = ref([]);

    const groupedUnits = groupBy(criteriaData.value.items,'competencyCriteriaUnitReferenceId');
    for (const [key, value] of Object.entries(groupedUnits)) {
      unitElements.push({id: key, label: value[0].competencyCriteriaUnitReference, elementIds: [...new Set(value.map(e => e.competencyCriteriaElementReferenceId))]});
    }

    const groupedElements = groupBy(criteriaData.value.items,'competencyCriteriaElementReferenceId');
    for (const [key, value] of Object.entries(groupedElements)) {
      elementCriteria.push({id: key, label: value[0].competencyCriteriaElementReferenceId, criteria: value});
    }

    tree.value = unitElements.map((x) => {
       const obj = {
        key: x.id,
        label: x.label,
        elements: elementCriteria.filter(e => x.elementIds.includes(e.id))
      };
      return obj;
    });

const treeData = computed(() => {
    const filteredItems = [...criteriaData.value.items];
    const unitTreeElements = [];
    const elementTreeCriteria = [];
    let treeTableData = [];
    const keysToExpand = [];

    const groupedTreeUnits = groupBy(filteredItems,'competencyCriteriaUnitReferenceId');
    for (const [key, value] of Object.entries(groupedTreeUnits)) {
        keysToExpand[key] = true;
        unitTreeElements.push({key, label: value[0].competencyCriteriaUnitReference, elementIds: [...new Set(value.map(e => e.competencyCriteriaElementReferenceId))]});
    }

    const groupedTreeElements = groupBy(filteredItems,'competencyCriteriaElementReferenceId');
    for (const [key, value] of Object.entries(groupedTreeElements)) {
        keysToExpand[key] = true;
        elementTreeCriteria.push({key, data: {expander: value[0].competencyCriteriaElementReference}, type:'element', id: key, leaf: true, label: value[0].competencyCriteriaElementReference, children: value.map((c) => {return {data: {...c}};})});
    }

    treeTableData = unitTreeElements.map((x) => {
       const obj = {
        key: x.key,
        data: {
            expander: x.label
        },
        label: x.label,
        leaf: true,
        children: elementTreeCriteria.filter(e => x.elementIds.includes(e.id))
      };
      return obj;
    });

    expandedKeys.value = keysToExpand;

    return treeTableData;
});

const selectedKey = ref();
const metaKey = ref(true);
const nodes = ref([
                {
                    key: '0',
                    data: {
                        name: 'Applications',
                        size: '',
                        type: ''
                    },
                    children: [
                        {
                            key: '0-0',
                            data: {
                                name: 'Vue',
                                size: '',
                                type: ''
                            },
                            children: [
                                {
                                    key: '0-0-0',
                                    data: {
                                        name: 'vue.app',
                                        size: '10kb',
                                        type: 'Application'
                                    }
                                },
                                {
                                    key: '0-0-1',
                                    data: {
                                        name: 'native.app',
                                        size: '10kb',
                                        type: 'Application'
                                    }
                                },
                                {
                                    key: '0-0-2',
                                    data: {
                                        name: 'mobile.app',
                                        size: '5kb',
                                        type: 'Application'
                                    }
                                }
                            ]
                        },
                        {
                            key: '0-1',
                            data: {
                                name: 'editor.app',
                                size: '25kb',
                                type: 'Application'
                            }
                        },
                        {
                            key: '0-2',
                            data: {
                                name: 'settings.app',
                                size: '50kb',
                                type: 'Application'
                            }
                        }
                    ]
                },
                {
                    key: '1',
                    data: {
                        name: 'Cloud',
                        size: '',
                        type: ''
                    },
                    children: [
                        {
                            key: '1-0',
                            data: {
                                name: 'backup-1.zip',
                                size: '10kb',
                                type: 'Zip'
                            }
                        },
                        {
                            key: '1-1',
                            data: {
                                name: 'backup-2.zip',
                                size: '10kb',
                                type: 'Zip'
                            }
                        }
                    ]
                },
                {
                    key: '2',
                    data: {
                        name: 'Desktop',
                        size: '',
                        type: ''
                    },
                    children: [
                        {
                            key: '2-0',
                            data: {
                                name: 'note-meeting.txt',
                                size: '50kb',
                                type: 'Text'
                            }
                        },
                        {
                            key: '2-1',
                            data: {
                                name: 'note-todo.txt',
                                size: '100kb',
                                type: 'Text'
                            }
                        }
                    ]
                },
                {
                    key: '3',
                    data: {
                        name: 'Documents',
                        size: '',
                        type: ''
                    },
                    children: [
                        {
                            key: '3-0',
                            data: {
                                name: 'Work',
                                size: '',
                                type: ''
                            },
                            children: [
                                {
                                    key: '3-0-0',
                                    data: {
                                        name: 'Expenses.doc',
                                        size: '30kb',
                                        type: 'Document'
                                    }
                                },
                                {
                                    key: '3-0-1',
                                    data: {
                                        name: 'Resume.doc',
                                        size: '25kb',
                                        type: 'Resume'
                                    }
                                }
                            ]
                        },
                        {
                            key: '3-1',
                            data: {
                                name: 'Home',
                                size: '',
                                type: ''
                            },
                            children: [
                                {
                                    key: '3-1-0',
                                    data: {
                                        name: 'Invoices',
                                        size: '20kb',
                                        type: 'Text'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    key: '4',
                    data: {
                        name: 'Downloads',
                        size: '',
                        type: ''
                    },
                    children: [
                        {
                            key: '4-0',
                            data: {
                                name: 'Spanish',
                                size: '10kb',
                                type: 'Folder'
                            },
                            children: [
                                {
                                    key: '4-0-0',
                                    data: {
                                        name: 'tutorial-a1.txt',
                                        size: '5kb',
                                        type: 'Text'
                                    }
                                },
                                {
                                    key: '4-0-1',
                                    data: {
                                        name: 'tutorial-a2.txt',
                                        size: '5kb',
                                        type: 'Text'
                                    }
                                }
                            ]
                        },
                        {
                            key: '4-1',
                            data: {
                                name: 'Travel',
                                size: '15kb',
                                type: 'Text'
                            },
                            children: [
                                {
                                    key: '4-1-0',
                                    data: {
                                        name: 'Hotel.pdf',
                                        size: '10kb',
                                        type: 'PDF'
                                    }
                                },
                                {
                                    key: '4-1-1',
                                    data: {
                                        name: 'Flight.pdf',
                                        size: '5kb',
                                        type: 'PDF'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    key: '5',
                    data: {
                        name: 'Main',
                        size: '',
                        type: ''
                    },
                    children: [
                        {
                            key: '5-0',
                            data: {
                                name: 'bin',
                                size: '50kb',
                                type: 'Link'
                            }
                        },
                        {
                            key: '5-1',
                            data: {
                                name: 'etc',
                                size: '100kb',
                                type: 'Link'
                            }
                        },
                        {
                            key: '5-2',
                            data: {
                                name: 'var',
                                size: '100kb',
                                type: 'Link'
                            }
                        }
                    ]
                },
                {
                    key: '6',
                    data: {
                        name: 'Other',
                        size: '',
                        type: ''
                    },
                    children: [
                        {
                            key: '6-0',
                            data: {
                                name: 'todo.txt',
                                size: '3kb',
                                type: 'Text'
                            }
                        },
                        {
                            key: '6-1',
                            data: {
                                name: 'logo.png',
                                size: '2kb',
                                type: 'Picture'
                            }
                        }
                    ]
                },
                {
                    key: '7',
                    data: {
                        name: 'Pictures',
                        size: '',
                        type: ''
                    },
                    children: [
                        {
                            key: '7-0',
                            data: {
                                name: 'barcelona.jpg',
                                size: '90kb',
                                type: 'Picture'
                            }
                        },
                        {
                            key: '7-1',
                            data: {
                                name: 'primevue.png',
                                size: '30kb',
                                type: 'Picture'
                            }
                        },
                        {
                            key: '7-2',
                            data: {
                                name: 'prime.jpg',
                                size: '30kb',
                                type: 'Picture'
                            }
                        }
                    ]
                },
                {
                    key: '8',
                    data: {
                        name: 'Videos',
                        size: '',
                        type: ''
                    },
                    children: [
                        {
                            key: '8-0',
                            data: {
                                name: 'primefaces.mkv',
                                size: '1000kb',
                                type: 'Video'
                            }
                        },
                        {
                            key: '8-1',
                            data: {
                                name: 'intro.avi',
                                size: '500kb',
                                type: 'Video'
                            }
                        }
                    ]
                }
            ]);


</script>
