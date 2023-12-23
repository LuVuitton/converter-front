"use server";
import { BASE_URL_RATES, RATES_TAG } from "..";

export async function getRates(): Promise<ExchangeRates> {
  const res = await fetch(
    `${BASE_URL_RATES}/latest?api_key=${process.env.API_KEY_RATES}`,
    { next: { revalidate: 3600, tags: [RATES_TAG] } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch rates");
  }

  return res.json();
}

// export async function getActualRates() {
//   revalidateTag(RATES_TAG);
// }


export type ExchangeRates = {
  date: string;
  base: string;
  rates: Rates;
};

export type Rates = {
  [currency: string]: number;
};
