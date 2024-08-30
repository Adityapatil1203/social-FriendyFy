import React, { useEffect, useState } from 'react';
import classes from './posts.module.css';
import { useSelector } from 'react-redux';
import Post from '../post/Post';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true); // Start loading
        const res = await fetch('https://friendyfy.onrender.com/post/timeline/posts', {
          headers: {
            'Authorization': `${token}`,
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch timeline posts');
        }
        const data = await res.json();
        console.log("Timeline posts:", data);
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <div className={classes.container}>
      {loading ? (
       <div className={classes.loader}></div>
       // Loader
      ) : Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post._id} post={post} />
        ))
      ) : (
        <div className={classes.noPostsMessage}>
          No posts available.
        </div>
      )}
    </div>
  );
}

export default Posts;
