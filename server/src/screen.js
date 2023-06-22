const refreshScreen = (lcd, tracker) => {
    lcd.clear();
    const { name, initiative, color } = tracker.currentCharacter();
    lcd.print(`${name}: ${initiative} - ${color}`);
};

export default refreshScreen;
