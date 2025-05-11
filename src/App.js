// src/App.js
import React, { useState, useRef, useEffect } from "react";
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
import crazyImg       from "./images/crazy.png";


import eatSound         from "./assets/eat.mp3";
import playSound        from "./assets/play.mp3";
import studySound       from "./assets/study.mp3";
import danceSound       from "./assets/dance.mp3";
import kissSound        from "./assets/kiss.mp3";
import sleepSound       from "./assets/sleep.mp3";
import powerShnatzSound from "./assets/power_shnatz.mp3";
import walkDogSound     from "./assets/walk_dog.mp3";
import spaSound         from "./assets/spa.mp3";
import beachSound       from "./assets/beach.mp3";
import kissCrazySound   from "./assets/kiss_or_crazy.mp3";
import confirmOkSound  from "./assets/confirm_ok.mp3";
import crazySound      from "./assets/crazy.mp3";


import "./App.css";

const visuals = {
  eat:          eatImg,
  study:        studyImg,
  dance:        danceImg,
  beach:        beachImg,
  walk_dog:     walkDogImg,
  play:         playImg,
  kiss:         kissImg,
  sleep:        sleepImg,
  power_shnatz: powerShnatzImg,
  spa:          spaImg,
  crazy:         crazyImg,
};

const audioFiles = {
  eat:          eatSound,
  play:         playSound,
  study:        studySound,
  dance:        danceSound,
  kiss:         kissSound,
  sleep:        sleepSound,
  power_shnatz: powerShnatzSound,
  walk_dog:     walkDogSound,
  spa:          spaSound,
  beach:        beachSound,
  "kiss-or-crazy": kissCrazySound,
  "confirm-ok":    confirmOkSound,
  crazy:         crazySound,
};

const actions = Object.keys(visuals);

// Secret for the birthday card
const SECRET_PASSWORD = "white";
// Long birthday message
const BIRTHDAY_MESSAGE = `
🎉 וושי יום הולדת שמח 🎉
אהובה שלי את חוגגת 24. תודה שאת מי שאת בעולם הזה את יחידה ומיוחדת ואין כמוך בכל העולם. את מחוברת לעולם בדרכים שרק אלוהים יכול להבין, בשבילי זה הדברים הקטנים שעושים את הקשר שלנו כלכך גדול בפשטות. כתבתי את התוכנה הגאונית הזאת על מנת להנציח את כל הדברים הטעימים שאכלנו הצחוקים והחלומות.וגם כדי ללמד אותך איך כותבים בריאקט על הדרך;)אני רוצה לאחל לך מלא מלא אושר ואור אני רוצה לאחל לך את כל הדברים הטובים ואצלנו זה במעשים לא במילים אז יאללה תשימי כמה תחתונים בתיק ולכי תעשי פיפי יש לנו מטוס לתפוס!
ותזכרי בכל דרך בכל זמן בושקי נמצא שם לתמוך בך תמשיכי להיות את כי את האדם הנפלא ביותר שהכרתי את הופכת אותי לטוב יותר מעצם היותך קיימת כי החיבור שלנו הוא טבעי ואמיתי ונכון ואת כל מה שאי פעם רציתי מכל כך הרבה בחינות.
חצי מופרעת חצי רגועה חצי מאמינה חצי חילונית חצי שקטה ביישנית חצי רעשנית מטורללת חצי נורמאלית חצי משוגעת ועם כל החצאים האלה את 100% בושקי תמיד.ולפעמים לרגעי קסם את אפילו בושקי הזהב. הניצוצות שאני מרגיש בגוף בזכותך באו אחרי המתנה ארוכת שנים.
לא הייתי מוכן להתאהב עד הסוף שאף אחד שאני לא באמת מאמין בטוב הטהור בליבה כי החיים יקחו אותנו למעלה ולמטה לחושך ולאור וטוב ולרע אבל מי שסוחב את האהבה בליבו אף פעם לא ייכנע. את בשבילי סמל לאהבה לאמת ולרוח לחימה ולכוח רצון. 
לימדת אותי מלא על עצמי ועל העולם וכל יום אני לומד משהו חדש ומתרגש לקום לצידך.ישלי הרבה מחשבות טובות על חיים משותפים איתך. את אור ענקי בלב שלי, וזה משהו שכל פעם שתסתכלי לי עמוק בעיניים תוכלי פשוט לראות אנחנו ביחד חזקים, בחממה שלנו תמיד כיף ומצחיק ומעניין. מחכה להמשיך לצמוח ולפרוח איתך. שלך הנסיך הקטן דניאל ברוך
`;

