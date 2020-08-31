namespace Model
{
    using System;
    using System.Collections.Generic;

    using System.Globalization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    public partial class ChampionAdvanced
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("format")]
        public string Format { get; set; }

        [JsonProperty("version")]
        public string Version { get; set; }

        [JsonProperty("data")]
        public Data Data { get; set; }
    }

    public partial class Data
    {
        [JsonProperty("Aatrox")]
        public Aatrox Aatrox { get; set; }
    }

    public partial class Aatrox
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("key")]
        [JsonConverter(typeof(ParseStringConverter))]
        public long Key { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("image")]
        public Image Image { get; set; }

        [JsonProperty("skins")]
        public Skin[] Skins { get; set; }

        [JsonProperty("lore")]
        public string Lore { get; set; }

        [JsonProperty("blurb")]
        public string Blurb { get; set; }

        [JsonProperty("allytips")]
        public string[] Allytips { get; set; }

        [JsonProperty("enemytips")]
        public string[] Enemytips { get; set; }

        [JsonProperty("tags")]
        public string[] Tags { get; set; }

        [JsonProperty("partype")]
        public string Partype { get; set; }

        [JsonProperty("info")]
        public Info Info { get; set; }

        [JsonProperty("stats")]
        public Dictionary<string, double> Stats { get; set; }

        [JsonProperty("spells")]
        public Spell[] Spells { get; set; }

        [JsonProperty("passive")]
        public Passive Passive { get; set; }

        [JsonProperty("recommended")]
        public Recommended[] Recommended { get; set; }
    }

    public partial class Image
    {
        [JsonProperty("full")]
        public string Full { get; set; }

        [JsonProperty("sprite")]
        public string Sprite { get; set; }

        [JsonProperty("group")]
        public string Group { get; set; }

        [JsonProperty("x")]
        public long X { get; set; }

        [JsonProperty("y")]
        public long Y { get; set; }

        [JsonProperty("w")]
        public long W { get; set; }

        [JsonProperty("h")]
        public long H { get; set; }
    }

    public partial class Info
    {
        [JsonProperty("attack")]
        public long Attack { get; set; }

        [JsonProperty("defense")]
        public long Defense { get; set; }

        [JsonProperty("magic")]
        public long Magic { get; set; }

        [JsonProperty("difficulty")]
        public long Difficulty { get; set; }
    }

    public partial class Passive
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("image")]
        public Image Image { get; set; }
    }

    public partial class Recommended
    {
        [JsonProperty("champion")]
        public string Champion { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("map")]
        public string Map { get; set; }

        [JsonProperty("mode")]
        public string Mode { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("customTag")]
        public string CustomTag { get; set; }

        [JsonProperty("sortrank", NullValueHandling = NullValueHandling.Ignore)]
        public long? Sortrank { get; set; }

        [JsonProperty("extensionPage")]
        public bool ExtensionPage { get; set; }

        [JsonProperty("useObviousCheckmark", NullValueHandling = NullValueHandling.Ignore)]
        public bool? UseObviousCheckmark { get; set; }

        [JsonProperty("customPanel")]
        public object CustomPanel { get; set; }

        [JsonProperty("blocks")]
        public Block[] Blocks { get; set; }
    }

    public partial class Block
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("recMath")]
        public bool RecMath { get; set; }

        [JsonProperty("recSteps")]
        public bool RecSteps { get; set; }

        [JsonProperty("minSummonerLevel")]
        public long MinSummonerLevel { get; set; }

        [JsonProperty("maxSummonerLevel")]
        public long MaxSummonerLevel { get; set; }

        [JsonProperty("showIfSummonerSpell")]
        public IfSummonerSpell ShowIfSummonerSpell { get; set; }

        [JsonProperty("hideIfSummonerSpell")]
        public IfSummonerSpell HideIfSummonerSpell { get; set; }

        [JsonProperty("appendAfterSection", NullValueHandling = NullValueHandling.Ignore)]
        public string AppendAfterSection { get; set; }

        [JsonProperty("visibleWithAllOf", NullValueHandling = NullValueHandling.Ignore)]
        public string[] VisibleWithAllOf { get; set; }

        [JsonProperty("hiddenWithAnyOf", NullValueHandling = NullValueHandling.Ignore)]
        public string[] HiddenWithAnyOf { get; set; }

        [JsonProperty("items")]
        public Item[] Items { get; set; }
    }

    public partial class Item
    {
        [JsonProperty("id")]
        [JsonConverter(typeof(ParseStringConverter))]
        public long Id { get; set; }

        [JsonProperty("count")]
        public long Count { get; set; }

        [JsonProperty("hideCount")]
        public bool HideCount { get; set; }
    }

    public partial class Skin
    {
        [JsonProperty("id")]
        [JsonConverter(typeof(ParseStringConverter))]
        public long Id { get; set; }

        [JsonProperty("num")]
        public long Num { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("chromas")]
        public bool Chromas { get; set; }
    }

    public partial class Spell
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("tooltip")]
        public string Tooltip { get; set; }

        [JsonProperty("leveltip")]
        public Leveltip Leveltip { get; set; }

        [JsonProperty("maxrank")]
        public long Maxrank { get; set; }

        [JsonProperty("cooldown")]
        public long[] Cooldown { get; set; }

        [JsonProperty("cooldownBurn")]
        public string CooldownBurn { get; set; }

        [JsonProperty("cost")]
        public long[] Cost { get; set; }

        [JsonProperty("costBurn")]
        [JsonConverter(typeof(ParseStringConverter))]
        public long CostBurn { get; set; }

        [JsonProperty("datavalues")]
        public Datavalues Datavalues { get; set; }

        [JsonProperty("effect")]
        public long[][] Effect { get; set; }

        [JsonProperty("effectBurn")]
        [JsonConverter(typeof(DecodeArrayConverter))]
        public long?[] EffectBurn { get; set; }

        [JsonProperty("vars")]
        public object[] Vars { get; set; }

        [JsonProperty("costType")]
        public string CostType { get; set; }

        [JsonProperty("maxammo")]
        [JsonConverter(typeof(ParseStringConverter))]
        public long Maxammo { get; set; }

        [JsonProperty("range")]
        public long[] Range { get; set; }

        [JsonProperty("rangeBurn")]
        [JsonConverter(typeof(ParseStringConverter))]
        public long RangeBurn { get; set; }

        [JsonProperty("image")]
        public Image Image { get; set; }

        [JsonProperty("resource")]
        public string Resource { get; set; }
    }

    public partial class Datavalues
    {
    }

    public partial class Leveltip
    {
        [JsonProperty("label")]
        public string[] Label { get; set; }

        [JsonProperty("effect")]
        public string[] Effect { get; set; }
    }

    public enum IfSummonerSpell { Empty, SummonerSmite };

    public partial class ChampionAdvanced
    {
        public static ChampionAdvanced FromJson(string json) => JsonConvert.DeserializeObject<ChampionAdvanced>(json, Model.Converter.Settings);
    }

    public static class Serialize
    {
        public static string ToJson(this ChampionAdvanced self) => JsonConvert.SerializeObject(self, Model.Converter.Settings);
    }

    internal static class Converter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters = {
                IfSummonerSpellConverter.Singleton,
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }

    internal class ParseStringConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(long) || t == typeof(long?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            long l;
            if (Int64.TryParse(value, out l))
            {
                return l;
            }
            throw new Exception("Cannot unmarshal type long");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (long)untypedValue;
            serializer.Serialize(writer, value.ToString());
            return;
        }

        public static readonly ParseStringConverter Singleton = new ParseStringConverter();
    }

    internal class IfSummonerSpellConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(IfSummonerSpell) || t == typeof(IfSummonerSpell?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            switch (value)
            {
                case "":
                    return IfSummonerSpell.Empty;
                case "SummonerSmite":
                    return IfSummonerSpell.SummonerSmite;
            }
            throw new Exception("Cannot unmarshal type IfSummonerSpell");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (IfSummonerSpell)untypedValue;
            switch (value)
            {
                case IfSummonerSpell.Empty:
                    serializer.Serialize(writer, "");
                    return;
                case IfSummonerSpell.SummonerSmite:
                    serializer.Serialize(writer, "SummonerSmite");
                    return;
            }
            throw new Exception("Cannot marshal type IfSummonerSpell");
        }

        public static readonly IfSummonerSpellConverter Singleton = new IfSummonerSpellConverter();
    }

    internal class DecodeArrayConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(long?[]);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            reader.Read();
            var value = new List<long?>();
            while (reader.TokenType != JsonToken.EndArray)
            {
                var converter = ParseStringConverter.Singleton;
                var arrayItem = (long?)converter.ReadJson(reader, typeof(long?), null, serializer);
                value.Add(arrayItem);
                reader.Read();
            }
            return value.ToArray();
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            var value = (long?[])untypedValue;
            writer.WriteStartArray();
            foreach (var arrayItem in value)
            {
                var converter = ParseStringConverter.Singleton;
                converter.WriteJson(writer, arrayItem, serializer);
            }
            writer.WriteEndArray();
            return;
        }

        public static readonly DecodeArrayConverter Singleton = new DecodeArrayConverter();
    }
}