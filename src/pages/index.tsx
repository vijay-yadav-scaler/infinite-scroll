import { SWRConfig } from 'swr';
import PostsList from '@/components/PostsList';

export default function Posts({ fallback }: any) {
  return (
    <SWRConfig value={{fallback}}>
      <PostsList />
    </SWRConfig>
  );
}

export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1').then(
    (res) => res.json()
  );
  return {
    props: {
      fallback: {
        ['$inf$/posts/&page=1']: [[response]],
      }
    },
  };
}
