/**
 * Abstraction for a sound effect asset, appended to the DOM as an audio node.
 */
export class SfxAsset {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload","auto");
        this.sound.setAttribute("controls","none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    play() {
        this.sound.play();
    }

    pause() {
        this.sound.pause();
    }

    addEventListener(event, callback) {
        this.sound.addEventListener(event, callback);
    }

    clear() {
        document.body.removeChild(this.sound);
    }
}

const BACKGROUND_MUSIC_IDENTIFIER = 'bgMusic';

export class MusicAsset {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload","auto");
        this.sound.setAttribute("controls","none");
        this.sound.setAttribute("autoplay","true");
        this.sound.setAttribute("loop","true");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);

        this._isPlaying = false;
    }

    play() {
        if (!this._isPlaying) {
            this.sound.play();
            this._isPlaying = true;
        }
    }

    pause() {
        this.sound.pause();
    }

    clear() {
        document.body.removeChild(this.sound);
    }
}

/**
 * Resource manager for sound effect assets.
 */
export class SoundManager {
    constructor() {
        /**
         * @type {Map<string, string>}
         * @private
         */
        this._resources = new Map();
        /**
         * @type {Map<string, SfxAsset>}
         * @private
         */
        this._sfx = new Map();
        this._bgMusic = undefined;
        this._loaded = false;
    }

    /**
     * Adds a sound effect resource.
     * @param {string} id The sfx identifier key.
     * @param {string} url The sfx resource url.
     */
    addSfx(id, url) {
        this._resources.set(id, url);
    }

    addBackgroundMusic(url) {
        this._resources.set(BACKGROUND_MUSIC_IDENTIFIER, url);
    }

    /**
     * Load all added sound effects asynchronously.
     */
    async loadSfx() {
        const resources = Array.from(this._resources.entries());

        console.info(`[SoundManager] Loading ${resources.length} sfx assets.`);

        await Promise.all(resources.map(([iKey, iValue]) => {
            if (iKey === BACKGROUND_MUSIC_IDENTIFIER) {
                console.info(`[SoundManager] Loading Background Music.`);

                this._bgMusic = new MusicAsset(iValue);
            }
            else {
                console.info(`[SoundManager] Loading sfx ${iValue}.`);

                const sfx = new SfxAsset(iValue);
                this._sfx.set(iKey, sfx);
            }
        }));

        this._loaded = true;

        console.info('[SoundManager] Sfx loaded.');
    }

    async clearSfx() {
        for (const sfx of this.sfx.values()) {
            sfx.clear();
        }

        if (this._bgMusic !== undefined) {
            this._bgMusic.pause();
            this._bgMusic.clear();
        }
    }

    /**
     * Check whether loading of sfx was completed.
     * @returns {boolean} Whether all sfx have loaded.
     */
    get hasLoaded() {
        return this._loaded;
    }

    /**
     * Get the map of loaded sfx.
     * @returns {Map<string, SfxAsset>} The loaded sfx map.
     */
    get sfx() {
        return this._sfx;
    }

    /**
     * Get the loaded background music.
     * @returns {MusicAsset} The loaded bg music.
     */
    get bgMusic() {
        return this._bgMusic;
    }
}
