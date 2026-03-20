export const generateBonusChallenges = (waveCount) => {
  const challenges = [];
  for (let i = 0; i < 3; i++) {
    const bonusCount = Math.floor(waveCount / 3) + 1;
    // roll for rare chance (1 in 5)
    const rareRoll = Math.floor(Math.random() * 5) + 1;
    const isRare = rareRoll === 5;

    const waves = [];
    for (let w = 0; w < bonusCount; w++) {
      const template = CHALLENGE_WAVE_TEMPLATES[
        Math.floor(Math.random() * CHALLENGE_WAVE_TEMPLATES.length)
      ];
      waves.push(template);
    }

    let reward;
    if (isRare) {
      const rareType = RARE_REWARDS[Math.floor(Math.random() * RARE_REWARDS.length)];
      reward = { type: rareType, rare: true };
    } else {
      const [tower, qty] = REWARDS[Math.floor(Math.random() * REWARDS.length)];
      reward = { type: tower, qty, rare: false };
    }

    challenges.push({
      id: crypto.randomUUID(),
      waves,
      reward,
      difficulty: isRare ? "rare" : "normal"
    });
  }
  return challenges;
}

export const groupEnemies = (waves) => {
  const counts = {};
  waves.flat().forEach(enemy => {
    counts[enemy] = (counts[enemy] || 0) + 1;
  });
  return Object.entries(counts);
}
