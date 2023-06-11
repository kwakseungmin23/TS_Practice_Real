# TS_Practice_Real - Demo Application - overview

### outline

This project will be able to manage a couple of projects. The active project list, finished list and we will be able to drag and drop from one list to the other.

This project will allow us to **practice** many of the things in TypeScript.

### index.html description

There's a bunch of **template tags** which means not loaded immediately, which are not **rendered** immediately so to say. 
But these can be reached via JavaScript(TypeScript) when we wanna render it. User will fill out the forms and we rendering the contents to the list and append the project following the id 'app' in div tag.

There is an li tag that will be used to render a single project in our list of projects. (unordered list -> ul tag)

### app.ts description

It's our job to write some TypeScript code which in the end fetches whatever the user enters in the rendered form and validates what the user enters in the form and listens to a click on ADD PROJECT button then create a new project object that will be stored in array.
Then the array will be rendered to the unorderd list tag and the entire list also need to be added to the document object model(dom).

### Processing

Address Issue to perceive the problem => problem solving => commit and reviewing.
