import { createSignal, onMount } from "solid-js";
import type { JSX } from "solid-js";
import { Title } from "solid-start";
import { engines, preferences } from "~/util/";
import { generateProxyUrl } from "~/util/url";

export default function NewTab(): JSX.Element {
  const [name, setName] = createSignal<string>("Google");
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      const element = event.target as HTMLInputElement;
      const query = element.value;
      location.href = generateProxyUrl(query);
    }
  }

  onMount(() => {
    setInterval(() => {
      setName(
        engines[preferences()["search.defaults.searchEngine"] || "google"].name
      );
    }, 100);
  });

  return (
    <main
      class="relative flex h-full w-full flex-col items-center justify-between"
      id="ntp"
    >
      <Title>New Tab</Title>
      <div class="mt-10 flex w-screen flex-col items-center">
        <div class="m-5 flex items-center gap-5">
          <div class="h-20 w-20" id="logo"></div>
          <h1 class="text-4xl font-semibold">LibreCheats</h1>
        </div>
        <input
          class="m-5 rounded-md px-5 py-4 text-sm shadow-lg focus:shadow-2xl focus:outline-none focus:ring-0 md:w-1/2"
          placeholder={`Search with ${name()} or enter address`}
          onKeyDown={handleKeydown}
        ></input>
      </div>
      <div class="absolute bottom-0 left-1/2 mb-5 -translate-x-1/2 transform">
        <h1 class="text-2xl">
          Powered by{" "}
          <a href={__uv$config.prefix + __uv$config.encodeUrl('https://github.com/cohenerickson/Velocity/')} class="text-blue-500 hover:underline">
            Velocity.
          </a>
        </h1>
      </div>
    </main>
  );
}
