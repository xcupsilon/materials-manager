## This is a prototype created by Rain Yan for Cesium's Material Manager exercise.
To run the project, try npm install and proceed with npm run dev in the root directory. 

For the frontend I used React with Tailwind styling; for the backend I used Node.js with the Express framework using MongoDB Atlas as my database.

For the time spent, I spent a bit extra time for around 5 hours. Most of the overtime involved researching solutions for some new problems I haven't faced before.


## Problems:
One of the questions/problems I encountered was how to represent color and date. For the former I decided to keep track of the hex code as a string and the latter using a date objects. I proceeded to use react-color as a pacakage since I can get the color user picked as a hex code and react-date-picker as a package for getting the date input.

Another problem I had was dealing with instantiating a default material. Since in the mongo schema there is required to be a unique field. If evey material is created with the same default settings such as name with "New Material" then there will a duplication error. I considered concatenating an index based on the current amount of materials stored, but such would be problematic if materials are to be deleted not at the last index and unique indices can be disrupted. My solution was to create a unique id generated using the package uuid and use it to fetch the material's attribute datas.

Another problem I had was that to represent the color dynamically inside of a div, I will need to change the color based on a variable. Unfortunately Tailwind does not support dynamic classname. So I added JSS to implement this feature.

## Tradeoff:
One trade-off I had was dealing with the optimistic input feature, I considered having a separate axios post unique to each field when they are changed v.s. having a single axios post to check to update when any field is changed. While the former is probably the ideal and more safe approach towards isolating the problem down to updating a single field. In the end to reduce the code size and to save time I went with the latter solution. This meant that if there is an invalid field in the input, the update will not be able to go through, meaning other inputs will not be updated until all inputs are valid.

Another trade-off I had was dealing with refactoring of react components. I decided to refactor SelectedMaterial (which is the form component) from the main Manager component. Since the states are kept within the parent component, this meant that I had to pass in all the states and setters into the form component, but it meant that I was able to isolate the form problem by itself and massively reduce the code size in the main component.


## Other note:
One problem I unfortunately wasn't able to resolve after the time was dealing with a ES6 support conflict for Jest testing with React, since a crucial package I am using for the main Manager componet only uses the import syntax. I researched for about an hour but none of the answers I came across resolved the conflict I tried transpiling using babel; following Jest's documentation for setting up for ECMAScript modules; trying out different packages and configurations for jest.

In the end, knowing I was already well overtime, I wasn't able to set up the testing for many of my frontend components, but if I were to do it I will test that the component renders correctly, it fetches and displays data correctly, and that the events are firing off correctly based off button and input interaction.

I will be researching over the weekend for more solutions and see if I am able to resolve it.





