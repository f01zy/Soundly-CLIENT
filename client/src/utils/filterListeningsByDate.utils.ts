import { IListening } from "@/interfaces/listening.interface";

export const filterListeningsByDate = (listenings: Array<IListening>) => {
  const currentDate = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  const recentDates = listenings.filter(listening => { const listeningDate = new Date(listening.date); listeningDate.setHours(0, 0, 0, 0); return listeningDate >= sevenDaysAgo; });

  recentDates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return recentDates;
}