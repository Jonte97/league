using System.Collections.Generic;
using MingweiSamuel.Camille.MatchV4;
using ViewModels;

namespace Services
{
    public interface IDataHandlerService
    {
        ListMatchListForChampion GetMostPlayedChamp(ReferenceListWithTag list);
    }
}