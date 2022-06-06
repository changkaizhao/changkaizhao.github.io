---
layout: post
title: SwiftUI vs React
tags: react swfitUI
---

> 作者：Roby

# **SwiftUI** vs **React**

## **1. Software architecture**
**MVVM** (model-view-viewmodel)
> Both **SwiftUI** and **React** comform to **MVVM** pattern.

- **model** is the source of truth
- **view** displays all content
- **viewModel** coordinates model and view, and also communicate with other viewModels
---

## **2. View vs Component**
- In swiftUI, we use **View** as the block to build the entire visual world
- In React world, the **Component** is the atomic block.

### **2.1 lifecycle**
#### **View** lifecycle is managed via **viewmodifiers** and **init** func as below.
- `init` define how to init a **View**
- `onAppear` do something after **View** appear on screen
- `onReceive` do something while **View** recive some **State** or **event** changes
- `onDisappear` do something here before **View** disappear from screen

#### **Component** lifecycle is managed via **hook** as below.
```javascript
useEffect({
/* dependants array is empty, this only execute once at beginning for init*/
},[]);

useEffect({
    // this block will be executed during each frame update 
    // mainly used for animation
});

useEffect({
    // here will be executed only if dependants array changed
    return ()->{
        // do some clean jobs
    } // this closure will be executed before next component update
}, [dependant])
```
### **2.2 `@State` vs `useState`**
- In **View**, we use `@State` to associate a value, while it changes will cause **View** updates 
- In **Component**, `useState` hook will return `[value, setValue]`, the `getter` and `setter` are used for sync update in a **Component**
---
## **3. Value passing**
It's an important topic for value passing between differect blocks. Value passing can be classified into 4 types.
- parent -> child
- brother -> brother
- child -> parent
- any -> any

### **3.1 parent -> child**
- In SwiftUI, passing value parameter via `init` func
- In React, use `props` to pass value from parent to a child component

### **3.2 child -> parent**
- In SwiftUI, define a `@Binding` in child View, and pass parent `@State` to child view.
- In React, we can use a `callback` (eg. a parent `State setter`)  to modify parent properties.

### **3.3 brother -> brother**
- In SwiftUI, we can `@Binding` to a  common parent value in two brothers **View**
- In React, we can pass value via common parent between two brothers, alternatively, use `useContext` along with `useReducer` to maintain a communication  between two brothers.

### **3.4 any -> any**
- In SwiftUI, global state management
- In React, global state management
---
## **4. Global State management**
Usually,  a global state manager plays a role of **viewModel**.

### **4.1 State management in SwiftUI**
In **SwiftUI**, we can use ***pulisher*** and ***subscriber*** pattern to implement state management.
 -  define an `ObservableObject` **View** and `@Published` its props to be observed by ***subscribers***.     
 - we can use two methods to subscribe a ***publisher***. `@ObservedObject` and `@EnvironmentObject`.


>`@EnvironmentObject` is more global than `@ObservedObject`,    `@ObservedObject` cannot be shared without **props drilling**.   `@EnvironmentObject` is totally free to use in different Views after defined somewhere once.

Moreover, in swiftUI already predefined a lot of `@Environment` states for users to retrieve directly. (eg. `\.colorScheme`, `\.locale`, `\.calendar` and more)


### **4.2 State management in React**
In React world, there are many 3rd party frameworks to manage global states. such as **Redux**, **MobilX**, **Zusland**, **Valtio** etc.

> `useContext` is not a real global state management, it only works in ***Component*** realm.

Recommend book about mircostate management in react: [	
Micro State Management with React Hooks: Explore custom hooks libraries like Zustand, Jotai, and Valtio to manage global states](https://www.amazon.com/-/zh_TW/Daishi-Kato-ebook/dp/B09P5QRJ79/ref=sr_1_1?keywords=Micro+State+Management+with+React+Hooks%3A+Explore+custom+hooks+libraries+like+Zustand%2C+Jotai%2C+and+Valtio+to+manage+global+states&qid=1654502835&sr=8-1)

---
## **5. Performance**
Both **SwiftUI** and **React** render update frames continuously. Thus **States** and **events** will cause tons of redraw calls, that heavily affects app's performance.
So it should be carefully considered when and how will cause a draw call by **States** and **events**.
Reducing unneccessery draw call is very important. 