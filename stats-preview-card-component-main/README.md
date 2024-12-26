# Frontend Mentor - Stats preview card component solution

This is a solution to the [Stats preview card component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/stats-preview-card-component-8JqbgoU62). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview




### Links

- Solution URL: [Solution URL here](https://github.com/frager098/CSS-Projects/tree/main/stats-preview-card-component-main)
- Live Site URL: [Live site URL here](https://zingy-tapioca-3e5986.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox



### What I learned

This was an exellent practice for me as I practically learned the implementation of ::after pseudo class and how to design overlays with it.
```css
.inner-part2:after {
    content: "";
    position: absolute;
    top: 0; /* This top,left = 0 will position this class at the top-left corner of targeted element */
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsl(277, 64%, 61%); /* Purple overlay */
    mix-blend-mode: multiply; /* Will blend it with it's parent background */
    /* Optional for a blended effect */
    pointer-events:none;
  }


## Author

- Frontend Mentor - [@frager098](https://www.frontendmentor.io/profile/frager098)
