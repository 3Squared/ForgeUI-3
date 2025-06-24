<template>
 <VueMarkdown markdown="### Changesets

[Changesets](https://github.com/changesets/changesets) are used to [semantically version](https://semver.org/) the packages in the Forge.UI 3 Monorepo. Steps for this can be found in the [Creating a Changeset](#creating-a-changeset) guide in the Walkthroughs section.

Changesets are made up of two parts, the version number and the description. The version number is used when the user installs the project via an `npm install` and allows them to install different versions of the package if required. The description is used to provide information about what the version changes, fixes or breaks. It is used in Forge.UI 3 to generate a changelog, which can be found by clicking the version number in the navbar on the Documentation Site.

![Forge.UI 3 Changelog](/images/Forge_Changelog.png)

Changesets are versioned using semantic versioning, this means that we can release a Major, Minor or Patch version of the packages. The link above details this further, however here is a cheatsheet that you can use to decipher which is the right version number bump to use:

- Major (**1**.0.0)
    - This is the first number in a version number.
    - It represents that a breaking change has been made.
        - This means that a change has been made which will break a developers current implementation and that they will need to migrate.
    - When creating a Major version, **Always** write a migration guide detailing the change and how they are able to migrate.

- Minor (0.**1**.0)
    - This is the second number in a version number.
    - It represents when a new feature has been added.
    - When adding a new Minor version, ensure that the feature has been documented on the Documentation Site.

- Patch (0.0.**1**)
    - This third number in a version number.
    - It represents that a bug has been fixed.

The current changeset which you have created can be found in the `.changeset` folder which is at the root of the project. In here you can update the versioning and the description of the change.
"></VueMarkdown><VueMarkdown markdown="### Creating a changeset

In order to add a [changeset](#changesets), we need to run the `npx changeset` command at the same level as the `.changeset` folder. In the case of Forge.UI 3, this is at the root of the project. 

Running this command will bring up a wizard to help you create a changeset. First it will ask you which projects require a version bump, detailing which projects have changed since the last version. You can select as many options as you require using the arrow keys to navigate, the space bar to select and the enter key to continue to the next step.

![Changset Wizard Step 1](/images/Changeset_Wizard_1.png)

Once you have selected the projects which require a version bump, you will be asked if any of the packages require a `major` bump. If they do, select using space bar else press enter to continue.

![Changeset Wizard Major Bump](/images/Changeset_Wizard_Major.png)

Next it will ask which projects require a `minor` version bump. If any do, select using space bar else press enter to continue.

![Changeset Wizard Minor Bump](/images/Changeset_Wizard_Minor.png)

Finally it will ask which projects require a `patch` version bump. If any do, select using space bar else press enter to continue. If you haven't selected a `major` or `minor` bump, it will assume that the change is a `patch`.

Once you have selected either a `major`, `minor` or `patch` version number. You will be required to add a summary which will appear in the changelog. You can change this later.

![Changeset Wizard Patch Bump](/images/Changeset_Wizard_Summary.png)

After typing your summary and pressing enter, you will be shown a summary of the changeset that you are about to make. If you are happy with the changeset, press enter to continue.

![Changeset Wizard Overview](/images/Changeset_Wizard_Overview.png)

Now that you've created your changeset, you can navigate to the `.changeset` folder and you'll find a new file which has a unique name. 

![The .changeset folder](/images/Changeset_Folder.png)

Clicking into this file, you will find the changeset that you have created. It will detail the different version patches that the packages are due to recieve and the summary that you entered in the wizard. You can/format this in this file, typically I find it easier to write my summary in here.

![The Changeset File](/images/Changeset.png)

Once you are happy with the changeset, you can then commit it to your branch and the versioning will be handled! For more information on this, see the [deployments](#deployments) section.
"></VueMarkdown>
</template>

<script setup lang="ts">
import { VueMarkdown } from "@crazydos/vue-markdown";

</script>