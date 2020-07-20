export const animations = {
  player: {
    idle: {
      url: '/assets/player/spr_fencer_idle_strip6.png',
      mirror: false,
      width: 120,
      speed: 160,
    },
    attack: {
      url: '/assets/player/spr_fencer_attack_strip9.png',
      width: 192,
      speed: 10,
      mirror: false,
    },
    hit: {
      url: '/assets/player/spr_fencer_hit_strip4.png',
      width: 120,
      speed: 10,
      mirror: false,
    },
    block: {
      url: '/assets/player/spr_fencer_parry_strip8.png',
      width: 192,
      speed: 10,
      mirror: false
    },
  },
  slime: {
    idle: {
      url: '/assets/slime/spr_slime_idle_strip4.png',
      mirror: true,
      width: 96,
      speed: 160,
    },
    attack: {
      url: '/assets/slime/spr_slime_attack_strip8.png',
      width: 96,
      speed: 10,
      mirror: true,
    },
    hit: {
      url: '/assets/slime/spr_slime_hit_strip4.png',
      width: 96,
      speed: 10,
      mirror: true,
    }
  }
};
