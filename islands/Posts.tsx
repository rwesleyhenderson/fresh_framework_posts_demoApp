/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

interface IProps {
  posts: any[];
}

export default function Posts(props: IProps) {
  const [posts, setPosts] = useState(props.posts);
  const [form, setForm] = useState({ title: "", body: "" });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newPost = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
              'Accept': 'application/json',
              "Content-Type": "application/json",
              },
              });
          const newPostJson = await newPost.json();

          setPosts([...posts, newPostJson]);
    } 
  return (
    <div>
        <div class={tw`list-disc`}>
            {posts.map(post => (
            <li><a href={`/posts/${post.id}`}>{post.title}</a></li>
            ))}
        </div>

        <form onSubmit={handleSubmit}>
            <input value={form.title} onChange={handleChange} name="title" type="text" />
            <textarea value={form.body} onChange={handleChange} name="body" />
            <button type="submit">Submit</button>
        </form>
    </div>
  );
}
