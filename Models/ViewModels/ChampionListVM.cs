using System.Collections.Generic;
//! Ta bort fil?
namespace ViewModels
{
    public class ChampionListVM
    {
        public List<ChampionList> List {get; set; } = new List<ChampionList>();
    }

    //TODO byt namn till ngt bättre
    public class ChampionList
    {
        public string Name { get; set; }
        public string Thumbnail { get; set; }
        public int Key { get; set; }
    }

}