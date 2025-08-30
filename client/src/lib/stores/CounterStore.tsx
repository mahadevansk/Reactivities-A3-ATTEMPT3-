import {  makeAutoObservable} from 'mobx'

export default class CounterStore{
    title = 'Counter store';
    count = 42;
    events: string[] = [
        `Initial count is ${this.count}`
    ];


    constructor() {
        //makeObservable(this, {
            //title: observable,
            //count: observable,
            //increment: action,
            //decrement: action
        //})
        makeAutoObservable(this); // this makes the propeties of this autoobserverable and and functions as actions. 
    }

    increment = (amount = 1) => {
        
        this.count += amount;
        this.events.push(`Incremented by ${amount} - count is now ${this.count}`);

    }
    decrement = (amount = 1) => {
        this.count -= amount;
        this.events.push(`Decremented by ${amount} - count is now ${this.count}`);
    }

    get eventCount()
    {
        return this.events.length;
    }



}