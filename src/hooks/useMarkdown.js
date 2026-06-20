import { useMemo } from "react";

const venueFiles = import.meta.glob("../content/venues/*.md", { eager: true });
const newsFiles = import.meta.glob("../content/news/*.md", { eager: true });

function parseFiles(files) {
  return Object.values(files).map((mod) => mod.default);
}

export function useVenues() {
  return useMemo(() => parseFiles(venueFiles), []);
}

export function useNews({ type, project, upcoming } = {}) {
  return useMemo(() => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    return parseFiles(newsFiles)
      .filter((item) => !type || item.data.type === type)
      .filter((item) => !project || item.data.project === project)
      .filter((item) => !upcoming || new Date(item.data.date) >= startOfToday)
      .sort((a, b) => new Date(a.data.date) - new Date(b.data.date));
  }, [type, project, upcoming]);
}
