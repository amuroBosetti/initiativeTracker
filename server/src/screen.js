const refreshScreen = (lcd, tracker) => {
    lcd.clear();
    const { name, initiative, color } = tracker.currentPlayer();
    lcd.print(`${name}: ${initiative} - ${color}`);
};

export default refreshScreen;
