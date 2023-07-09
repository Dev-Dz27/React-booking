import { PostDataType } from "data/types";
import { useState, useEffect } from "react";
import { DEMO_POSTS } from "data/posts";

// WE USE THIS HOOK FOR DEMO  TAB FILTER ON ANY PAGE
// WITH PRODUCT MODE PLEASE INSTEAD THIS HOOK FOR YOU WANT DO -- GET DATA FROM API ...
function useDemoTabFilter({
  isLoading,
  initPosts,
  newPosts,
  tabActive,
  tabs,
}: {
  isLoading: boolean;
  initPosts: PostDataType[];
  newPosts?: PostDataType[];
  tabs: string[];
  tabActive: string;
}) {
  let timeOut: NodeJS.Timeout | null = null;
  const [currentPosts, setCurrentPosts] = useState<PostDataType[]>(initPosts);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    //   WHEN PRODUCT MODE newPosts WILL RECENT FROM API OR ANY ...
    if (newPosts) {
      return setCurrentPosts(() => newPosts);
    }

    // WITH DEMO WE WILL USE DEMO_POSTS
    // THE DEMO POST DATA WILL RECENT FROM API, OR ANY ...
    let idex = tabs.indexOf(tabActive);
    const fakePosts = !!idex
      ? DEMO_POSTS.filter((_, i) => {
          switch (idex) {
            case 1:
              return i >= 10 && i < 22;
            case 2:
              return i >= 5 && i < 17;
            case 3:
              return i >= 8 && i < 20;
            default:
              return i >= 8 && i < 20;
          }
        })
      : initPosts;

    setCurrentPosts((_) => fakePosts);

    return () => {
      timeOut && clearTimeout(timeOut);
    };
  }, [isLoading]);

  // DELETE IMAGE FOR LOADING EFFECT...
  let activePosts = isLoading
    ? currentPosts.map((item) => ({
        ...item,
        featuredImage: "...",
      }))
    : currentPosts;

  return activePosts;
}

export default useDemoTabFilter;
