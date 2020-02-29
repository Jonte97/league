using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using static league_site.Controllers.SampleDataController;
using Newtonsoft;
using Newtonsoft.Json;

namespace Name.Controllers
{
    [Route("api/[controller]")]
    public class LeagueApiController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public string Test()
        {
            test t = new test();
            t.Thing = "testar api";
            string json = JsonConvert.SerializeObject(t);
            
            return json;
        }
    }

    class test
    {
        [JsonProperty("thing")]
        public string Thing { get; set; }
    }
}