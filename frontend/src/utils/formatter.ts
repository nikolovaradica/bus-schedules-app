import {SHORT_TO_FULL, WEEKDAYS_FULL} from "./constants.ts";

export const formatDaysAvailable = (days: string[], holidays: boolean): string => {
    if(days.length == 0)
        throw new Error("Days available can not be null");

    const selectedFull = days.map(d => SHORT_TO_FULL[d]!.toLowerCase());
    const selected = new Set(selectedFull);

    const notSelected = WEEKDAYS_FULL.filter(d => !selected.has(d));

    let result = "";

    if (selected.size === 7) {
        result = "секој ден";
    } else if (selected.size === 6) {
        result = `секој ден освен ${notSelected[0]}`;
    } else if (selected.size === 5 && holidays) {
        result = `секој ден освен ${notSelected.join(" и ")}`;
    } else if (selected.size === 5 && !holidays) {
        result = `секој ден освен ${notSelected.join(", ")}`;
    } else if (selected.size > 2 && selected.size < 5) {
        result = `секој ден освен ${notSelected.join(", ")}`;
    } else if (selected.size === 2 && selected.has("сабота") && selected.has("недела")) {
        result = "само сабота и недела";
    } else if (selected.size === 1) {
        result = `само ${[...selected][0]}`;
    } else {
        result = `само ${[...selected].join(" и ")}`;
    }

    if (!holidays) {
        if (result.includes("освен")) {
            result += " и празници";
        } else {
            result += " освен празници";
        }
    }

    return result;
};

export const parseDaysAvailable = (daysAvailable: string): { days: string[]; holidays: boolean } => {
    const lower = daysAvailable.toLowerCase();
    let holidays: boolean = true;
    let days: string[] = [];

    if (lower.startsWith("секој ден")) {
        const exceptMatch = lower.match(/освен\s([а-я, ]+)/);
        if (exceptMatch) {
            const exceptDays = exceptMatch[1]
                .split(/,\s*| и /)
                .map(d => d.trim())
                .filter(Boolean);
            days = WEEKDAYS_FULL.filter(d => !exceptDays.includes(d));
        } else {
            days = [...WEEKDAYS_FULL];
        }
    } else if (lower.startsWith("само")) {
        const onlyPart = lower.replace("само ", "").replace(" и празници", "").trim();
        const selectedDays = onlyPart.split(" и ").map(d => d.trim());
        days = selectedDays.filter(d => WEEKDAYS_FULL.includes(d));
    }

    if (lower.includes("празници") || (!lower.includes("празници") && lower.includes("само")))
        holidays = false;

    const SHORT_TO_FULL: Record<string, string> = {
        "Пон": "понеделник",
        "Вто": "вторник",
        "Сре": "среда",
        "Чет": "четврток",
        "Пет": "петок",
        "Саб": "сабота",
        "Нед": "недела"
    };
    const FULL_TO_SHORT = Object.fromEntries(Object.entries(SHORT_TO_FULL).map(([k, v]) => [v, k]));
    const shortDays = days.map(d => FULL_TO_SHORT[d]!).filter(Boolean);

    return { days: shortDays, holidays };
};