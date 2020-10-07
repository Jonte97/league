using System.Collections.Generic;
using MingweiSamuel.Camille.MatchV4;

namespace Services
{
    public interface IDataHandlerService
    {
        List<MatchReference> GetMatchesWithinSeason(List<MatchReference> list);
    }
}