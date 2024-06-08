import { Kyselify } from 'drizzle-orm/kysely';
import {
  CamelCasePlugin,
  DummyDriver,
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from 'kysely';

import { issue } from './models/issue.model';

interface Database {
  issue: Kyselify<typeof issue>;
}

class CustomPlugin extends CamelCasePlugin {
  protected override snakeCase(str: string): string {
    const newStr = str.replace(/([A-Z])/g, function (match) {
      return '_' + match.toLowerCase();
    });
    return newStr;
  }
}

export const kyselyDB = new Kysely<Database>({
  dialect: {
    createAdapter: () => new PostgresAdapter(),
    createDriver: () => new DummyDriver(),
    createIntrospector: (db) => new PostgresIntrospector(db),
    createQueryCompiler: () => new PostgresQueryCompiler(),
  },
  plugins: [new CustomPlugin()],
});
