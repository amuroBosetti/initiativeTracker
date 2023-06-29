const refreshDashboard = (lcd, currentTurnLed, tracker) => {
    lcd.clear();
    const { name, initiative, color } = tracker.currentCharacter();
    lcd.print(`${name}: ${initiative}`);
    currentTurnLed.color(color)
};

export default refreshDashboard;
