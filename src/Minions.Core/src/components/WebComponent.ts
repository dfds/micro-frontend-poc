import { Minion } from "../Minion";

export abstract class WebComponent extends Minion
{
    abstract render(): any;
}