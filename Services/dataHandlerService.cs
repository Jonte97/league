using System;
using System.Collections.Generic;
using MingweiSamuel.Camille.MatchV4;

namespace Services
{
    public class DataHandlerService : IDataHandlerService
    {
        private static DateTime UnixTimeStampToDateTime(double unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds(unixTimeStamp).ToLocalTime();
            return dtDateTime;
        }
        public List<MatchReference> GetMatchesWithinSeason(List<MatchReference> list)
        {
            DateTime dt = new DateTime(2020, 1, 10);
            int end = 0, i = 0, range = 0;
            bool IsDone = false;
            //TODO fixa. kan skapa problem om användaren inte har games utanför denna tidsram samma i apiService
            while (!IsDone)
            {
                double sec = TimeSpan.FromMilliseconds(list[i].Timestamp).TotalSeconds;
                var time = UnixTimeStampToDateTime(sec);

                if (time.Date <= dt)
                {
                    end = i;
                    range = list.Count - end;
                    IsDone = true;
                }
                else
                {
                    i++;
                }
            }
            list.RemoveRange(end, range);
            return list;
        }
    }
}