// src/Boushki.js
export default class Boushki {
  static nicknames = [
    "pashimotos","woush-woush","boushkileilei","boushki-woushki",
    "pashimotos","pootalachamon","kababi","voushi","kababoshki"
  ];
  static favoriteFoods = [
    "Homemade Vegetables Salad","Pizza by arale","Pasta by boushkie",
    "Fish by Selas","Tiramisu by ernesto","picania by Nissim", "Steak by Amos", "Pasta by DEBERAH"
  ];
  static actionCost = {
    play:         10,
    study:        50,
    dance:        30,
    kiss:          0,
    sleep:         0,
    eat:          20,
    power_shnatz:  0,
    walk_dog:     10,
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
    return `${who} is eating ${food}.`;
  }

  play() {
    this.battery = Math.max(0, this.battery - Boushki.actionCost.play);
    const who = this.getRandomNickname();
    return `${who} is playing a fun game!`;
  }

  study() {
    this.battery = Math.max(0, this.battery - Boushki.actionCost.study);
    const who = this.getRandomNickname();
    return `${who} is studying hard @ Tel Aviv University!`;
  }

  dance() {
    this.battery = Math.max(0, this.battery - Boushki.actionCost.dance);
    const who = this.getRandomNickname();
    return `${who} is dancing the shoubi doubi dance!`;
  }

  kiss() {
    this.battery = Math.min(100, this.battery + 15);
    const who = this.getRandomNickname();
    return `${who} is giving a sweet kiss!`;
  }

  sleep() {
    this.battery = 100;
    const who = this.getRandomNickname();
    return `Wait! ${who} is sleeping and recharging...`;
  }

  power_shnatz() {
    this.battery = 100;
    const who = this.getRandomNickname();
    return `${who} is taking her power shnatz!`;
  }

  walk_dog() {
    this.battery = Math.max(0, this.battery - Boushki.actionCost.walk_dog);
    const who = this.getRandomNickname();
    return `${who} is walking with sheleg!`;
  }

  spa() {
    this.battery = 100;
    const who = this.getRandomNickname();
    return `${who} is enjoying the relaxing Jacob [Panda] spa!`;
  }

  beach() {
    this.battery = Math.max(0, this.battery - Boushki.actionCost.beach);
    const who = this.getRandomNickname();
    return `${who} is at the beach enjoying the sun!`;
  }
}
