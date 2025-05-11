// src/App.js
import React, { useState, useEffect } from "react";
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
  play:         playImg,
  eat:          eatImg,
  study:        studyImg,
  beach:        beachImg,
  dance:        danceImg,
  walk_dog:     walkDogImg,
  kiss:         kissImg,
  spa:          spaImg,
  power_shnatz: powerShnatzImg,
  sleep:        sleepImg,
};

const actions = Object.keys(visuals);

// Secret for the birthday card
const SECRET_PASSWORD = "kebab";
// Long birthday message
const BIRTHDAY_MESSAGE = `
🎉 יום הולדת שמח 🎉

אהובה שלי היום את חוגגת 24. 
`;

function App() {
  const [boushki]            = useState(() => new Boushki("Shani", 23));
  const [message, setMessage]      = useState("Welcome to Boushki's!");
  const [battery, setBattery]      = useState(boushki.battery);
  const [currentVis, setVis]       = useState(visuals.sleep);
  const [globalDisabled, setGlobalDisabled] = useState(false);

  // After 1000 seconds, prompt for the birthday card password
  useEffect(() => {
    const timer = setTimeout(() => {
      const askBirthday = () => {
        const guess = window.prompt(
          "🎂 Surprise! To open your birthday card, enter the secret password:"
        );
        if (guess === SECRET_PASSWORD) {
          window.alert(BIRTHDAY_MESSAGE);
        } else {
          window.alert("❌ Wrong password.");
          // askBirthday();
        }
      };
      askBirthday();
    }, 100 * 1000); 
    return () => clearTimeout(timer);
  }, []);

  // Special sleep handler with gradual recharge and dreams
  const handleSleep = () => {
    setVis(visuals.sleep);
    setGlobalDisabled(true);
    boushki.battery = battery; // sync

    const dreams = [
      "Zzz... Your schnitzel tiras is safe...",
      "Zzz... Avocado is the best fruit!!!",
      "Zzz... Dreaming of a vacation in Italy..."
    ];

    // first dream now
    setMessage(dreams[0]);
    // second & third dreams
    const dreamTimeouts = [
      setTimeout(() => setMessage(dreams[1]), 3000),
      setTimeout(() => setMessage(dreams[2]), 6000)
    ];

    // +10% battery per second until 100%
    const intervalId = setInterval(() => {
      boushki.battery = Math.min(100, boushki.battery + 10);
      setBattery(boushki.battery);

      if (boushki.battery >= 100) {
        clearInterval(intervalId);
        dreamTimeouts.forEach(clearTimeout);
        setMessage(`Good morning ${boushki.name}! 🌞`);
        setGlobalDisabled(false);
      }
    }, 1000);
  };

  // General action handler
  const perform = (action) => {
    if (action === "sleep") {
      handleSleep();
      return;
    }

    let result;
    switch (action) {
      case "eat":          result = boushki.eat();          break;
      case "play":         result = boushki.play();         break;
      case "study":        result = boushki.study();        break;
      case "dance":        result = boushki.dance();        break;
      case "kiss":         result = boushki.kiss();         break;
      case "power_shnatz": result = boushki.power_shnatz(); break;
      case "walk_dog":     result = boushki.walk_dog();     break;
      case "spa":          result = boushki.spa();          break;
      case "beach":        result = boushki.beach();        break;
      default:             result = "Invalid action!";      break;
    }

    setMessage(result);
    setBattery(boushki.battery);
    setVis(visuals[action]);
  };

  // Battery bar color
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
        {/* Action buttons */}
        {actions.map((act) => {
          const cost = Boushki.actionCost[act] || 0;
          return (
            <button
              key={act}
              onClick={() => perform(act)}
              className={`action-btn ${act}`}
              disabled={globalDisabled || battery < cost}
            >
              {act.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
              {cost > 0 }
            </button>
          );
        })}

        {/* “Kiss or Go Crazy” button */}
        <button
          className="action-btn kiss-or-crazy"
          onClick={() => {
            const yes = window.confirm(
              "The boushki demands a kiss—or he’ll go crazy!\nGive him a kiss?"
            );
            if (yes) perform("kiss");
            else {
              setMessage("OMG! Boushki is GoiNg CraZZZzZyY! 😱");
              setGlobalDisabled(true);
              boushki.play();
              boushki.dance();
              boushki.eat();
              setBattery(boushki.battery);
              setVis(visuals.eat);
              setGlobalDisabled(false);
            }
          }}
          disabled={globalDisabled}
        >
          Kiss or Go Crazy
        </button>
      </div>
    </div>
  );
}

export default App;
