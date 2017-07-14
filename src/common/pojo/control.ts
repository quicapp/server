import { Item } from "./item";

// A control's parent could either be 
class Control extends Item {
    // The type of the control
    public type: String;
    // If true the control's parent is a page - otherwise another control.
    public topLevel: Boolean;
}

export { Control };