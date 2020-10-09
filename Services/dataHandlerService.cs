using System;
using System.Collections.Generic;
using System.Linq;
using MingweiSamuel.Camille.MatchV4;
using ViewModels;

namespace Services
{
    public class DataHandlerService : IDataHandlerService
    {
        public ListMatchListForChampion GetMostPlayedChamp(ReferenceListWithTag reference)
        {
            var listForChampion = new ListMatchListForChampion();
            listForChampion.QueueId = new int[] { reference.QueueId };
            try
            {
                var most = reference.MatchList.GroupBy(x => x.Champion).OrderByDescending(grp => grp.Count()).Select(grp => grp.Key).Take(5).ToList();

                foreach (var champId in most)
                {
                    var newChamp = new MatchListForChampion();
                    newChamp.ChampionId = champId;
                    var result = reference.MatchList.Where(x => x.Champion == champId).ToList();
                    newChamp.GameCount = result.Count;
                    listForChampion.MatchListChampion.Add(newChamp);
                }
                return listForChampion;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
    }
}