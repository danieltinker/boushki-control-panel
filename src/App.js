// src/App.js
import React, { useState } from "react";
import Boushki from "./Boushki";

import eatImg         from "./images/eat.png";
import playImg        from "./images/play.png";
import studyImg       from "./images/study.png";
import danceImg       from "./images/dance.png";
import kissImg        from "./images/kiss.png";
import sleepImg       from "./images/sleep.png";
import powerShnatzImg from "./images/power_shnatz.png";
import walkDogImg     from "./images/walk_dog.png";
import spaImg         from "./images/spa.png";
import beachImg       from "./images/beach.png";

import "./App.css";

const visuals = {
  play:          playImg,
  eat:           eatImg,
  study:         studyImg,
  beach:          kissImg,
  dance:         danceImg,
  walk_dog:      walkDogImg,
  kiss:         beachImg,
  spa:           spaImg,
  power_shnatz:  powerShnatzImg,
  sleep:         sleepImg
};

const actions = Object.keys(visuals);

// Optional per-action disable durations (ms)
const disableDurations = {
  sleep:       6000,
  spa:         3000,
  power_shnatz:1000
};

function App() {
  const [boushki]            = useState(() => new Boushki("Shani", 23));
  const [message, setMessage]      = useState("Welcome to Boushki's Control Panel!");
  const [battery, setBattery]      = useState(boushki.battery);
  const [currentVis, setVis]       = useState(visuals.sleep);
  const [globalDisabled, setGlobalDisabled] = useState(false);

  // Core action handler
  const perform = (action) => {
    let result;
    switch (action) {
      case "eat":          result = boushki.eat();          break;
      case "play":         result = boushki.play();         break;
      case "study":        result = boushki.study();        break;
      case "dance":        result = boushki.dance();        break;
      case "beach":        result = boushki.beach();        break;
      case "sleep":        result = boushki.sleep();        break;
      case "power_shnatz": result = boushki.power_shnatz(); break;
      case "walk_dog":     result = boushki.walk_dog();     break;
      case "spa":          result = boushki.spa();          break;
      case "kiss":         result = boushki.kiss();         break;
      default:             result = "Invalid action!";      break;
    }
    setMessage(result);
    setBattery(boushki.battery);
    setVis(visuals[action]);

    // Temporarily disable all controls if needed
    const ms = disableDurations[action];
    if (ms) {
      setGlobalDisabled(true);
      setTimeout(() => setGlobalDisabled(false), ms);
    }
  };

  // “Kiss or Go Crazy” special handler
  const handleKissOrCrazy = () => {
    const giveKiss = window.confirm(
      "The boushki demands a kiss—or he’ll go crazy!\n\nGive him a kiss?"
    );

    if (giveKiss) {
      perform("kiss");
    } else {
      // Crazy sequence
      setMessage("OMG! Boushki is GoiNg CraZZZzZyY! 😱");
      setGlobalDisabled(true);

      // Apply play, dance, and eat in sequence
      boushki.play();
      boushki.dance();
      boushki.eat();
      
      setTimeout(() => {}, 1000); // Wait for play
      // Update UI to reflect final state (after eat)
      setBattery(boushki.battery);
      setVis(visuals.eat);

      // Re-enable controls immediately
      setGlobalDisabled(false);
    }
  };

  // Determine battery bar color class
  const levelClass =
    battery > 70 ? "high" :
    battery > 20 ? "medium" :
    "low";

  return (
    <div className="panel">
      <h2 className="message">{message}</h2>

      <div className="status">
        <div className="battery-meter">
          <div
            className={`battery-level ${levelClass}`}
            style={{ width: `${battery}%` }}
          />
          <span className="battery-percentage">{battery}%</span>
        </div>
      </div>

      <div className="visual">
        <img src={currentVis} alt="Boushki activity" />
      </div>

      <div className="buttons">
        

        {/* Existing action buttons */}
        {actions.map((act) => {
          const cost = Boushki.actionCost[act] || 0;
          return (
            <button
              key={act}
              onClick={() => perform(act)}
              className={`action-btn ${act}`}
              disabled={globalDisabled || battery < cost}
            >
              {act
                .replace("_", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
              {cost > 0 }
            </button>
          );
        })}

        {/* New “Kiss or Go Crazy” button */}
        <button
          className="action-btn kiss-or-crazy"
          onClick={handleKissOrCrazy}
          disabled={globalDisabled}
        >
          Kiss or Go Crazy
        </button>
      </div>
    </div>
  );
}

export default App;
