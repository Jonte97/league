import React from 'react';

//* Write out stats for active champ
const ChampStats = (props) => {
    let stats = props.stat;
    //TODO Round attackspeed 2 digits
    //TODO Make cleaner func for these
    //*Max lvl stats not provided from api
    let hpMaxLvl = (stats.hpperlevel * 17 + stats.hp).toFixed(2);
    let resourceMax = (stats.mpperlevel * 17 + stats.mp).toFixed(2);
    let armorMax = (stats.armorperlevel * 17 + stats.armor).toFixed(2);
    let spellblockMaxLvl = (stats.spellblockperlevel * 17 + stats.spellblock).toFixed(2);
    let attackdamageMaxLvl = (stats.attackdamageperlevel * 17 + stats.attackdamage).toFixed(2);
    let attackspeedMaxLvl = (stats.attackspeedperlevel * 17 + stats.attackspeed).toFixed(2);
    let hpregenMaxLvl = (stats.hpregenperlevel * 17 + stats.hpregen).toFixed(2);

    return (
        <div className="stat-table">
            <section id="stat-head"><h4>{props.name} basestats</h4></section>
            <section>
                <div id="hp-stat" className="stat-cell">
                    <div className="stat-label">
                        <strong>Hp</strong>
                    </div>
                    <span className="stat-inline">{stats.hp} - {hpMaxLvl}&nbsp;</span>
                    <span className="stat-inline">(+{stats.hpperlevel}) </span>
                </div>
                {/*TODO Change resource to corresponding resource energi/mana etc */}
                <div id="resource-stat" className="stat-cell stat-right">
                    <div className="stat-label">
                        <strong>Resource</strong>
                    </div>
                    <span className="stat-inline">{stats.mp} - {resourceMax}&nbsp;</span>
                    <span className="stat-inline">(+{stats.mpperlevel}) </span>
                </div>
            </section>

            <section>
                <div id="mr-stat" className="stat-cell">
                    <div className="stat-label">
                        <strong>Mr</strong>
                    </div>
                    <span className="stat-inline">{stats.spellblock} - {spellblockMaxLvl}&nbsp;</span>
                    <span className="stat-inline">(+{stats.spellblockperlevel}) </span>
                </div>
                <div id="armor-stat" className="stat-cell stat-right">
                    <div className="stat-label">
                        <strong>Armor</strong>
                    </div>
                    <span className="stat-inline">{stats.armor} - {armorMax}&nbsp;</span>
                    <span className="stat-inline">(+{stats.armorperlevel}) </span>
                </div>
            </section>

            <section>
                <div id="as-stat" className="stat-cell">
                    <div className="stat-label">
                        <strong>Ad</strong>
                    </div>
                    <span className="stat-inline">{stats.attackdamage} - {attackdamageMaxLvl}&nbsp;</span>
                    <span className="stat-inline">(+{stats.attackdamageperlevel}) </span>
                </div>
                <div id="attack-stat" className="stat-cell stat-right">
                    <div className="stat-label">
                        <strong>As</strong>
                    </div>
                    <span className="stat-inline">{stats.attackspeed} (+{stats.attackspeedperlevel}) </span>
                    <span className="stat-inline">+{attackspeedMaxLvl}% at 18</span>
                </div>
            </section>

            <section>
                <div id="hr-stat" className="stat-cell">
                    <div className="stat-label">
                        <strong>Hp reg</strong>
                    </div>
                    <span className="stat-inline">{stats.hpregen} - {hpregenMaxLvl}&nbsp;</span>
                    <span className="stat-inline">(+{stats.hpregenperlevel}) </span>
                </div>
                <div id="as-stat" className="stat-cell stat-right">
                    <div className="stat-label">
                        <strong>Movespeed</strong>
                    </div>
                    <span className="stat-inline">{stats.movespeed}</span>
                </div>
            </section>

            <section>
                <div id="attackrange-stat" className="stat-cell">
                    <div className="stat-label">
                        <strong>Attack range</strong>
                    </div>
                    <span className="stat-inline">{stats.attackrange}</span>
                </div>
                <div id="crit-stat" className="stat-cell stat-right">
                    <div className="stat-label">
                        <strong>Crit</strong>
                    </div>
                    <span className="stat-inline">{stats.crit}</span>
                </div>
            </section>
        </div>
    );
}

export default ChampStats;