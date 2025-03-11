<template>
  <div>
    <forge-page-header title="TreeTable" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/treetable"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <p><strong>Controlling what you can select: </strong>You can control if each node is selectable by using the <strong>selectable</strong> prop on the option object.</p>
    <Playground :options="options" :config="config" :code="code">
      <template #component>
        <component :is="ForgeTreeTable" v-bind="options" :value="nodes" class="w-100">
            <Column v-for="column in nodeColumns" :key="column.field as string" v-bind="column" />
        </component>
      </template>
    </Playground>

    <p>
      See 
      <a class="link" target="_blank" href="https://primevue.org/treetable/#api.treenode"><strong>TreeNode</strong></a>
      for full object model
    </p>
  </div>
</template>

<script setup lang="ts">
import { ForgeColumn, ForgePageHeader, ForgeTreeTable } from "@3squared/forge-ui-3";
import { computed, ref } from "vue";
import { usePlayground, Playground } from "@3squared/forge-playground-3";
import { nodes } from "../examples/data/exampleTreeTableData";
import Column from "primevue/column";

import { severities } from "../../composables/playgroundOptions";

const nodeColumns = ref<ForgeColumn[]>([
  { field: "name", header:'Name', sortable: false, expander: true, dataType: 'text' },
  { field: "size", header:'Size', sortable: true, dataType: 'numeric' },
  { field: "type", header: 'Type', sortable: false, frozen: true, dataType: 'text' },
]);

const expandKeys = ref({'1': true});

const { options, propVals, config } = usePlayground(
  {
    severity: "undefined",
    legacyPaginationFooter: false,
    expandedKeys: expandKeys,
    totalRecords: nodes.length,
    stickyHeader: true,
    showGridlines: false,
    stripedRows: false,
    rowHover: false,
    emptyMessage: "",
    loading: false,
    paginator: false,
    parentExpanderFullRow: false,
    totalColumns: nodeColumns.value.length
  },
  {
    severity: { type: "select", options: ["undefined", ...severities] },
    totalColumns: {
      disabled: (): boolean => !(options.value.parentExpanderFullRow)
    },
  }
);

const code = computed<string>(() => 
`<template>
    <ForgeTreeTable ${propVals.value.join(" ")}>
        <Column v-for="column in nodeColumns" v-bind="column" />
    <ForegTreeTable />
</template>

<script setup lang="ts">
import { ForgeColumn, ForegTreeTable } from "@3squared/forge-ui-3";
import Column from "primevue/column";
import { ref } from 'vue'

const expandKeys = ref({'1': true});

const nodeColumns = ref<ForgeColumn[]>([
  { field: "name", header:'Name', sortable: false, expander: true, dataType: 'text' },
  { field: "size", header:'Size', sortable: true, dataType: 'numeric' },
  { field: "type", header: 'Type', sortable: false, frozen: true, dataType: 'text' },
]);

const nodes = [
                {
                    key: '0',
                    data: {
                        name: 'Applications',
                        size: '100kb',
                        type: 'Folder'
                    },
                    children: [
                        {
                            key: '0-0',
                            data: {
                                name: 'Vue',
                                size: '25kb',
                                type: 'Folder'
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
                        size: '20kb',
                        type: 'Folder'
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
                        size: '150kb',
                        type: 'Folder'
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
                        size: '75kb',
                        type: 'Folder'
                    },
                    children: [
                        {
                            key: '3-0',
                            data: {
                                name: 'Work',
                                size: '55kb',
                                type: 'Folder'
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
                                size: '20kb',
                                type: 'Folder'
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
                        size: '25kb',
                        type: 'Folder'
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
                        size: '50kb',
                        type: 'Folder'
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
                        size: '5kb',
                        type: 'Folder'
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
                        size: '150kb',
                        type: 'Folder'
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
                        size: '1500kb',
                        type: 'Folder'
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
            ];

`);
</script>
