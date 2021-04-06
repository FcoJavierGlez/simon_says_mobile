/**
 * Juego de Simon Says (Simón dice):
 * 
 * Se muestra una secuencia de colores que el usuario debe repetir. Si acierta la secuencia incrementa
 * en un color aleatorio. Si falla la secuencia se reinicia.
 * 
 * @author Francisco Javier González Sabariego
 */
const Game = class {
    _pause = true;
    _lose  = false;
    _successes = 0;
    _colorsList   = ['red','green','yellow','blue'];
    _colorsGame   = [];
    _colorsPlayer = [];

    constructor() {
        this._addColorGame();
    }

    /**
     * Devuelve la lista de colores del jugador
     * 
     * @returns {Array} Lista de colores del jugador
     */
    getColorsPlayer = function() {  //Not currently used 
        return this._colorsPlayer;
    }

    /**
     * Devuelve la secuencia de colores del juego
     * 
     * @returns {Array} Secuencia de colores del juego
     */
    getColorsGame = function() {
        return this._colorsGame;
    }

    /**
     * Devuelve si el juego se encuentra pausado o no.
     * 
     * @returns {Boolean} True si el juego está pausado
     */
    getPause = function() {
        return this._pause;
    }

    /**
     * Devuelve si el jugador ha perdido.
     * 
     * @returns {Boolean} True si el jugador ha perdido
     */
     getLose = function() {
        return this._lose;
    }

    /**
     * Devuelve el número de aciertos del jugador.
     * 
     * Se considera un acierto haber completado una secuencia entera.
     * 
     * @returns {Number} Número de aciertos
     */
    getSuccesses = function() {
        return this._successes;
    }

    /**
     * Inserta en la lista de colores pulsados por el jugador el último color pulsado.
     * 
     * @param {String} color Nombre del color pulsado por el jugaodor
     */
    _setColorPlayer = function(color) {
        this._colorsPlayer.push(color);
    }

    /**
     * Añade un nuevo color a la secuencia del juego
     */
    _addColorGame = function() {
        this._colorsGame.push(this._colorsList[ parseInt(Math.random() * this._colorsList.length) ]);
    }
    
    /**
     * Acción de juego, recibe como parámetro el nombre del color pulsado.
     * 
     * @param {String} color Color pulsado por el jugador. Válidos: red, green, blue, yellow
     */
    play = function(color) {
        this._setColorPlayer(color);
        if (this._validateColors()) {
            if (this._colorsPlayer.length == this._colorsGame.length) {
                ++this._successes;
                this._colorsPlayer = [];
                this._addColorGame();
                this.togglePause();
            }
        } else {
            this._lose = true;
            this._successes = 0;
        }
    }

    /**
     * Resetea el juego
     */
    resetGame = function() {
        this._pause = true;
        this._lose  = false;
        this._successes = 0;
        this._colorsPlayer = [];
        this._colorsGame = [];
        this._addColorGame();
    }

    /**
     * Pausa/despausa el juego
     */
    togglePause = function() {
        this._pause = !this._pause;
    }

    /**
     * Valida que el color que acada de pulsar el jugador 
     * coincide con el color de la secuencia
     * 
     * @returns {Boolean} True si ambos colores coinciden
     */
    _validateColors = function() {
        return this._colorsPlayer[this._colorsPlayer.length - 1] === this._colorsGame[this._colorsPlayer.length - 1];
    }

}