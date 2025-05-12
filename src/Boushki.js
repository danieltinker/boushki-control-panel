// src/Boushki.js
export default class Boushki {
  static nicknames = [
    "pashimotos","woush-woush","boushkileilei","boushki-woushki",
    "pashimotos","pootalachamon","kababi","voushi","kababoshki",
    "Lychee","Hamtzootzi","shobabka","shoubidoubi","Funny Bunny","voushilados",
    "KoofAlHaGav","patzpatz","Zahav","Mevina Inyaan","Boushki Hazahav","little boushboush","bouski-bouski-boushki",
    "boushk","hsoogimazt","tzamigoosh"
  ];

  static favoriteFoods = [
    "Homemade Vegetables Salad","Pizza by arale","Pasta by boushkie",
    "Fish by Selas","Tiramisu by ernesto","Picanha by Nissim",
    "Steak by Amos","Pasta by DEBERAH","Wine @ Derech Ha Gefen"
  ];

  static actionCost = {
    play:         45,
    study:        50,
    dance:        20,
    kiss:          0,
    sleep:         0,
    eat:          30,
    power_shnatz:  0,
    walk_dog:     20,
    spa:           0,
    beach:        80
  };

  constructor(name, age) {
    this.name    = name;
    this.age     = age;
    this.battery = 100;
  }

  getRandomNickname() {
    const i = Math.floor(Math.random() * Boushki.nicknames.length);
    return Boushki.nicknames[i];
  }

  eat() {
    this.battery = Math.max(0, this.battery - Boushki.actionCost.eat);
    const food = Boushki.favoriteFoods[
      Math.floor(Math.random() * Boushki.favoriteFoods.length)
    ];
    const who = this.getRandomNickname();
    return `💖 ${who} is eating ${food}!`;
  }

  play() {
    this.battery = Math.max(0, this.battery - Boushki.actionCost.play);
    const who = this.getRandomNickname();
    return `${who} is playing some music!`;
  }

  study() {
    this.battery = Math.max(0, this.battery - Boushki.actionCost.study);
    const who = this.getRandomNickname();
    return `${who} is studying hard! @ TAU`;
  }

  dance() {
    this.battery = Math.max(0, this.battery - Boushki.actionCost.dance);
    const who = this.getRandomNickname();
    return `💃 ${who} is dancing the shoubi doubi dance! ❤️`;
  }

  kiss() {
    this.battery = Math.min(100, this.battery + 15);
    const who = this.getRandomNickname();
    return `😘 ${who} is giving a sweet kiss! 😘`;
  }

  sleep() {
    const who = this.getRandomNickname();
    return `Wait! ${who} is sleeping and recharging...❤️🌙`;
  }

  power_shnatz() {
    this.battery = 100;
    const who = this.getRandomNickname();
    return `${who} is taking her power shnatz!⚡️💖`;
  }

  walk_dog() {
    this.battery = Math.max(0, this.battery - Boushki.actionCost.walk_dog);
    const who = this.getRandomNickname();
    return `${who} is walking sheleg!🐾❤️`;
  }

  spa() {
    this.battery = 100;
    const who = this.getRandomNickname();
    return `${who} relax @ Jacob [Panda] spa!🛁💖`;
  }

  beach() {
    this.battery = Math.max(0, this.battery - Boushki.actionCost.beach);
    const who = this.getRandomNickname();
    return `🏖️ ${who} is at the beach enjoying the sun!`;
  }


    crazy() {
      this.battery = 0;
      const who = this.getRandomNickname();
      return `🌀 ${who} is losing it and going crazy!!! OMG! Boushki is GoiNg CraZZZzZyY! 😱`;
    }
}
