interface Joke {
  error: boolean;
  category: string;
  type: string;
  joke: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
}

//! Function to fetch a joke from the API
const fetchJoke = async (): Promise<Joke> => {
  const res = await fetch(
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single",
    { cache: "no-store" } //! Ensures fresh data on every request
  );

  if (!res.ok) {
    throw new Error("Failed to fetch joke 😈");
  }

  return res.json();
};

//* Async server component
export default async function API() {
  let joke: Joke;

  try {
    //* Fetching the joke
    joke = await fetchJoke();
  } catch (error) {
    console.error(error);
    return (
      <div>
        <h1 className="text-2xl text-white font-black text-center bg-slate-400">
          API Fetching
        </h1>
        <p className="text-red-500 text-center">
          Failed to load a joke. Please try again later.
        </p>
      </div>
    );
  }

  //* Render the joke and category
  return (
    <div>
      <h1 className="text-2xl text-white font-black text-center bg-slate-400">
        API Fetching
      </h1>
      <p className="mt-4 text-lg text-gray-800 text-center">{joke.joke}</p>
      <p className="text-sm text-gray-600 text-center">
        Category: {joke.category}
      </p>
    </div>
  );
}
