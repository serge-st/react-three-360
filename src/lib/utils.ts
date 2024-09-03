import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { parse, differenceInSeconds, addSeconds, format } from "date-fns";
import { Defect, JsonValue } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeString(val: number): string {
  return format(new Date(val * 1000), "mm:ss");
}

export function parseTime(timeString: string) {
  return parse(timeString, "mm:ss", new Date(0, 0, 0));
}

export function getDurationFromString(timeString: string) {
  return differenceInSeconds(parseTime(timeString), new Date(0, 0, 0));
}

export function jsonParser(content: any): Map<string, Defect> {
  delete content.meta;
  const jsonValueArray = Object.values(content) as JsonValue[];

  const defects = jsonValueArray.flatMap<Defect>((defect, index) => {
    if (defect.annotations.length < 1) return [];

    const timeBeforeDefect = jsonValueArray
      .slice(0, index)
      .reverse()
      .find((el) => el.video_time)?.video_time;
    const timeAfterDefect = jsonValueArray
      .slice(index + 1)
      .find((el) => el.video_time)?.video_time;

    if (!timeBeforeDefect || !timeAfterDefect) return [];

    const duration =
      differenceInSeconds(
        parseTime(timeAfterDefect),
        parseTime(timeBeforeDefect)
      ) - 1;

    return Array.from({ length: duration }, (_, i) => ({
      video_time: format(
        addSeconds(parseTime(timeBeforeDefect), i + 1),
        "mm:ss"
      ),
      ...defect,
    }));
  });

  const defectsMap = new Map<string, Defect>();

  defects.forEach((defect) => {
    defectsMap.set(defect.video_time, defect);
  });

  return defectsMap;
}
