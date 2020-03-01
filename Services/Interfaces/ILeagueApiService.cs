
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface ILeagueApiService 
    {
        Task<Summoner> GetSummonerAsync(string name);
        Task<LeagueEntry[]> GetRankedDataAsync(string id);
        Task<Matches> GetMatchHistoryAsync(string accountId);

    }
}