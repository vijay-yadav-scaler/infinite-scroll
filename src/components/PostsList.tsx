import React, { useEffect, useState } from 'react'
import { useSWRConfig } from 'swr';
import useSWRInfinite from 'swr/infinite';

function getKey(pageIndex: number, previousPageData: any) {
  const page = pageIndex + 1;
  if (previousPageData && !previousPageData.length) return null;
  return `/posts/&page=${page}`
}

function PostsList() {
  const [posts, setPosts] = React.useState([]);
  const [parallelFetchEnable, setParallelFetchEnable] = useState(false);
  const { cache } = useSWRConfig();
  const { data, size, setSize, isLoading } = useSWRInfinite(getKey, (url: string) => {
    const params = new URLSearchParams(url);
      const page = params.get('page'); 
    return fetch(`https://jsonplaceholder.typicode.com/posts/${page}`).then((res) => res.json()).then(data => [data]);
  }, {
    revalidateIfStale: false,
    revalidateFirstPage: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    parallel: parallelFetchEnable,
  });
  useEffect(() => {
    if (data) {
      const list = data.flat();
      setPosts(list as any);
    }
  }, [data])

  useEffect(() => {
    console.log('cache swr', cache);
  }, [cache])
  return (
    <div>
      <h1>SWR Infinite</h1>
      <span>Current Page - {size}</span>
      <div>SWR Loading State: {isLoading ? 'true' : 'false'}</div>
      <div>Enable Parallel Fetch: <input type="checkbox" onChange={(e) => setParallelFetchEnable(e.target.checked)} /></div>
      <div>
        <button onClick={() => setSize((size: number) => (size + 1))}>next</button>
      </div>
      <br />
      <ol>
        {posts.map((post: any) => (
            <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  )
}

export default PostsList