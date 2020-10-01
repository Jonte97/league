using System.Collections.Generic;
using TimeLineNS;

namespace Models
{
    //TODO should rename these classes
    public class TimelineDataHolder
    {
        public List<FrameData> Frames { get; set; }
        public TimelineDataHolder()
        {
            
            Frames = new List<FrameData>();
        }
    }
    public class FrameData
    {
        public long Timestamp { get; set; }
        public long ParticipantId { get; set; }
        public ParticipantFrame participantFrame { get; set; }
    }
}

    // public class TimeLineDataModel
    // {
    //     public List<TimeLineDataLists> TimeLineDataLists { get; set; }
    //     public TimeLineDataModel()
    //     {
    //         TimeLineDataLists = new List<TimeLineDataLists>();
    //     }
    // }
    // public class TimeLineDataLists
    // {
    //     public long ParticipantId { get; set; }
    //     public IEnumerable<KeyValuePair<string, ParticipantFrame>> List {get; set;}
        
    // }