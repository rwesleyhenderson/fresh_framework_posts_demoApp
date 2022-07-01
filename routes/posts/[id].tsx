/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PageProps } from "$fresh/server.ts";

export const handler: Handlers<Project> = {
    async GET(_req, ctx) {
      const id = ctx.params.id;
      const rawPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      const post = await rawPost.json()
  
      return ctx.render(post);
    },
  };

export default function Post(props: PageProps) {
  return <div>
        <div class={tw`text-xl`}>
            {props.data.title}
        </div>
        <p>{props.data.body}</p>
    </div>;
}
