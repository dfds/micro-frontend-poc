import { TemplateResult } from "lit-element";
import Minion from "../Minion";

export abstract class WebComponent extends Minion
{
    abstract render(): TemplateResult;
}