using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class ChampionSimple
    {
        public string type { get; set; }
        public string format { get; set; }
        public string version { get; set; }
        public Dictionary<string, Champ> Data { get; set; }
    }
    public class Champ
    {
        public string id { get; set; }
        public string key { get; set; }
        public string name { get; set; }
        public string title { get; set; }
        public Image image { get; set; }
        public Skin[] skins { get; set; }
        public string lore { get; set; }
        public string blurb { get; set; }
        public string[] allytips { get; set; }
        public string[] enemytips { get; set; }
        public string[] tags { get; set; }
        public string partype { get; set; }
        public Info info { get; set; }
        public Stats stats { get; set; }
        public Spell[] spells { get; set; }
        public Passive passive { get; set; }
        public Recommended[] recommended { get; set; }
    }
    public class Passive
    {
        public string name { get; set; }
        public string description { get; set; }
        public Image1 image { get; set; }
    }

    public class Image1
    {
        public string full { get; set; }
        public string sprite { get; set; }
        public string group { get; set; }
        public int x { get; set; }
        public int y { get; set; }
        public int w { get; set; }
        public int h { get; set; }
    }

    public class Skin
    {
        public string id { get; set; }
        public int num { get; set; }
        public string name { get; set; }
        public bool chromas { get; set; }
    }

    public class Spell
    {
        public string id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string tooltip { get; set; }
        public Leveltip leveltip { get; set; }
        public float maxrank { get; set; }
        public float[] cooldown { get; set; }
        public string cooldownBurn { get; set; }
        public float[] cost { get; set; }
        public string costBurn { get; set; }
        public Datavalues datavalues { get; set; }
        public float[][] effect { get; set; }
        public string[] effectBurn { get; set; }
        public object[] vars { get; set; }
        public string costType { get; set; }
        public string maxammo { get; set; }
        public int[] range { get; set; }
        public string rangeBurn { get; set; }
        public Image2 image { get; set; }
        public string resource { get; set; }
    }

    public class Leveltip
    {
        public string[] label { get; set; }
        public string[] effect { get; set; }
    }

    public class Datavalues
    {
    }

    public class Image2
    {
        public string full { get; set; }
        public string sprite { get; set; }
        public string group { get; set; }
        public int x { get; set; }
        public int y { get; set; }
        public int w { get; set; }
        public int h { get; set; }
    }

    public class Recommended
    {
        public string champion { get; set; }
        public string title { get; set; }
        public string map { get; set; }
        public string mode { get; set; }
        public string type { get; set; }
        public string customTag { get; set; }
        public int sortrank { get; set; }
        public bool extensionPage { get; set; }
        public bool useObviousCheckmark { get; set; }
        public object customPanel { get; set; }
        public Block[] blocks { get; set; }
    }

    public class Block
    {
        public string type { get; set; }
        public bool recMath { get; set; }
        public bool recSteps { get; set; }
        public int minSummonerLevel { get; set; }
        public int maxSummonerLevel { get; set; }
        public string showIfSummonerSpell { get; set; }
        public string hideIfSummonerSpell { get; set; }
        public string appendAfterSection { get; set; }
        public string[] visibleWithAllOf { get; set; }
        public string[] hiddenWithAnyOf { get; set; }
        public Item[] items { get; set; }
    }

    public class Item
    {
        public string id { get; set; }
        public int count { get; set; }
        public bool hideCount { get; set; }
    }

    public class Info
    {
        [JsonProperty("attack")]
        public int Attack { get; set; }
        [JsonProperty("defense")]
        public int Defense { get; set; }
        [JsonProperty("magic")]
        public int Magic { get; set; }
        [JsonProperty("difficulty")]
        public int Difficulty { get; set; }
    }

    public class Image
    {
        [JsonProperty("full")]
        public string Full { get; set; }
        [JsonProperty("sprite")]
        public string Sprite { get; set; }
        [JsonProperty("group")]
        public string Group { get; set; }
        [JsonProperty("x")]
        public int X { get; set; }
        [JsonProperty("y")]
        public int Y { get; set; }
        [JsonProperty("w")]
        public int W { get; set; }
        [JsonProperty("h")]
        public int H { get; set; }
    }

    public class Stats
    {
        [JsonProperty("hp")]
        public float Hp { get; set; }
        [JsonProperty("hpperlevel")]
        public float Hpperlevel { get; set; }
        [JsonProperty("mp")]
        public float Mp { get; set; }
        [JsonProperty("mpperlevel")]
        public float Mpperlevel { get; set; }
        [JsonProperty("movespeed")]
        public int Movespeed { get; set; }
        [JsonProperty("armor")]
        public float Armor { get; set; }
        [JsonProperty("armorperlevel")]
        public float Armorperlevel { get; set; }
        [JsonProperty("spellblock")]
        public float Spellblock { get; set; }
        [JsonProperty("spellblockperlevel")]
        public float Spellblockperlevel { get; set; }
        [JsonProperty("attackrange")]
        public int Attackrange { get; set; }
        [JsonProperty("hpregen")]
        public float Hpregen { get; set; }
        [JsonProperty("hpregenperlevel")]
        public float Hpregenperlevel { get; set; }
        [JsonProperty("mpregen")]
        public float Mpregen { get; set; }
        [JsonProperty("mpregenperlevel")]
        public float Mpregenperlevel { get; set; }
        [JsonProperty("crit")]
        public float Crit { get; set; }
        [JsonProperty("critperlevel")]
        public float Critperlevel { get; set; }
        [JsonProperty("attackdamage")]
        public float Attackdamage { get; set; }
        [JsonProperty("attackdamageperlevel")]
        public float Attackdamageperlevel { get; set; }
        [JsonProperty("attackspeedperlevel")]
        public float Attackspeedperlevel { get; set; }
        [JsonProperty("attackspeed")]
        public float Attackspeed { get; set; }
    }
}