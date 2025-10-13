import { HttpError, PageProps } from "fresh";
import { Head } from "fresh/runtime";

export default function ErrorPage(props: PageProps) {
  const error = props.error;

  if (error instanceof HttpError) {
    const status = error.status;

    if (status === 404) {
      return (
        <>
          <Head>
            <title>404 Not Found</title>
          </Head>
          <div class="p-4 grid h-screen gap-3 text(black dark:white) place-content-center">
            <h1 class="text(center 4xl 2xl:5xl) font-bold">
              The page was not found
            </h1>
          </div>
        </>
      );
    }

    if (status === 500) {
      return (
        <div class="p-4 grid h-screen gap-3 text(black dark:white) place-content-center">
          <h1 class="text(center 4xl 2xl:5xl) font-bold">
            500 internal server error
          </h1>
          Try again
          {error}
        </div>
      );
    }
  }
}
