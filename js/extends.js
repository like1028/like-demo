class Demo{

    constructor(){
        this.name = 10;
    }

    test(){
        console.log('test method')
        console.log(this.say())
    }
    // say(){
    //     console.log('sayto');
    // }
}

class Child extends Demo{
    say(){
        console.log('say');
    }
}

var c = new Child();

c.test();
var demo = new Demo();
demo.say();