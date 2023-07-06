const refreshDashboard = (lcd, currentTurnLed, nextTurnLed, tracker) => {
    lcd.clear();
    if(!tracker.isEmpty()){
        const { name, initiative, color } = tracker.currentCharacter();
        lcd.print(`${name}: ${initiative}`);
        currentTurnLed.color(color)
        if (tracker.nextCharacter()) {
            nextTurnLed.color(tracker.nextCharacter().color)
        }
    } else {
        lcd.clear();
        currentTurnLed.off();
    }
};

export default refreshDashboard;
