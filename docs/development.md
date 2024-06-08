# Development

## Testing

Testing is a critical part of the integration process to ensure that your integration works as expected and to identify any potential issues. Follow these steps to test your service effectively:

1. Execute the unit tests that come with the integration. You can run these tests using the following command:

```sh
pnpm test
```
Make sure all the tests pass. If any tests fail, review the output to understand and fix the issues.

2. You can also get the coverage result with the:

```sh
pnpm test:ci
```

## Migration

### Creating Migration

To add the migration you could execute this command:

```sh
pnpm db:migrate
```

### Seeding Data

Data is a crucial component for the operation of any application. You have the option to generate this data either by directly accessing the database or by executing an API. However, this process often poses challenges for newcomers. As a remedy, seeding offers an effective way to populate your database with initial data sets. To initiate the seeding process, execute the following command:

```sh
pnpm db:seed:all
```

In situations where you need to reset the data, execute these two commands in sequence:

```sh
pnpm db:seed:undo:all && pnpm db:seed:all
```

This approach ensures that new team members can efficiently manage data within the application, streamlining the initial setup and data reset processes.