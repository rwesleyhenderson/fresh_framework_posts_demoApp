/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";
import Posts from "../islands/Posts.tsx";

export const handler: Handlers<Project> = {
  async GET(_req, ctx) {
    
    // get data
    const rawPosts = await fetch("https://jsonplaceholder.typicode.com/posts")
    const posts = await rawPosts.json()

    return ctx.render(posts);
  },
  async POST(req, ctx) {
    const post = await req.body.getReader().read();
    const data = new TextDecoder("utf-8").decode(post.value);
    const body = Object.fromEntries(new URLSearchParams(data));
    // create post
    const newPost = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        },
        });
    const newPostJson = await newPost.json();
    // get data
    const rawPosts = await fetch("https://jsonplaceholder.typicode.com/posts")
    const posts = await rawPosts.json()

    return ctx.render(posts);
  },
};

export default function Home(props) {
  console.log(props.data)

  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <Posts posts={props.data} />
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class={tw`my-6`}>
        Welcome to `fresh`. Try update this message in the ./routes/index.tsx
        file, and refresh. You should see the message change. If you're
        looking for a more complex example, check out 
      </p>
      <Counter start={3} />


    </div>
  );
}
