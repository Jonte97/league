using System.Collections.Generic;
using TimeLineNS;

namespace ViewModels
{
    public class TimeLineVM
    {
        public List<List<Event>> Items { get; set; }
        
        public List<Event> SkillOrder { get; set; }

        public TimeLineVM()
        {
            Items = new List<List<Event>>();
            SkillOrder = new List<Event>();
        }
    }
}