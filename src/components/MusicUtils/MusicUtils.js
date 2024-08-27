// source of music
export const MUSIC_API = "https://cms.samespace.com/items/songs";

//  arrow function for time calculation
const musicFormatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

// audio duration handler
export async function musicDurationHandler(data) {
  const promises = data.map(async (item) => {
    try {
      const audio = new Audio(item.url);
      const duration = await new Promise((resolve) => {
        audio.addEventListener("loadedmetadata", () => {
          resolve(audio.duration);
        });
        audio.addEventListener("error", (error) => {
          console.error("Error loading audio:", error);
          resolve(0);
        });
      });
      item.duration = musicFormatDuration(duration);
    } catch (error) {
      console.error("Error processing audio:", error);
      item.duration = "0.00";
    }
    return item;
  });
  return await Promise.all(promises);
}
