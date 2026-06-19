The pipeline was developed from the beginning of production up to Layout. The rest of the production was externalized, while internal development focused on tracking and supervision tools.

During the first phase of production, a task manager was developed and integrated with ShotGrid. This tool provided shortcuts for artists to launch DCC applications, create tasks using the correct naming conventions, and perform automated actions. It also included a background task queue manager to handle long-running processes such as renders, playblasts, and other time-consuming operations.

A local-to-server synchronization system was also implemented, among other functionalities.

In the second phase, production tracking tools were developed, including webhooks / SGEventHandler systems to automate status changes and other ShotGrid-related processes.

In the third phase of production, all project-specific developments for Grisu were consolidated, and efforts began to abstract the tools for reuse in future productions. This phase marked the beginning of the [**GwaIO**](https://emanuelaguado.github.io/gwaio-docs/) software, which was later used across multiple internal and external productions.
