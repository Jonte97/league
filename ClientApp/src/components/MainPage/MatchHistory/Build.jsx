import React, { useEffect, useState } from "react";
import ItemBuild from "./BuildComponents/ItemBuild";
import RuneSetup from "./BuildComponents/RuneSetup";
import SkillOrder from "./BuildComponents/SkillOrder";
import Loader from "../loader";
import SkillsBuild from "./BuildComponents/SkillsBuild";

const Build = (props) => {
  return (
    <div className="history-build">
      <div>
        {props.itemEvents || props.stats || props.skillOrder ? (
          <React.Fragment>
            <ItemBuild items={props.itemEvents} />
            <div className="display-flex rune-skillorder">
              <div className="history-runesetup">
                <RuneSetup stats={props.stats} runes={props.runes} />
              </div>
              <div className="history-skillorder-table">
                <SkillOrder
                  skillorder={props.skillOrder}
                  champion={props.champion}
                />
                <SkillsBuild champion={props.champion} />
              </div>
            </div>
          </React.Fragment>
        ) : (
          <Loader className={"loader-matchHistory"} />
        )}
      </div>
    </div>
  );
};

export default Build;
