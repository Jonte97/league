export const getQueueTitle = (q) => {
  switch (q.queueId) {
    case 420:
      return "Ranked Solo";
    case 440:
      return "Ranked Flex";
    case 400:
      return "Normal Draft";
    case 430:
      return "Normal Blind";
    case 450:
      return "ARAM";
    case 700:
      return "Clash";
    default:
      return q.description;
  }
};
