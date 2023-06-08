import pkg from 'johnny-five'
const { Board, LCD } = pkg;

const board = new Board();

board.on('ready', () => {
    const lcd = new LCD({
        controller: "PCF8574"
    });
    lcd.on()
    lcd.print('holis')
})
