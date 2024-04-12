import { getGraphqlClient } from "@/clients/graphqlClient";
import Image from "next/image";

const testQuery = `#graphql
  query test {
    test {
      foo
    }
  } 
`;

export default async function Home() {
  console.log('[debug] requesting testQuery');
  const { data, error } = await getGraphqlClient().query(testQuery, {});
  console.log('[debug] requested testQuery', data, error);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
