import React, { useEffect } from 'react'
import { useSWRConfig } from 'swr';
import useSWRInfinite from 'swr/infinite';

function getKey(pageIndex: number, previousPageData: any) {
  const page = pageIndex + 1;
  if (previousPageData && !previousPageData.length) return null;
  return `/posts/&page=${page}`
}

function PostsList() {
  const [posts, setPosts] = React.useState([]);
  const { data, size, setSize, isLoading } = useSWRInfinite(getKey, async (url: string) => {
    const params = new URLSearchParams(url);
      const page = params.get('page'); 
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${page}`).then((res) => res.json()).then(data => [data]);
  }, {
    revalidateIfStale: false,
    revalidateFirstPage: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  useEffect(() => {
    if (data) {
      const list = data.flat();
      setPosts(list);
    }
  }, [data])
  
  return (
    <div>
      <h1>SWR Infinite</h1>
      <span>Current Page - {size}</span>
      <div>SWR Loading State: {isLoading ? 'true' : 'false'}</div>
      <div>
        <button onClick={() => setSize((size: number) => (size + 1))}>next</button>
      </div>
      <br />
      <ol>
        {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  )
}

export default PostsList