import languages from "../json/languages.json";

export type CompiledReturn = Promise<{
  result: string;
  exitCode: string;
  signalCode: string;
} | void>;

export type langs = typeof languages;
