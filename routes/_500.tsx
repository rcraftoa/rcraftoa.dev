import type { PageProps } from "$fresh/server.ts";

const Error500Page = ({ error }: PageProps) => (
  <div class="p-4 grid h-screen gap-3 text(black dark:white) place-content-center">
    <h1 class="text(center 4xl 2xl:5xl) font-bold">
      500 internal server error
    </h1>
    Try again
    {error}
  </div>
);

export default Error500Page;