function App() {
  const [boushki]            = useState(() => new Boushki("Shani", 23));
  const [message, setMessage]      = useState("Welcome to Boushki's Control Panel!");
  const [battery, setBattery]      = useState(boushki.battery);
  const [currentVis, setVis]       = useState(visuals.play);
  const [globalDisabled, setGlobalDisabled] = useState(false);

  // After 50 seconds, prompt for the birthday card password
    useEffect(() => {
      const timer = setTimeout(() => {
        const askBirthday = () => {
          const guess = window.prompt(
            "🎂 Surprise! To open your birthday card, enter the secret password (hint: Daniel's favorite color):"
          );
          if (guess.toLowerCase() === SECRET_PASSWORD) {
            window.alert(BIRTHDAY_MESSAGE);
          } else {
            window.alert("❌ Wrong password. sry.");
            // askBirthday();
          }
        };
        askBirthday();
      }, 50 * 1000); 
      return () => clearTimeout(timer);
    }, []);

  // prepare audio players
  const audioRefs = useRef({});
  useEffect(() => {
    Object.entries(audioFiles).forEach(([key, src]) => {
     const audio = new Audio(src);
     if (key === "play") {
       audio.volume = 0.1;  // 10% volume
     }
     audioRefs.current[key] = audio;
    });
  }, []);


  // sleep handler with dreams & gradual recharge
  const handleSleep = () => {
    setVis(visuals.sleep);
    setGlobalDisabled(true);
    boushki.battery = battery;

    const dreams = [
      "Zzz... Your schnitzel tiras is safe...",
      "Zzz... Avocado is the best fruit!!!",
      "Zzz... Dreaming of a vacation in Italy..."
    ];

    setMessage(dreams[0]);
    const dreamTimeouts = [
      setTimeout(() => setMessage(dreams[1]), 3000),
      setTimeout(() => setMessage(dreams[2]), 6000)
    ];

    const intervalId = setInterval(() => {
      boushki.battery = Math.min(100, boushki.battery + 10);
      setBattery(boushki.battery);

      if (boushki.battery >= 100) {
        clearInterval(intervalId);
        dreamTimeouts.forEach(clearTimeout);
        setMessage(`Good morning ${boushki.name}!`);
        setGlobalDisabled(false);
      }
    }, 1000);
  };

  // general action handler
  const perform = (action) => {
    // play the corresponding sound
    const audio = audioRefs.current[action];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }

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

  // battery bar color
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
              {cost > 0}
            </button>
          );
        })}

        <button
          className="action-btn kiss-or-crazy"
          onClick={() => {
            const kcaudio = audioRefs.current["kiss-or-crazy"];
            if (kcaudio) {
              kcaudio.currentTime = 0;
              kcaudio.play().catch(() => {});
            }

            const yes = window.confirm("The boushki demands a kiss—or he’ll go crazy!\nGive him a kiss?");
              if (yes) {
                // only play confirm-ok on OK
                const okAudio = audioRefs.current["confirm-ok"];
                if (okAudio) {
                  okAudio.currentTime = 0;
                  okAudio.play().catch(() => {});
                }
                perform("kiss");
              } else {
              setGlobalDisabled(true);
              // setMessage("OMG! Boushki is GoiNg CraZZZzZyY! 😱");
              // boushki.play(); boushki.dance(); boushki.eat();
              // only play confirm-ok on OK
                const okAudio = audioRefs.current["crazy"];
                if (okAudio) {
                  okAudio.currentTime = 0;
                  okAudio.play().catch(() => {});
                }
              const msg = boushki.crazy();
              setMessage(msg);
              setBattery(boushki.battery);
              setVis(visuals.crazy);
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
