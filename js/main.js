/**
 * 
 * 
 * @author Francisco Javier González Sabariego
 */
{   
    let game = null;

    /**
     * Renderiza la animación de la secuencia de colores.
     * 
     * @param {Array} colors Array de elementos DOM con los 4 colores de la UI
     * @param {Boolean} test Modo test para visualizar la iluminación de los cuatro colores
     */
    const render = function(colors, test = false) {
        let iteration = 0;
        let idInterval = 0;
        let colorsGame = test ? ['green','red','yellow','blue'] : game.getColorsGame();
        idInterval = setInterval( () => {
            let element = colors.find( e => e.id == `${colorsGame[iteration]}`)
            element.classList.toggle(`brightness_${element.id}`);
            ++iteration;
            if (iteration == colorsGame.length) {
                game.togglePause();
                clearInterval(idInterval);
            }
        }, 1000);
    }

    /**
     * Animación que se realiza al equivocarse en la secuencia
     * 
     * @param {Array} colors Array de elementos DOM con los 4 colores de la UI
     */
    const reset = function(colors) {
        let iteration = 0;
        let idReset = 0;
        idReset = setInterval( () => {
            colors.forEach( e => e.classList.toggle(`brightness_${e.id}`));
            if (iteration == 3 )
                colors.forEach( e => e.style.backgroundColor = 'red');
            else if (iteration == 4) {
                colors.forEach( e => e.removeAttribute("style"));
                colors.forEach( e => e.removeAttribute("class"));
                clearInterval(idReset);
                render(colors);
            }
            ++iteration;
        }, 1000);

    }

    /**
     * Acción del botón pulsado
     * 
     * @param {Array} colors      Array de elementos DOM con los 4 colores de la UI
     * @param {Element} successes Elemento DOM (div) con el número de aciertos
     */
    const buttonPressed = function(colors,successes) {
        if (this.classList == `brightness_${this.id}` || game.getPause()) return;
        this.classList.toggle(`brightness_${this.id}`);
        game.play(this.id);
        successes.innerText = game.getSuccesses();
        if (game.getLose()){
            reset(colors);
            game.resetGame();
        }
        else if (game.getPause()) 
            render(colors);
    }

    document.addEventListener("DOMContentLoaded", () => {
        const colors = [...document.getElementsByTagName("div")].filter( e => e.id.match(/red|green|yellow|blue/) );
        const successes  = document.getElementById("successes");

        colors.forEach( e => {
            e.addEventListener("mousedown", buttonPressed.bind(e,colors,successes));
            e.addEventListener("animationend", () => e.classList.toggle(`brightness_${e.id}`));
        });

        game = new Game();
        
        render(colors);
        
        //render(colors,true); //test
    });
}
