const refreshDashboard = (lcd, currentTurnLed, nextTurnLed, tracker) => {
    lcd.clear();
    const { name, initiative, color } = tracker.currentCharacter();
    lcd.print(`${name}: ${initiative}`);
    currentTurnLed.color(color)
    if (tracker.nextCharacter()) {
        nextTurnLed.color(tracker.nextCharacter().color)
    }
};

export default refreshDashboard;
