export const applyDamage = (enemy, proj) => {
  if (proj.isSlow) {
    const SLOW_AMOUNT = 0.5;
    const SLOW_DURATION = 2000;

    if (!enemy.originalSpeed) enemy.originalSpeed = enemy.speed;

    enemy.speed = enemy.originalSpeed * SLOW_AMOUNT;
    enemy.slowUntil = Date.now() + SLOW_DURATION;
  }

  enemy.hp -= proj.damage;
}