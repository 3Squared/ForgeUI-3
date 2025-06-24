<template>
<VueMarkdown markdown="
## Testing

Forge.UI 3 and RailSmart Design System 3 rely heavily on Automation Testing. This is achieved using [Cypress](https://docs.cypress.io/app/get-started/why-cypress) and [Vitest](https://vitest.dev/). Cypress is used for component testing, this is where the browser interacts with the component in various states to ensure that the styling/functionality works as expected. Vitest is used for unit testing, currently testing any functions that are in the utlities file.

### Component Tests

The component tests are all kept in the `packages > ui > tests > component` folder. Each component which has been styled/created has a folder which will contain a file which contains all of the tests, these end in `.cy.ts`. It is important that they end in this as this is what Cypress will look for when running the tests. The folder may also contain a wrapper vue file, this is typically used when testing validation and is simply mounted instead of the component in the tests.

Each test file will contain a mount function, if there is a wrapper component it will contain two. This mount function simply mounts the component and passes any props/attributes that the component requires. They utilise the `cy.mount` method to do this, passing the component/wrapper as the first parameter then an options object which includes the props and other attributes.

![Mount Functions](/images/Mount_Functions.png)

Where it makes sense, tests are grouped together using the [`describe`](https://docs.cypress.io/app/core-concepts/writing-and-organizing-tests) function. This is used to organise the tests in the runner and to also make it easier to remove/run groups of tests using `.only` and `.skip`.

A test is declared using the `it` function, it accepts two parameters which are the test name and a function which inlcudes the test. Every test has been written in the `Arrange. Act. Assert` format; creating variables for all data in the Arrange section, performing the actions required to change the state in the Act section and checking that the state has changed as expected in the Assert section.

![Cypress Component Test](/images/Cypress_Test.png)

The component tests utilise dynamic tests where suitable. This form of testing is where one `generic` test is written and different data sets are passed into it. This is particularly useful when testing a prop which accepts different inputs, i.e. Severity, Size etc. By using these dynamic tests, we don't have to repeat multiple tests which take in different inputs and can ensure that all of the tests which test that prop are consistent.

  In order to do this, we first create an array using the `;[]` syntax; The `;` is particulary important here else it won't work! Next we can populate the array with objects which inlcude properties about our test i.e. testName, severity, expectedCss etc. Finally we can loop over the array using `.forEach()` and write a generic test in the body which plugs in the test data. To explain this further, please refer to the example below which can be found in the `table.cy.ts` file.

  ![Dynamic Test](/images/Dynamic_Test.png)

  It is also worth noting that in some files, all of the ID's and Selectors that a component uses are stored globally at the top. I found that this was a good approach as it meant that I didn't have to constantly redefine ID's and Selectors in each test body and would also only have to change it in one place if they had changed.

  ![Global IDs](/images/Global_Ids.png)

  Tests will sometimes fail as pipeline will find new dependency. To fix this add whatever its tried to optimise into the `optimizeDeps` section in `vite.config.ts`.

  You can run the Cypress tests using the `npm run test:component` command in the `ui` folder.

  ### Unit Tests

  [Vitest](https://vitest.dev/guide/#writing-tests) unit tests share similarities with the Cypress component tests. You'll typically find tests organised by `describe` and tests are declared using `test` instead of `it`. Currently there is only one function in the utilities folder so there are very little unit tests, below is a screenshot of all of the Unit tests which can be found in the `packages > ui > tests > unit` folder.

  You can run the Cypress tests using the `npm run test:unit` command in the `ui` folder.

  ![Unit Tests](/images/Unit_Tests.png)
  " ></VueMarkdown>
</template>

<script setup lang="ts">
import { VueMarkdown } from '@crazydos/vue-markdown'

</script>