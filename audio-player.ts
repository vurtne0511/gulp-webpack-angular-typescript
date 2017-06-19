import { Howl, Howler } from 'howler';

export namespace Media {

   export interface SoundData {
        path: string;
        howl: Howl;
    }

   export class Player {

        private playIndex: number;
        private playList: Array<SoundData>;

        constructor(playList: Array<SoundData>) {
            this.playList = playList;
            this.playIndex = 0;
        }

        play(index?: number): void {
            let target = this.playList[index];
        }

        stop(index?: number): void {

        }

        remove(index: number): SoundData {
            return null;
        }
    }
}
