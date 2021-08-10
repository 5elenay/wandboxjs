"use strict";

import fetch from "node-fetch";
import { langs, CompiledReturn } from "../@types/types";
import languages from "../json/languages.json";

export async function compiler(
  lang: keyof langs,
  code: string
): CompiledReturn {
  try {
    const body = {
      compiler: languages[lang].compiler,
      code: code,
      codes: [] as string[],
      stdin: "",
      options: languages[lang].options,
      "compiler-option-raw": "",
      "runtime-option-raw": "",
    };

    const res = await fetch("https://wandbox.org/compile", {
      headers: {
        accept: "text/event-stream",
        "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "x-requested-with": "XMLHttpRequest",
      },
      body: JSON.stringify(body),
      method: "POST",
    });

    const compiled: string = await res.text();

    const splitted: string[] = compiled?.split("\n");

    const exitCode: string | null =
      splitted
        .find((x: string) => x.includes("data: ExitCode"))
        ?.replace("data: ExitCode:", "") || null;

    const signalCode: string | null =
      splitted
        .find((x) => x.includes("Signal:"))
        ?.replace(/(data:|Signal:|\\n)/g, "") || null;

    const end: number = splitted.findIndex((x: string) =>
      x.includes("data: ExitCode")
    );

    const result: string | null =
      splitted
        .slice(5, end - 3)
        .filter((i: string) => !i.includes("\r"))
        .join("\n")
        ?.replace(/(data: |data:|StdOut:|StdErr:|\\n)/g, "")
        .split("\n")
        .filter((i: string) => i !== "" && i !== "\r")
        .join("\n") || null;

    return {
      result: result,
      exitCode: exitCode,
      signalCode: signalCode,
    };
  } catch (e: any) {
    const errorTouse: Error = e;
    const { message, name, stack } = errorTouse;

    console.log({ message, name, stack });
  }
}
