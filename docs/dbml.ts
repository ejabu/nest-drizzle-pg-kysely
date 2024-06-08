import { pgGenerate } from 'drizzle-dbml-generator'; // Using Postgres for this example
import { schema } from '../src/drizzle/models/schema';

pgGenerate({
  schema: schema,
  relational: false,
  out: './docs/erd/diagram.dbml'
});