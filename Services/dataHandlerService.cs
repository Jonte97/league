using System;
using System.Collections.Generic;
using System.Linq;
using MingweiSamuel.Camille.MatchV4;
using ViewModels;

namespace Services
{
    public class DataHandlerService : IDataHandlerService
    {
        public void GetMostPlayedChamp(ReferenceListWithTag reference)
        {
            try
            {
                var most = reference.MatchList.GroupBy(x => x.Champion).OrderByDescending(grp => grp.Count()).Select(grp => grp.Key).Take(10).ToList();

                for (int i = 0; i < 9; i++)
                {
                    foreach (var item in most)
                    {
                        var champList = reference.MatchList.Where(x => x.Champion == item).ToList();
                    }

                }

            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
    }
}