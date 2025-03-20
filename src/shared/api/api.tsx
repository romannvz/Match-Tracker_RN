import { TResponceMatches } from '@/src/utils/types';

const config = {
  baseUrl: 'https://app.ftoyd.com/fronttemp-service',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const fetchMatchesAPI = (): Promise<TResponceMatches> =>
  fetch(`${config.baseUrl}/fronttemp`, {
    method: 'GET',
    headers: config.headers,
  }).then((res) =>
    res.ok
      ? res.json()
      : res.json().then((err) => {
          console.log('err');
          Promise.reject(err);
        }),
  );

// This function allows to be call any request to the API 'сallback' (which is transmitted as a function) 'retries' times with a delay 'interruption' (in seconds) between calls
export const retryMechanics = async (
  callback: (args?: []) => Promise<TResponceMatches | any>,
  retries: number,
  interruption: number,
  args?: [],
) => {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function takeABreak(seconds: number) {
    console.log(`Taking a break for ${seconds}s...`);
    await sleep(seconds * 1000);
  }

  let retry = 0;
  let success = false;
  let error = null;
  await takeABreak(interruption);
  while (retry < retries && !success) {
    console.log(`Retry ${retry + 1}.`);
    try {
      const response = await callback(args);
      success = true;
      console.log(`Success in ${retry + 1} step!`);
      return response;
    } catch (err) {
      console.log(`Error in ${retry + 1} iteration: ${err}`);
      error = err;
    }
    retry++;
    if (retry != retries) await takeABreak(interruption);
  }
  console.log(
    `Unsuccessfull fetching '${callback.name}' in ${retries} times. Last taked error: ${error}`,
  );
  return String(error);
};
